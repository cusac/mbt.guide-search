/**
 * Search API v2.0 Type Definitions
 *
 * This file contains TypeScript interfaces for the enhanced search functionality
 * including advanced filtering, sorting, and pagination capabilities.
 */

import { Segment } from './segment.type';

/**
 * Search parameters interface for API v2.0
 * Supports advanced filtering, sorting, and pagination
 */
export interface SearchParams {
  /** Search query string (required) */
  term: string;

  /** Sort method - how to order results */
  sortBy?: 'relevance' | 'upload_date' | 'view_count';

  /** Sort direction - ascending or descending */
  sortOrder?: 'asc' | 'desc';

  /** Page number for pagination (1-based) */
  page?: number;

  /** Number of results per page (1-100) */
  limit?: number;

  /** Filter results from this date (ISO string) */
  dateFrom?: string | null;

  /** Filter results to this date (ISO string) */
  dateTo?: string | null;
}

/**
 * Pagination metadata from search response
 * Contains information about current page and total results
 */
export interface PaginationData {
  /** Current page number */
  page: number;

  /** Results per page */
  limit: number;

  /** Total number of results across all pages */
  totalResults: number;

  /** Total number of pages */
  totalPages: number;

  /** Whether there is a next page */
  hasNext: boolean;

  /** Whether there is a previous page */
  hasPrev: boolean;
}

/**
 * Complete search response from API v2.0
 * Includes results, pagination info, and search parameters
 */
export interface SearchResponse {
  /** Array of segment results */
  segments: Segment[];

  /** Pagination metadata */
  pagination: PaginationData;

  /** Search parameters that were used */
  searchParams: {
    term: string;
    sortBy: string;
    sortOrder: string;
    dateFrom: string | null;
    dateTo: string | null;
  };
}

/**
 * Search UI state interface
 * Manages the state of search controls and filters
 */
export interface SearchUIState {
  /** Current search parameters */
  searchParams: SearchParams;

  /** Current pagination state */
  pagination: PaginationData | null;

  /** Whether advanced filters are visible */
  showAdvancedFilters: boolean;

  /** History of user's sort preferences */
  sortHistory: string[];

  /** Search results cache for performance */
  searchCache: Map<string, SearchResponse>;

  /** Loading state for search operations */
  isSearching: boolean;
}

/**
 * Search error types for better error handling
 */
export type SearchError = {
  type: 'INVALID_PARAMS' | 'NO_RESULTS' | 'NETWORK_ERROR' | 'SERVER_ERROR';
  message: string;
  details?: any;
};

/**
 * Date range preset options for quick filtering
 */
export interface DateRangePreset {
  label: string;
  value: string;
  dateFrom: string;
  dateTo: string | null;
}

/**
 * Sort option configuration
 */
export interface SortOption {
  value: 'relevance' | 'upload_date' | 'view_count';
  label: string;
  description: string;
}

/**
 * Search analytics data for tracking user behavior
 */
export interface SearchAnalytics {
  searchTerm: string;
  sortBy: string;
  sortOrder: string;
  resultsCount: number;
  hasFilters: boolean;
  timestamp: string;
}

/**
 * Component props interfaces
 */

export interface SearchbarProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
  currentParams: SearchParams;
  error?: SearchError;
}

export interface PaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  isLoading: boolean;
}

export interface SortDropdownProps {
  sortBy: string;
  sortOrder: string;
  onSortChange: (sortBy: string, sortOrder: string) => void;
  options: SortOption[];
}

export interface DateRangeFilterProps {
  dateFrom: string | null;
  dateTo: string | null;
  onDateChange: (dateFrom: string | null, dateTo: string | null) => void;
  presets: DateRangePreset[];
}

export interface AdvancedFiltersProps {
  isVisible: boolean;
  onToggle: () => void;
  searchParams: SearchParams;
  onParamsChange: (params: Partial<SearchParams>) => void;
}

export interface ResultsHeaderProps {
  totalResults: number;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  sortBy: string;
  hasFilters: boolean;
}

/**
 * Constants for search configuration
 */
export const SEARCH_CONSTANTS = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
  DEBOUNCE_DELAY: 300,
  CACHE_SIZE: 50,
  SORT_OPTIONS: [
    { value: 'relevance', label: 'Relevance', description: 'Most relevant results first' },
    { value: 'upload_date', label: 'Upload Date', description: 'Newest content first' },
    { value: 'view_count', label: 'View Count', description: 'Most popular content first' },
  ] as SortOption[],
  DATE_PRESETS: [
    { label: 'Last 7 days', value: '7d', dateFrom: '', dateTo: null },
    { label: 'Last 30 days', value: '30d', dateFrom: '', dateTo: null },
    { label: 'Last 3 months', value: '3m', dateFrom: '', dateTo: null },
    { label: 'Last year', value: '1y', dateFrom: '', dateTo: null },
    { label: 'All time', value: 'all', dateFrom: '', dateTo: null },
  ] as DateRangePreset[],
} as const;

/**
 * Type guards for runtime type checking
 */
export const isSearchParams = (obj: any): obj is SearchParams => {
  return (
    typeof obj === 'object' &&
    typeof obj.term === 'string' &&
    (obj.sortBy === undefined || ['relevance', 'upload_date', 'view_count'].includes(obj.sortBy)) &&
    (obj.sortOrder === undefined || ['asc', 'desc'].includes(obj.sortOrder))
  );
};

export const isSearchResponse = (obj: any): obj is SearchResponse => {
  return (
    typeof obj === 'object' &&
    Array.isArray(obj.segments) &&
    typeof obj.pagination === 'object' &&
    typeof obj.searchParams === 'object'
  );
};

/**
 * Helper functions for search parameters
 */
export const createSearchParams = (overrides: Partial<SearchParams> = {}): SearchParams => {
  return {
    term: '',
    sortBy: 'relevance',
    sortOrder: 'desc',
    page: 1,
    limit: SEARCH_CONSTANTS.DEFAULT_LIMIT,
    dateFrom: null,
    dateTo: null,
    ...overrides,
  };
};

export const createSearchCacheKey = (params: SearchParams): string => {
  return JSON.stringify({
    term: params.term,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    page: params.page,
    limit: params.limit,
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
  });
};
