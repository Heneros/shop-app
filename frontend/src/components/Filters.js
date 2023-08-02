import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components';
import { getUniqueValues } from '../utils/helpers';
import { fetchProducts } from '../redux/slices/products';
import { useFilterContext } from '../context/filter_context';

export default function Filters() {

  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
    updateFilters,
    all_products,
    clearFilters,
  } = useFilterContext()
  console.log(all_products);
  const categories = getUniqueValues(all_products, 'category')
  return (
    <Wrapper>
      <div className='content'>
        <div>
          {categories.map((c, index) => {
            return (
              <button
                key={index}
                onClick={updateFilters}
                type='button'
                name='category'
                className={`${category === c.toLowerCase() ? 'active' : null
                  }`}
              >
                {c}
              </button>
            )
          })}
        </div>
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.section`
`