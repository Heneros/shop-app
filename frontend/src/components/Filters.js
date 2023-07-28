import React from 'react'
import { styled } from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';



export default function Filters() {

  const { filters: {
    text,
    category,
    company,
    min_price,
    max_price,
    shipping
  }, updateFilters,
    all_products,
    clearFilters } = useFilterContext();

  const categories = getUniqueValues(all_products, 'category');
  const companies = getUniqueValues(all_products, 'company');

  return (

    <Wrapper>
      <div className="form-control">
        <h5>Category</h5>
      </div>
      Filters
    </Wrapper>
  )
}


const Wrapper = styled.section``;