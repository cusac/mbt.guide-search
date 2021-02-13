import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { searchSegments, searchYTVideos, setSearchText } from '../store/video/video.store';
import { toastError } from '../utils/toastHelper';

const Searchbar = (): any => {
  // const [term, setTerm] = React.useState('');

  const searchType = useSelector((state: RootState) => state.video.searchType);
  const searchText = useSelector((state: RootState) => state.video.searchText);

  const dispatch = useAppDispatch();

  const handleChange = (event: any) => {
    // setTerm(event.target.value);
    dispatch(setSearchText({ searchText: event.target.value }));
  };

  const search = async (event: any) => {
    event.preventDefault();
    if (searchType === 'segment') {
      try {
        await dispatch(searchSegments({ term: searchText }));
      } catch (err) {
        toastError(
          'There was an error fetching segment data. Please refresh the page and try again.',
          err
        );
      }
    } else {
      try {
        await dispatch(searchYTVideos({ term: searchText }));
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

  return (
    <div className="search-bar ui segment">
      <form onSubmit={search} className="ui form">
        <div className="field">
          <div className="ui icon input">
            <input
              className="prompt"
              onChange={handleChange}
              type="text"
              placeholder={getPlaceHolder()}
              value={searchText}
            />
            <i className="search icon" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
