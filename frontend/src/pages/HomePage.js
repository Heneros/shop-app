import React from 'react';
import Filters from '../components/Filters';
import ProductList from '../components/ProductList';

import { styled } from 'styled-components';
import PageHero from '../components/PageHero';
import { Container } from '@mui/material';

const HomePage = () => {

  return (
    <main >

      <PageHero />
      <Container maxWidth="lg" >
        <Wrapper className='page'>
          <div className='section-center products'>
            <Filters />
            <div>
              <ProductList />
            </div>
          </div>
        </Wrapper>
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

  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }

`;

export default HomePage;
