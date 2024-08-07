import React from 'react';
import Filters from '../components/Filters';

import { styled } from 'styled-components';
import PageHero from '../components/PageHero';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/slices/productApiSlice';
import Paginate from '../components/Paginate';
import { useSelector } from 'react-redux';
import Product from '../components/Product';

const HomePage = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });
  const products = data && data.products ? data.products : [];


  const { selectedCategory, selectedCompany, selectedShipping } = useSelector((state) => state.products);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === null || product.categories.includes(selectedCategory)
    const companyMatch = selectedCompany === null || product.company.includes(selectedCompany)
    const shippingMatch = selectedShipping === null || product.shipping === selectedShipping;

    return categoryMatch && companyMatch && shippingMatch;
  });


  // console.log(filteredProducts);


  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // console.log(data);
  return (
    <main >
      <PageHero />
      <Container maxWidth="lg" >
        <Wrapper className='page'>
          <div className='section-center products'>
            <Filters />
            <div className='products-container'>
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Product key={product._id} {...product} />
                ))) : (
                <p>No products available</p>
              )}
            </div>
          </div>
        </Wrapper>
        <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
      </Container>
    </main>
  );
};
const Wrapper = styled.section`
   .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }

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
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default HomePage;
