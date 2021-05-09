import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import {
  searchSegments,
  searchYTVideos,
  setSearchText,
  refreshSegmentList,
} from '../store/video/video.store';
import { toastError } from '../utils/toastHelper';
import Autosuggest from 'react-autosuggest';
import { repository } from 'services';
import { uniq, uniqBy } from 'lodash';

const Searchbar = (): any => {
  const [suggestions, setSuggestions] = React.useState([] as string[]);

  const searchType = useSelector((state: RootState) => state.video.searchType);
  const searchText = useSelector((state: RootState) => state.video.searchText);

  const dispatch = useAppDispatch();

  const handleChange = (event: any) => {
    dispatch(setSearchText({ searchText: event.target.value }));
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    search();
  };

  const search = async (text?: string) => {
    if (!text && !searchText) {
      await dispatch(refreshSegmentList({}));
    } else if (searchType === 'segment') {
      try {
        await dispatch(searchSegments({ term: text || searchText }));
      } catch (err) {
        toastError(
          'There was an error fetching segment data. Please refresh the page and try again.',
          err
        );
      }
    } else {
      try {
        await dispatch(searchYTVideos({ term: text || searchText }));
      } catch (err) {
        toastError(
          'There was an error fetching youtube data. Please refresh the page and try again.',
          err
        );
      }
    }
  };

  const getPlaceHolder = () => {
    return searchType === 'ytVideo'
      ? 'Search for MBT youtube videos'
      : 'Search for MBT video segments';
  };

  const formatSuggestions = (suggestions: string[]): string[] => {
    return uniq(suggestions.map(text => text.toLowerCase().trim()));
  };

  const getSuggestions = async (value: string): Promise<string[]> => {
    let {
      data: { docs },
    } = await repository.tag.list({ $term: value, $limit: 25, $embed: 'segments' });

    // NOTE: Soon the tag filters and formatting will be accomplished on the backend
    docs = docs.filter(tag => tag.segments && tag.segments.length > 0);

    return formatSuggestions(docs.map(tag => tag.name));
  };

  const getSuggestionValue = (suggestion: string) => {
    return suggestion || '';
  };

  const renderSuggestion = (suggestion: string) => <span>{suggestion || ''}</span>;

  // Autosuggest will call this function every time you need to update suggestions.
  const onSuggestionsFetchRequested = async ({ value }: { value: string }) => {
    setSuggestions(await getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected: Autosuggest.OnSuggestionSelected<string> = async (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    await dispatch(setSearchText({ searchText: suggestionValue }));
    search(suggestionValue);
  };

  const inputProps = {
    className: 'prompt',
    placeholder: getPlaceHolder(),
    type: 'text',
    onChange: handleChange,
    value: searchText || '',
    style: { width: '100%' },
  };

  return (
    <div className="search-bar ui segment">
      <form onSubmit={onSubmit} className="ui form">
        <div className="field">
          <div className="ui icon input">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              onSuggestionSelected={onSuggestionSelected}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
            <i className="search icon" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
