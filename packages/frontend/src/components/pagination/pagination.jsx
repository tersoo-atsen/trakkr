import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './pagination.scss';

const Pagination = (props) => {
  const {
    totalPages, currentPage, hasNext, hasPrevious, handleData,
  } = props;

  const handleClick = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(e.target.getAttribute('tabIndex'), 10);
    handleData(pageNumber);
  };

  const handleNext = () => {
    if (currentPage <= totalPages) {
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
  for (let number = 1; number <= totalPages; number += 1) {
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
        { number}
      </span>
    );
  });

  return (
    <div className="pagination-wrapper">
      {renderPageNumbers}
      <button
        id="previous-button"
        onClick={handlePrevious}
        className="button"
        disabled={!hasPrevious}
      >
        <span className="previous-arrow">
          <FontAwesomeIcon icon="chevron-left" size="sm" />
        </span>
          Prev
      </button>
      <button
        id="next-button"
        className="button"
        disabled={!hasNext}
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
  hasNext: PropTypes.bool.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
  handleData: PropTypes.func.isRequired,
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
