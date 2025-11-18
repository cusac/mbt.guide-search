import {
  AxiosResponseGeneric,
  SearchYTVideo,
  Segment,
  Video,
  VideoListYTVideo,
  YTResult,
  SearchParams,
  SearchResponse,
} from 'types';
import { httpClient as http } from '../services';
import repository from './repository.service';
import { AxiosPromise } from 'axios';
import { youtubeCall } from './youtube.service';

export const createVideoCall = ({
  youtube,
  duration,
  ytId,
}: {
  youtube: VideoListYTVideo;
  duration: number;
  ytId: string;
}): Promise<Video> => {
  return repository.video.create({
    youtube,
    duration,
    ytId,
  });
};

export const updateSegmentsCall = ({
  videoId,
  segments,
}: {
  videoId: string;
  segments: Partial<Segment>[];
}): Promise<AxiosResponseGeneric<Segment[]>> => {
  return http.post<Segment[]>('/update-video-segments', { videoId, segments });
};

/**
 * Search segments using the enhanced API v2.0
 *
 * @param params - Search parameters including filters, sorting, and pagination
 * @returns Promise<AxiosResponseGeneric<SearchResponse>> - Enhanced search response with metadata
 *
 * @example
 * ```typescript
 * const result = await searchSegmentsCall({
 *   term: 'psychology',
 *   sortBy: 'view_count',
 *   sortOrder: 'desc',
 *   page: 1,
 *   limit: 20,
 *   dateFrom: '2023-01-01',
 *   dateTo: '2023-12-31'
 * });
 * ```
 */
export const searchSegmentsCall = (params: SearchParams): AxiosPromise<SearchResponse> => {
  // Validate required parameters
  if (!params.term || typeof params.term !== 'string') {
    throw new Error('Search term is required and must be a string');
  }

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Add required parameter
  queryParams.append('term', params.term);

  // Add optional parameters only if they have values
  if (params.sortBy) {
    queryParams.append('sortBy', params.sortBy);
  }

  if (params.sortOrder) {
    queryParams.append('sortOrder', params.sortOrder);
  }

  if (params.page && params.page > 0) {
    queryParams.append('page', params.page.toString());
  }

  if (params.limit && params.limit > 0) {
    queryParams.append('limit', params.limit.toString());
  }

  if (params.dateFrom) {
    queryParams.append('dateFrom', params.dateFrom);
  }

  if (params.dateTo) {
    queryParams.append('dateTo', params.dateTo);
  }

  // Make API call with query parameters
  return http.get(`/search/segments?${queryParams.toString()}`);
};

/**
 * Validate search parameters before making API call
 *
 * @param params - Search parameters to validate
 * @throws Error if parameters are invalid
 */
export const validateSearchParams = (params: SearchParams): void => {
  if (!params.term || typeof params.term !== 'string') {
    throw new Error('Search term is required and must be a string');
  }

  if (params.sortBy && !['relevance', 'upload_date', 'view_count'].includes(params.sortBy)) {
    throw new Error('sortBy must be one of: relevance, upload_date, view_count');
  }

  if (params.sortOrder && !['asc', 'desc'].includes(params.sortOrder)) {
    throw new Error('sortOrder must be either asc or desc');
  }

  if (params.page && (params.page < 1 || !Number.isInteger(params.page))) {
    throw new Error('page must be a positive integer');
  }

  if (params.limit && (params.limit < 1 || params.limit > 100 || !Number.isInteger(params.limit))) {
    throw new Error('limit must be an integer between 1 and 100');
  }

  if (params.dateFrom && !isValidDateString(params.dateFrom)) {
    throw new Error('dateFrom must be a valid ISO date string');
  }

  if (params.dateTo && !isValidDateString(params.dateTo)) {
    throw new Error('dateTo must be a valid ISO date string');
  }
};

/**
 * Helper function to validate ISO date strings
 *
 * @param dateString - Date string to validate
 * @returns boolean indicating if the date string is valid
 */
const isValidDateString = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString === date.toISOString().split('T')[0];
};

export const searchVideosCall = ({
  term,
}: {
  term: string;
}): Promise<AxiosResponseGeneric<YTResult<SearchYTVideo>>> => {
  return youtubeCall<SearchYTVideo>({
    endpoint: 'search',
    params: {
      q: term,
    },
  });
};
