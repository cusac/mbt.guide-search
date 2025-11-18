import { httpClient as http } from '../services';
import { captureAndLog } from '../utils';
import { SearchParams } from '../types';
import { AxiosPromise } from 'axios';

const internals = {} as any;

/**
 * Search segments using the enhanced API v2.0
 *
 * @param params - Search parameters including filters, sorting, and pagination
 * @returns AxiosPromise - Axios promise with SearchResponse data
 */
internals.searchSegments = (params: SearchParams): AxiosPromise => {
  try {
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
  } catch (err) {
    captureAndLog({ file: 'searchService', method: 'searchSegments', err });
    throw err;
  }
};

export default internals;
