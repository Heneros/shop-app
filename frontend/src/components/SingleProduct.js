import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../redux/slices/products';


export default function SingleProduct() {
    // const { _id } = useParams();

    // useEffect(() => {

    // }, [id])
    const dispatch = useDispatch();
    const { id, name } = useSelector((state) => state.products);


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    return (
        <div>
            SingleProduct
            ???
            {name}
            {id}
        </div>
    )
}
