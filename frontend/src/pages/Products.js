import React, { useEffect } from 'react'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/products';

const Products = () => {
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    return (
        <div>
            {Array.isArray(products) ? (
                products.map((product) => (
                    <Product key={product._id} name={product.name}/>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Products;