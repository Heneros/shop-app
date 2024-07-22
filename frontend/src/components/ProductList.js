import React, { useEffect } from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';


import Product from '../components/Product';
import { fetchProducts } from '../redux/slices/products';
import Paginate from './Paginate';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/slices/productApiSlice';


export default function ProductList() {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });


  const dispatch = useDispatch();
  const { products, selectedCategory, selectedCompany, selectedShipping } = useSelector((state) => state.products);
  // console.log(productPaginate);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // const { productPaginate: productItems } = productPaginate;



  const { products: productListItems } = products;


  const filteredProducts = Array.isArray(productListItems)
    ? productListItems.filter((product) => {
      const categoryMatch = selectedCategory === null || product.categories.includes(selectedCategory)
      const companyMatch = selectedCompany === null || product.company.includes(selectedCompany)
      const shippingMatch = selectedShipping === null || product.shipping === selectedShipping;

      return categoryMatch && companyMatch && shippingMatch;
    }) : [];
  // console.log(products.pages);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }


  // console.log(productsItems);
  return (
    <>
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
      <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
    </>
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

