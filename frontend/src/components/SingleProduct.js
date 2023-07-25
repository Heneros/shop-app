import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../redux/slices/products';

export default function SingleProduct() {


    const { id } = useParams();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);
    const isLoading = useSelector((state) => state.products.products.status === 'loading');

    useEffect(() => {
        dispatch(fetchProducts());//fetch posts
    }, [dispatch]);

    const product = products.find((p) => p._id === id);

    if (isLoading || !product) {
        return <div>Loading...</div>;
    }
    return (
        <div>

            SingleProduct
            <br />
            <b>
                {product?.name}
            </b>
            <br />
            {id}
        </div>
    )
}
