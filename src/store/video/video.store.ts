import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as luxon from 'luxon';
import { AsyncAppThunk } from 'store';
import {
  createVideoCall,
  searchSegmentsCall,
  toYTVid,
  updateSegmentsCall,
  youtubeCall,
} from '../../services';
import {
  assertModelArrayType,
  AxiosErrorData,
  SearchYTVideo,
  Segment,
  SegmentTag,
  Video,
  VideoListYTVideo,
  YTVideo,
  SearchParams,
  SearchResponse,
  PaginationData,
  createSearchParams,
} from '../../types';
import captureAndLog from '../../utils/captureAndLog';
import { parseError } from '../utils';
import { AxiosResponse } from 'axios';

//#region Types

export type VideoStoreAction =
  | 'createVideo'
  | 'updateSegments'
  | 'searchSegments'
  | 'searchYTVideos';

export type SearchType = 'segment' | 'ytVideo';

export type VideoState = {
  lastViewedSegmentId: string;
  lastViewedVideoId: string;
  searchSegmentsResult: Segment[];
  searchYTVideosResult: YTVideo[];
  searchType: SearchType;
  searchText: string;
  hasSearched: boolean;
  loadingSegments: boolean;
  loadingVideos: boolean;
  segmentListTrigger: {};
  errors: Record<VideoStoreAction, Error | AxiosErrorData | undefined>;

  // NEW: Enhanced search state for API v2.0
  searchParams: SearchParams;
  pagination: PaginationData | null;
  showAdvancedFilters: boolean;
  sortHistory: string[];
  searchCache: Record<string, SearchResponse>;
  isSearching: boolean;
};

//#endregion

const channelId = 'UCYwlraEwuFB4ZqASowjoM0g';

//#region Reducers
/**
 * Reducers should only contain logic to update state. All other store logic should be moved to the actions/thunks.
 */

const initalVideoState: VideoState = {
  errors: {} as any,
  searchSegmentsResult: [],
  searchYTVideosResult: [],
  searchType: 'segment',
  searchText: '',
  hasSearched: false,
  loadingSegments: false,
  loadingVideos: false,
  lastViewedSegmentId: '',
  lastViewedVideoId: '',
  segmentListTrigger: {},

  // NEW: Enhanced search state initialization
  searchParams: createSearchParams(),
  pagination: null,
  showAdvancedFilters: false,
  sortHistory: [],
  searchCache: {},
  isSearching: false,
};

export const videoStore = createSlice({
  name: 'video',
  initialState: initalVideoState,
  reducers: {
    setLastViewedSegmentId(state, { payload }: PayloadAction<{ lastViewedSegmentId: string }>) {
      const { lastViewedSegmentId } = payload;
      state.lastViewedSegmentId = lastViewedSegmentId;
    },
    setLastViewedVideoId(state, { payload }: PayloadAction<{ lastViewedVideoId: string }>) {
      const { lastViewedVideoId } = payload;
      state.lastViewedVideoId = lastViewedVideoId;
    },
    setSearchSegmentsResult(
      state,
      { payload }: PayloadAction<{ searchSegmentsResult: Segment[] }>
    ) {
      const { searchSegmentsResult } = payload;
      state.searchSegmentsResult = searchSegmentsResult;
    },
    setSearchYTVideosResult(
      state,
      { payload }: PayloadAction<{ searchYTVideosResult: YTVideo[] }>
    ) {
      const { searchYTVideosResult } = payload;
      state.searchYTVideosResult = searchYTVideosResult;
    },
    setSearchType(state, { payload }: PayloadAction<{ searchType: SearchType }>) {
      const { searchType } = payload;
      state.searchType = searchType;
    },
    setSearchText(state, { payload }: PayloadAction<{ searchText: string }>) {
      const { searchText } = payload;
      state.searchText = searchText;
      // Update searchParams when searchText changes
      if (!state.searchParams) {
        state.searchParams = createSearchParams();
      }
      state.searchParams.term = searchText;
    },
    setHasSearched(state, { payload }: PayloadAction<{ hasSearched: boolean }>) {
      const { hasSearched } = payload;
      state.hasSearched = hasSearched;
    },
    setLoadingSegments(state, { payload }: PayloadAction<{ loadingSegments: boolean }>) {
      const { loadingSegments } = payload;
      state.loadingSegments = loadingSegments;
    },
    setLoadingVideos(state, { payload }: PayloadAction<{ loadingVideos: boolean }>) {
      const { loadingVideos } = payload;
      state.loadingVideos = loadingVideos;
    },
    refreshSegmentList(state, { payload }: PayloadAction<{}>) {
      state.segmentListTrigger = {};
      state.hasSearched = false;
      state.searchText = '';
      state.searchParams = createSearchParams();
      state.pagination = null;
    },
    setError(
      state,
      { payload }: PayloadAction<{ action: VideoStoreAction; err: Error | AxiosErrorData }>
    ) {
      const { action, err } = payload;
      state.errors[action] = err;
    },
    clearError(state, { payload }: PayloadAction<{ action: VideoStoreAction }>) {
      const { action } = payload;
      state.errors[action] = undefined;
    },

    // NEW: Enhanced search actions for API v2.0
    setSearchParams(state, { payload }: PayloadAction<{ searchParams: SearchParams }>) {
      const { searchParams } = payload;
      state.searchParams = searchParams;
      state.searchText = searchParams.term;
    },
    updateSearchParams(state, { payload }: PayloadAction<{ params: Partial<SearchParams> }>) {
      const { params } = payload;
      if (!state.searchParams) {
        state.searchParams = createSearchParams();
      }
      state.searchParams = { ...state.searchParams, ...params };
      if (params.term !== undefined) {
        state.searchText = params.term;
      }
    },
    setPagination(state, { payload }: PayloadAction<{ pagination: PaginationData }>) {
      const { pagination } = payload;
      state.pagination = pagination;
    },
    setShowAdvancedFilters(state, { payload }: PayloadAction<{ showAdvancedFilters: boolean }>) {
      const { showAdvancedFilters } = payload;
      state.showAdvancedFilters = showAdvancedFilters;
    },
    updateSortHistory(state, { payload }: PayloadAction<{ sortBy: string }>) {
      const { sortBy } = payload;
      // Initialize sortHistory if it doesn't exist
      if (!state.sortHistory) {
        state.sortHistory = [];
      }
      // Add to history if not already present
      if (!state.sortHistory.includes(sortBy)) {
        state.sortHistory.unshift(sortBy);
        // Keep only last 5 sort preferences
        if (state.sortHistory.length > 5) {
          state.sortHistory = state.sortHistory.slice(0, 5);
        }
      }
    },
    setSearchCache(state, { payload }: PayloadAction<{ key: string; response: SearchResponse }>) {
      const { key, response } = payload;
      if (!state.searchCache) {
        state.searchCache = {};
      }
      state.searchCache[key] = response;
    },
    setIsSearching(state, { payload }: PayloadAction<{ isSearching: boolean }>) {
      const { isSearching } = payload;
      state.isSearching = isSearching;
    },
  },
});

export const {
  setLastViewedSegmentId,
  setLastViewedVideoId,
  setSearchSegmentsResult,
  setSearchYTVideosResult,
  setSearchType,
  setSearchText,
  setHasSearched,
  setLoadingSegments,
  setLoadingVideos,
  refreshSegmentList,
  setSearchParams,
  updateSearchParams,
  setPagination,
  setShowAdvancedFilters,
  updateSortHistory,
  setSearchCache,
  setIsSearching,
} = videoStore.actions;
const { setError, clearError } = videoStore.actions;

//#region Async Actions (Thunks)
/**
 * These actions contain the main logic to process and fetch state.
 *
 * Most async actions will be split into three parts: the call action, a success action, and a failure action.
 */

//#region createVideo
export const createVideo = ({ videoId }: { videoId: string }): AsyncAppThunk<Video> => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await youtubeCall<VideoListYTVideo>({
      endpoint: 'videos',
      params: {
        id: videoId,
        part: 'snippet,contentDetails',
      },
    });

    const ytVideo = data.items[0];

    if (!ytVideo) {
      throw new Error(`Missing YouTube Video with id ${videoId}`);
    }

    let duration;

    if (!ytVideo.contentDetails) {
      throw new Error(`Missing contentDetails for YouTube Video with id ${videoId}`);
    } else {
      duration = luxon.Duration.fromISO(ytVideo.contentDetails.duration).as('seconds');
    }

    const video = await createVideoCall({
      youtube: ytVideo,
      duration: duration,
      ytId: videoId,
    });

    dispatch(clearError({ action: 'createVideo' }));

    return video;
  } catch (err) {
    captureAndLog({ file: 'videoStore', method: 'createVideo', err });
    dispatch(setError({ action: 'createVideo', err: parseError(err as Error) }));
    throw err;
  }
};

//#endregion

//#region updateSegments
export const updateSegments = ({
  videoId,
  segments,
}: {
  videoId: string;
  segments: Partial<Segment>[];
}): AsyncAppThunk<Segment[]> => async (dispatch, getState) => {
  try {
    segments = segments.map(formatSegmentForUpdate);
    const { data } = await updateSegmentsCall({ videoId, segments });
    dispatch(clearError({ action: 'updateSegments' }));
    return data;
  } catch (err) {
    captureAndLog({ file: 'videoStore', method: 'updateSegments', err });
    dispatch(setError({ action: 'updateSegments', err: parseError(err as Error) }));
    throw err;
  }
};
//#endregion

//#region searchSegments

/**
 * Enhanced search segments using API v2.0 with caching, pagination, and advanced filters
 *
 * @param params - Search parameters for advanced search
 * @returns Promise<Segment[]> - Array of matching segments
 */
export const searchSegments = (params: SearchParams): AsyncAppThunk<Segment[]> => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setIsSearching({ isSearching: true }));
    dispatch(setLoadingSegments({ loadingSegments: true }));

    // Update search params in state
    dispatch(setSearchParams({ searchParams: params }));

    // Generate cache key for this search
    const cacheKey = JSON.stringify(params);
    const state = getState();

    // Check cache first for performance
    if (state.video.searchCache && state.video.searchCache[cacheKey]) {
      const cachedResponse = state.video.searchCache[cacheKey];
      dispatch(searchSegmentsSuccess(cachedResponse));
      return cachedResponse.segments;
    }

    // Make API call with new parameters
    const { data } = await searchSegmentsCall(params);

    // Cache the response
    dispatch(setSearchCache({ key: cacheKey, response: data }));

    // Update sort history if sortBy was used
    if (params.sortBy) {
      dispatch(updateSortHistory({ sortBy: params.sortBy }));
    }

    dispatch(searchSegmentsSuccess(data));
    return data.segments;
  } catch (err) {
    dispatch(searchSegmentsFailure(err as Error));
    throw err;
  } finally {
    dispatch(setLoadingSegments({ loadingSegments: false }));
    dispatch(setIsSearching({ isSearching: false }));
  }
};

/**
 * Handle successful search response with enhanced metadata
 *
 * @param searchResponse - Complete search response from API v2.0
 */
export const searchSegmentsSuccess = (searchResponse: SearchResponse): AsyncAppThunk => async (
  dispatch,
  getState
) => {
  dispatch(setHasSearched({ hasSearched: true }));

  // Extract segments and filter out any null results
  const searchSegmentsResult = searchResponse.segments.filter(r => r !== null);
  dispatch(setSearchSegmentsResult({ searchSegmentsResult }));

  // Set pagination data
  dispatch(setPagination({ pagination: searchResponse.pagination }));

  dispatch(clearError({ action: 'searchSegments' }));
};

/**
 * Handle search failure with enhanced error reporting
 *
 * @param err - Error from search operation
 */
export const searchSegmentsFailure = (err: Error | AxiosResponse): AsyncAppThunk => async (
  dispatch,
  getState
) => {
  captureAndLog({ file: 'videoStore', method: 'searchSegments', err });
  dispatch(setError({ action: 'searchSegments', err: parseError(err as Error) }));
};

/**
 * Navigate to a specific page of search results
 *
 * @param page - Page number to navigate to
 */
export const navigateToPage = (page: number): AsyncAppThunk<Segment[]> => async (
  dispatch,
  getState
) => {
  const state = getState();
  const currentParams = state.video.searchParams || createSearchParams();

  const newParams = {
    ...currentParams,
    page: page,
  };

  return dispatch(searchSegments(newParams));
};

/**
 * Change sort method and perform new search
 *
 * @param sortBy - Sort method to use
 * @param sortOrder - Sort direction (asc/desc)
 */
export const changeSort = (
  sortBy: string,
  sortOrder: string = 'desc'
): AsyncAppThunk<Segment[]> => async (dispatch, getState) => {
  const state = getState();
  const currentParams = state.video.searchParams || createSearchParams();

  const newParams = {
    ...currentParams,
    sortBy: sortBy as 'relevance' | 'upload_date' | 'view_count',
    sortOrder: sortOrder as 'asc' | 'desc',
    page: 1, // Reset to first page when changing sort
  };

  return dispatch(searchSegments(newParams));
};

/**
 * Apply date filter and perform new search
 *
 * @param dateFrom - Start date for filter
 * @param dateTo - End date for filter
 */
export const applyDateFilter = (
  dateFrom: string | null,
  dateTo: string | null
): AsyncAppThunk<Segment[]> => async (dispatch, getState) => {
  const state = getState();
  const currentParams = state.video.searchParams || createSearchParams();

  const newParams = {
    ...currentParams,
    dateFrom,
    dateTo,
    page: 1, // Reset to first page when applying filters
  };

  return dispatch(searchSegments(newParams));
};

//#endregion

//#region searchYTVideos
export const searchYTVideos = ({ term }: { term: string }): AsyncAppThunk<YTVideo[]> => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setLoadingVideos({ loadingVideos: true }));
    const { data } = await youtubeCall<SearchYTVideo>({
      endpoint: 'search',
      params: {
        q: term,
      },
    });

    // Filter out any videos that don't belong to the MBT channel
    const ytVids = data.items.filter(v => v.snippet.channelId === channelId).map(toYTVid);
    dispatch(searchVideosSuccess(ytVids));
    return ytVids;
  } catch (err) {
    dispatch(searchVideosFailure(err as Error));
    throw err;
  } finally {
    dispatch(setLoadingVideos({ loadingVideos: false }));
  }
};

export const searchVideosSuccess = (searchYTVideosResult: YTVideo[]): AsyncAppThunk => async (
  dispatch,
  getState
) => {
  dispatch(setHasSearched({ hasSearched: true }));
  dispatch(setSearchYTVideosResult({ searchYTVideosResult }));
  dispatch(clearError({ action: 'searchYTVideos' }));
};

export const searchVideosFailure = (err: Error | AxiosResponse): AsyncAppThunk => async (
  dispatch,
  getState
) => {
  captureAndLog({ file: 'videoStore', method: 'searchYTVideos', err });
  dispatch(setError({ action: 'searchYTVideos', err: parseError(err as Error) }));
};
//#endregion

//#endregion

//#region Synchronous Actions (Thunks)
/**
 * These actions contain only synchronous logic
 */

//#endregion

//#region Utilities

function formatSegmentForUpdate(segment: Partial<Segment>): Partial<Segment> {
  const { segmentId, video, start, end, title, description, tags, pristine } = segment;
  if (assertModelArrayType<SegmentTag>(tags, 'SegmentTag')) {
    return {
      segmentId,
      video,
      start,
      end,
      title,
      description,
      tags: tags.map(formatTagForUpdate),
      pristine: pristine === false ? false : true,
    };
  } else {
    throw new Error('Tags to update are incorrect format.');
  }
}

function formatTagForUpdate(segmentTag: SegmentTag): SegmentTag {
  const { tag, rank } = segmentTag;
  const { name } = tag;
  return {
    tag: {
      name,
    },
    rank,
  };
}

//#endregion
