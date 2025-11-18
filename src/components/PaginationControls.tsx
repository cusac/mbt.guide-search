import React from 'react';
import { Button, Icon, Dropdown } from 'semantic-ui-react';
import { PaginationData } from 'types';

interface PaginationControlsProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  isLoading?: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  pagination,
  onPageChange,
  onLimitChange,
  isLoading = false,
}) => {
  const { page, limit, totalResults, totalPages, hasNext, hasPrev } = pagination;

  const handlePreviousPage = () => {
    if (hasPrev && !isLoading) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNext && !isLoading) {
      onPageChange(page + 1);
    }
  };

  const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      const newPage = parseInt(target.value, 10);
      if (newPage >= 1 && newPage <= totalPages && !isLoading) {
        onPageChange(newPage);
        target.blur();
      }
    }
  };

  const limitOptions = [
    { key: 10, text: '10 per page', value: 10 },
    { key: 20, text: '20 per page', value: 20 },
    { key: 50, text: '50 per page', value: 50 },
    { key: 100, text: '100 per page', value: 100 },
  ];

  const startResult = (page - 1) * limit + 1;
  const endResult = Math.min(page * limit, totalResults);

  // Don't render if no results
  if (totalResults === 0) {
    return null;
  }

  return (
    <div className="pagination-controls ui segment">
      <div className="ui stackable grid">
        <div className="eight wide column">
          <div className="ui horizontal list">
            <div className="item">
              <Button
                icon
                labelPosition="left"
                onClick={handlePreviousPage}
                disabled={!hasPrev || isLoading}
                className={isLoading ? 'loading' : ''}
              >
                <Icon name="chevron left" />
                Previous
              </Button>
            </div>

            <div className="item">
              <div className="ui labeled input">
                <div className="ui label">Page</div>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  defaultValue={page}
                  onKeyPress={handlePageInput}
                  disabled={isLoading}
                  style={{ width: '60px', textAlign: 'center' }}
                />
                <div className="ui basic label">of {totalPages}</div>
              </div>
            </div>

            <div className="item">
              <Button
                icon
                labelPosition="right"
                onClick={handleNextPage}
                disabled={!hasNext || isLoading}
                className={isLoading ? 'loading' : ''}
              >
                Next
                <Icon name="chevron right" />
              </Button>
            </div>
          </div>
        </div>

        <div className="eight wide column">
          <div className="ui horizontal list" style={{ float: 'right' }}>
            <div className="item">
              <span className="ui basic label">
                Showing {startResult}-{endResult} of {totalResults.toLocaleString()} results
              </span>
            </div>

            {onLimitChange && (
              <div className="item">
                <Dropdown
                  selection
                  value={limit}
                  options={limitOptions}
                  onChange={(e, { value }) => onLimitChange(value as number)}
                  disabled={isLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar for loading */}
      {isLoading && (
        <div className="ui progress active" style={{ marginTop: '10px' }}>
          <div className="bar">
            <div className="progress"></div>
          </div>
          <div className="label">Loading search results...</div>
        </div>
      )}

      {/* Quick page navigation for larger result sets */}
      {totalPages > 5 && (
        <div className="ui centered grid" style={{ marginTop: '10px' }}>
          <div className="row">
            <div className="column">
              <div className="ui compact menu">
                {page > 3 && (
                  <>
                    <button className="item" onClick={() => onPageChange(1)} disabled={isLoading}>
                      1
                    </button>
                    {page > 4 && <div className="item">...</div>}
                  </>
                )}

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                  if (pageNum > totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      className={`item ${pageNum === page ? 'active' : ''}`}
                      onClick={() => onPageChange(pageNum)}
                      disabled={isLoading}
                    >
                      {pageNum}
                    </button>
                  );
                }).filter(Boolean)}

                {page < totalPages - 2 && (
                  <>
                    {page < totalPages - 3 && <div className="item">...</div>}
                    <button
                      className="item"
                      onClick={() => onPageChange(totalPages)}
                      disabled={isLoading}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationControls;
