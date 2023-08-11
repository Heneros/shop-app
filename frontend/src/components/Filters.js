import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components';
import { getUniqueValues } from '../utils/helpers';
import { fetchFilters, fetchProducts, updateCategoryFilter } from '../redux/slices/products';


export default function Filters() {

  const dispatch = useDispatch();
  const { filters, selectedCategory } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  const handleCategoryClick = (category) => {
    dispatch(updateCategoryFilter(category));
  };


  console.log(selectedCategory)

  return (
    <Wrapper>
      <div className='content'>
        <div className='form-control'>
          <h5>Category</h5>
          {Array.isArray(filters) ? (
            filters.map((item, index) => (
              <button
                key={index}
                type='button'
                name='category'
                onClick={() => handleCategoryClick(item)}
                className={`${selectedCategory === item ? 'active' : ''
                  }`}
              >
                {item}
              </button>
            ))
          ) : (
            <span>No categories found</span>
          )}
          <button
            type='button'
            name='category'
            className={`${selectedCategory === null ? 'active' : 'all-btn'
              }`}
            onClick={() => handleCategoryClick(null)}>All</button>
        </div>
      </div>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`
