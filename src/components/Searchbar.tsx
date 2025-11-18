import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import {
  searchSegments,
  searchYTVideos,
  setSearchText,
  refreshSegmentList,
  setShowAdvancedFilters,
  updateSearchParams,
} from '../store/video/video.store';
import { toastError } from '../utils/toastHelper';
import Autosuggest from 'react-autosuggest';
import { repository } from 'services';
import { uniq } from 'lodash';
import { SearchParams, SEARCH_CONSTANTS } from 'types';

const Searchbar = (): any => {
  const [suggestions, setSuggestions] = React.useState([] as string[]);

  const searchType = useSelector((state: RootState) => state.video.searchType);
  const searchText = useSelector((state: RootState) => state.video.searchText);
  const searchParams = useSelector((state: RootState) => state.video.searchParams);
  const showAdvancedFilters = useSelector((state: RootState) => state.video.showAdvancedFilters);
  const isSearching = useSelector((state: RootState) => state.video.isSearching);

  // Local state for dropdown values to ensure responsiveness
  const [localSortBy, setLocalSortBy] = React.useState(searchParams?.sortBy || 'relevance');
  const [localSortOrder, setLocalSortOrder] = React.useState(searchParams?.sortOrder || 'desc');

  const dispatch = useAppDispatch();

  // Sync local state with Redux state when searchParams changes
  React.useEffect(() => {
    if (searchParams) {
      setLocalSortBy(searchParams.sortBy || 'relevance');
      setLocalSortOrder(searchParams.sortOrder || 'desc');
    }
  }, [searchParams]);

  const handleChange = (event: any) => {
    const newText = event.target.value;
    dispatch(setSearchText({ searchText: newText }));
    dispatch(updateSearchParams({ params: { term: newText } }));
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
        const searchParameters: SearchParams = text
          ? { ...(searchParams || {}), term: text, page: 1 } // Reset to page 1 for new search
          : searchParams || { term: searchText || '', page: 1 };

        await dispatch(searchSegments(searchParameters));
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

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value as 'relevance' | 'upload_date' | 'view_count';
    // Update local state immediately for responsive UI
    setLocalSortBy(sortBy);
    // Update Redux state
    dispatch(
      updateSearchParams({
        params: {
          sortBy,
          page: 1, // Reset to page 1 when changing sort
        },
      })
    );
    // Trigger search if we have a search term
    if (searchText) {
      search();
    }
  };

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = event.target.value as 'asc' | 'desc';
    // Update local state immediately for responsive UI
    setLocalSortOrder(sortOrder);
    // Update Redux state
    dispatch(
      updateSearchParams({
        params: {
          sortOrder,
          page: 1, // Reset to page 1 when changing sort order
        },
      })
    );
    // Trigger search if we have a search term
    if (searchText) {
      search();
    }
  };

  const toggleAdvancedFilters = () => {
    dispatch(setShowAdvancedFilters({ showAdvancedFilters: !showAdvancedFilters }));
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
    disabled: isSearching,
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
            <i className={`search icon ${isSearching ? 'loading' : ''}`} />
          </div>
        </div>

        {/* NEW: Enhanced search controls for API v2.0 */}
        {searchType === 'segment' && (
          <div className="ui stackable grid" style={{ marginTop: '10px' }}>
            <div className="twelve wide column">
              <div className="ui form">
                <div className="inline fields">
                  <div className="field">
                    <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Sort by:</label>
                    <select
                      value={localSortBy}
                      onChange={handleSortChange}
                      disabled={isSearching}
                      style={{
                        minWidth: '140px',
                        padding: '8px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                      }}
                    >
                      {SEARCH_CONSTANTS.SORT_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Order:</label>
                    <select
                      value={localSortOrder}
                      onChange={handleSortOrderChange}
                      disabled={isSearching}
                      style={{
                        minWidth: '100px',
                        padding: '8px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                      }}
                    >
                      <option value="desc">Descending ↓</option>
                      <option value="asc">Ascending ↑</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="four wide column">
              <button
                type="button"
                className={`ui button ${showAdvancedFilters ? 'active blue' : ''}`}
                onClick={toggleAdvancedFilters}
                disabled={isSearching}
                style={{ marginTop: '25px' }} // Align with labels
              >
                <i className="filter icon" />
                Filters
                <i className={`dropdown icon ${showAdvancedFilters ? 'rotated' : ''}`} />
              </button>
            </div>
          </div>
        )}

        {/* Advanced Filters Panel - Placeholder for now */}
        {showAdvancedFilters && searchType === 'segment' && (
          <div className="ui segment" style={{ marginTop: '10px' }}>
            <div className="ui grid">
              <div className="eight wide column">
                <div className="field">
                  <label>Date From</label>
                  <input
                    type="date"
                    value={searchParams?.dateFrom || ''}
                    onChange={e => {
                      dispatch(
                        updateSearchParams({
                          params: { dateFrom: e.target.value || null, page: 1 },
                        })
                      );
                      if (searchText) search();
                    }}
                    disabled={isSearching}
                  />
                </div>
              </div>
              <div className="eight wide column">
                <div className="field">
                  <label>Date To</label>
                  <input
                    type="date"
                    value={searchParams?.dateTo || ''}
                    onChange={e => {
                      dispatch(
                        updateSearchParams({
                          params: { dateTo: e.target.value || null, page: 1 },
                        })
                      );
                      if (searchText) search();
                    }}
                    disabled={isSearching}
                  />
                </div>
              </div>
            </div>
            <div className="ui divider"></div>
            <button
              type="button"
              className="ui button"
              onClick={() => {
                dispatch(
                  updateSearchParams({
                    params: { dateFrom: null, dateTo: null, page: 1 },
                  })
                );
                if (searchText) search();
              }}
              disabled={isSearching}
            >
              Clear Filters
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Searchbar;
