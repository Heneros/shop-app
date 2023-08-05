import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components';
import { getUniqueValues } from '../utils/helpers';
import { fetchProducts, selectAllProducts } from '../redux/slices/products';
import { useFilterContext } from '../context/filter_context';

export default function Filters() {

  const dispatch = useDispatch();
  const { products, category } = useSelector((state) => state.products)

  console.log(products)
  useEffect(() => {
    dispatch(fetchProducts());
  }, [])
  return (
    <Wrapper>
      <div className='content'>
        <div>

        </div>
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.section`
`