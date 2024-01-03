import * as React from 'react';
import { Pagination as MuiPagination, Link as MuiLink } from '@mui/material';
import { useNavigate } from
 
'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const navigate = useNavigate();

  return (
    pages > 1 && (
      <MuiPagination count={pages} page={page - 1}>
        {(page) => (
          <MuiLink
            key={page + 1}
            component="button"
            onClick={() => {
              const pathname = !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${page + 1}`
                  : `/page/${page + 1}`
                : `/admin/productlist/${page + 1}`;
              navigate(pathname);
            }}
          >
            {page + 1}
          </MuiLink>
        )}
      </MuiPagination>
    )
  );
};

export default Paginate;
