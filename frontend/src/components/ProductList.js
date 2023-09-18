import React, { useEffect } from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';


import Product from '../components/Product';
import { fetchProducts } from '../redux/slices/products';
export default function ProductList() {

  const dispatch = useDispatch();
  const { products, selectedCategory, selectedCompany } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);


  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
      const categoryMatch = selectedCategory === null || product.categories.includes(selectedCategory)
      // const companyMatch = selectedCompany === null || product.company === selectedCompany
      const companyMatch = selectedCompany === null || product.company.includes(selectedCompany)
      return categoryMatch && companyMatch;
    }) : [];

  return (
    <Wrapper>
      <div className='products-container'>
        {Array.isArray(filteredProducts) ? (
          filteredProducts.map((product) => (
            <Product key={product._id} {...product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

