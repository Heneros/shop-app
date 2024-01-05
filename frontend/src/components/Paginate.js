import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Pagination.css';
import { Box } from '@mui/material';

const Pagination = ({ pages, currentPage, keyword, isAdmin = false }) => {
  const renderPagination = () => {
    const pageLinks = [];
    for (let i = 1; i <= pages; i++) {
      const linkClass = i === currentPage ? 'selected' : '';
      pageLinks.push(
        <li key={i} className={linkClass}>
          <Link
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${i}`
                  : `/page/${i}`
                : `/admin/productlist/${i}`
            }
            className="page-link"
          >
            {i}
          </Link>
        </li>
      );
    }
    return pageLinks;
  };

  return (
    <Box sx={{ marginY: 2, display: "flex", alignItems: 'center', justifyContent: "center" }}>
      <ul className="pagination">
        {currentPage > 1 && (
          <li>
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${currentPage - 1}`
                    : `/page/${currentPage - 1}`
                  : `/admin/productlist/${currentPage - 1}`
              }
            >
              Prev
            </Link>
          </li>
        )}
        {renderPagination()}
        {currentPage < pages && (
          <li>
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${currentPage + 1}`
                    : `/page/${currentPage + 1}`
                  : `/admin/productlist/${currentPage + 1}`
              }
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </Box>
  );
};
export default Pagination;
