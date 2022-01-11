import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './pagination.scss';

const Pagination = (props) => {
  const { pageInfo, handleData, currentPage } = props;
  const {
    pages, hasPrevPage, hasNextPage,
  } = pageInfo;
  const handleClick = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(e.target.getAttribute('tabIndex'), 10);
    handleData(pageNumber);
  };

  const handleNext = (e) => {
    if (currentPage <= pages) {
      handleData(currentPage + 1);
    }
    return null;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handleData(currentPage - 1);
    }
  };

  const pageNumbers = [];
  for (let number = 1; number <= pages; number += 1) {
    pageNumbers.push(number);
  }
  const renderPageNumbers = pageNumbers.map((number) => {
    const classes = currentPage === number ? 'active page-number' : 'page-number';

    return (
      <span
        key={number}
        role="button"
        tabIndex={number}
        className={classes}
        onClick={(event) => handleClick(event)}
        aria-hidden="true"
      >
        {number}
      </span>
    );
  });

  return (
    <div className="pagination-wrapper">
      {renderPageNumbers}
      <button
        id="previous-button"
        className="button"
        disabled={!hasPrevPage}
        onClick={handlePrevious}
      >
        <span className="previous-arrow">
          <FontAwesomeIcon icon="chevron-left" size="sm" />
        </span>
        Prev
      </button>
      <button
        id="next-button"
        className="button"
        disabled={!hasNextPage}
        onClick={handleNext}
      >
        Next
        <span className="next-arrow">
          <FontAwesomeIcon icon="chevron-right" size="sm" />
        </span>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  pageInfo: PropTypes.shape({
    pages: PropTypes.number.isRequired,
    hasPrevPage: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }).isRequired,
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleData: PropTypes.func.isRequired,
};

export default Pagination;
