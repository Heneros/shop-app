import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components';
import { getUniqueValues } from '../utils/helpers';
import { fetchFilters, fetchProducts, updateCategoryFilter } from '../redux/slices/products';


export default function Filters() {

  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  const handleCategoryClick = (category) => {
    dispatch(updateCategoryFilter(category));
  };

  // const allCategories = products.items.reduce((categories, product) => {
  //   return categories.concat(product.categories);
  // }, []);

  // const uniqueCategories = [...new Set(allCategories)];


  return (
    <Wrapper>
      <div className='content'>
        <div>
          <ul>
            {Array.isArray(filters) ? (
              filters.map((item, index) => (
                <li key={index} onClick={() => handleCategoryClick(item)}>
                  {item}
                </li>
              ))
            ) : (
              <span>No categories found</span>
            )}
            <li onClick={() => handleCategoryClick(null)}>All</li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}


const Wrapper = styled.section`
`