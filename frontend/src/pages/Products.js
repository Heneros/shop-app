import React, { useEffect } from 'react'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/products';
import { styled } from 'styled-components';
import Filters from '../components/Filters';

const Products = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    return (
        <Wrapper>
            <Filters />
            <div className='products-container'>
                {Array.isArray(products) ? (
                    products.map((product) => (
                        <Product key={product._id} {...product} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </Wrapper>
    );
};


const Wrapper = styled.section`
 .products-container{
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
`;

export default Products;