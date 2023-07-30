import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components';
import { getUniqueValues } from '../utils/helpers';
import { fetchProducts } from '../redux/slices/products';

export default function Filters() {
  const dispatch = useDispatch();

  const {
    filters: {
      text,
      category
    }, all_products } = useSelector((state) => state.filter)
  const categories = getUniqueValues(all_products, 'category')
  console.log(categories);


  return (
    <Wrapper>
      <div className='content'>
        {/* {products.map((name, _id) => (
          <button key={_id}>{name}</button>
        ))} */}
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.section`
`