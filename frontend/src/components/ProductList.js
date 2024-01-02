import React, { useEffect } from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';


import Product from '../components/Product';
import { fetchProducts } from '../redux/slices/products';
import Paginate from './Paginate';
import { useParams } from 'react-router-dom';


export default function ProductList() {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { products, selectedCategory, selectedCompany, selectedShipping } = useSelector((state) => state.products);
  // console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const { products: productListItems } = products;
  // console.log(productListItems);

  const filteredProducts = Array.isArray(productListItems)
    ? productListItems.filter((product) => {
      const categoryMatch = selectedCategory === null || product.categories.includes(selectedCategory)
      const companyMatch = selectedCompany === null || product.company.includes(selectedCompany)
      const shippingMatch = selectedShipping === null || product.shipping === selectedShipping;

      return categoryMatch && companyMatch && shippingMatch;
    }) : [];
  console.log(products.pages);


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
        <Paginate pages={products.pages} page={products.page} keyword={keyword ? keyword : ''} />
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

