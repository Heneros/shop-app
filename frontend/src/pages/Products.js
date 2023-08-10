import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Filters from '../components/Filters';
import { fetchProducts, selectAllProducts, updateCategoryFilter } from '../redux/slices/products';
import { styled } from 'styled-components';

const Products = () => {
    const dispatch = useDispatch();
    const { products, selectedCategory } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const filteredProducts = selectedCategory === null
        ? products
        : products.filter(product => product.categories.includes(selectedCategory));

    return (
        <Wrapper>
            <Filters />
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
