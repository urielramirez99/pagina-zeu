import React from 'react';
import "../styles/pagination.css"

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  // Evitar renders innecesarios si solo hay 1 página
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Corrección: pointerEvents en camelCase
  const stylePrevButton = isFirstPage ? { pointerEvents: "none", opacity: 0.5 } : {};
  const styleNextButton = isLastPage ? { pointerEvents: "none", opacity: 0.5 } : {};

  const handlePrevClick = (event) => {
    event.preventDefault();
    if (!isFirstPage) onPageChange(currentPage - 1);
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    if (!isLastPage) onPageChange(currentPage + 1);
  };

  // Pasamos directamente el número de página
  const handleChangePage = (event, page) => {
    event.preventDefault();
    if (page !== currentPage) onPageChange(page);
  };

  return (
    <nav className='pagination'>
      <button href="#" style={stylePrevButton} onClick={handlePrevClick} aria-label="Página anterior">
        <svg width="16" height="16" viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth="2" strokeLinecap='round' strokeLinejoin='round'>
          <path d='M15 18l-6-6 6-6'/>
        </svg>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          href='#'
          className={currentPage === page ? "is-active" : ""}
          onClick={(e) => handleChangePage(e, page)} // Corrección: pasar e y page
        >
          {page}
        </button>
      ))}

      <button href="#" style={styleNextButton} onClick={handleNextClick} aria-label="Página siguiente">
        <svg width="16" height="16" viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth="2" strokeLinecap='round' strokeLinejoin='round'>
          <path d='M9 18l6-6-6-6'/>
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;