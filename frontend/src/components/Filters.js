import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components';
import { getUniqueValues } from '../utils/helpers';
import { fetchFilters, fetchProducts, selectAllProducts } from '../redux/slices/products';
import { useFilterContext } from '../context/filter_context';

export default function Filters() {

  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products)

  // console.log(products)
  // console.log(filters)
  useEffect(() => {
    dispatch(fetchFilters());
  }, []);


  return (
    <Wrapper>
      <div className='content'>
        <div>
          <ul>
            {Array.isArray(filters) ? filters.map((item, index) => (
              <li key={index}> {item} </li>
            )) : (
              <span>No categories found </span>
            )}
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.section`
`