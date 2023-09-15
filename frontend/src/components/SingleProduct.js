import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import { fetchProducts } from '../redux/slices/products';
import axios from '../axios';

export default function SingleProduct() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    return (
        <div>
            <h3>Name: {data?.product?.name}</h3>
            <p>ID: {data?.product?._id}</p>
        </div>
    );
}