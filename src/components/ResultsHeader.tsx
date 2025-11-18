import React from 'react';
import { Icon, Label } from 'semantic-ui-react';

interface ResultsHeaderProps {
  totalResults: number;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  sortBy: string;
  hasFilters: boolean;
  isLoading?: boolean;
  searchTime?: number;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  totalResults,
  currentPage,
  totalPages,
  searchTerm,
  sortBy,
  hasFilters,
  isLoading = false,
  searchTime,
}) => {
  const getSortLabel = (sortBy: string) => {
    switch (sortBy) {
      case 'relevance':
        return 'Most Relevant';
      case 'upload_date':
        return 'Newest First';
      case 'view_count':
        return 'Most Popular';
      default:
        return 'Relevance';
    }
  };

  const getSortIcon = (sortBy: string) => {
    switch (sortBy) {
      case 'relevance':
        return 'star';
      case 'upload_date':
        return 'calendar';
      case 'view_count':
        return 'eye';
      default:
        return 'star';
    }
  };

  if (isLoading) {
    return (
      <div className="results-header ui segment">
        <div className="ui active inline loader"></div>
        <span style={{ marginLeft: '10px' }}>Searching...</span>
      </div>
    );
  }

  if (totalResults === 0) {
    return (
      <div className="results-header ui segment">
        <div className="ui icon message">
          <Icon name="search" />
          <div className="content">
            <div className="header">No results found</div>
            <p>
              No segments found for "<strong>{searchTerm}</strong>". Try different keywords or
              adjust your filters.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="results-header ui segment">
      <div className="ui stackable grid">
        <div className="twelve wide column">
          <div className="ui horizontal list">
            <div className="item">
              <div className="content">
                <div className="ui large header" style={{ margin: 0 }}>
                  {totalResults.toLocaleString()} results
                </div>
                <div className="description">
                  for "<strong>{searchTerm}</strong>"
                  {searchTime && (
                    <span className="ui basic label" style={{ marginLeft: '10px' }}>
                      {searchTime < 1000 ? `${searchTime}ms` : `${(searchTime / 1000).toFixed(2)}s`}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="four wide column">
          <div className="ui horizontal list" style={{ float: 'right' }}>
            <div className="item">
              <Label color="blue">
                <Icon name={getSortIcon(sortBy)} />
                {getSortLabel(sortBy)}
              </Label>
            </div>

            {hasFilters && (
              <div className="item">
                <Label color="green">
                  <Icon name="filter" />
                  Filtered
                </Label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Page indicator for multi-page results */}
      {totalPages > 1 && (
        <>
          <div className="ui divider"></div>
          <div className="ui centered grid">
            <div className="row">
              <div className="column">
                <div className="ui basic compact segment">
                  <Icon name="file outline" />
                  Page {currentPage} of {totalPages}
                  <span className="ui basic label" style={{ marginLeft: '10px' }}>
                    {((currentPage - 1) * 20 + 1).toLocaleString()}-
                    {Math.min(currentPage * 20, totalResults).toLocaleString()} of{' '}
                    {totalResults.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsHeader;
