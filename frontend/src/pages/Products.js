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
    }, [dispatch]);

    const filteredProducts = selectedCategory === null
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <>
            <Filters />
            <div className='products-container'>
                {Array.isArray(filteredProducts)  ? (
                    filteredProducts.map((product) => (
                        <Product key={product._id} {...product} />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </>
    );
};
// ... styled components ...

export default Products;
