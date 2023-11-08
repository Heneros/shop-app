import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../redux/slices/orderApiSlice';

export default function PlaceOrder() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    return (
        <div>PlaceOrder</div>
    )
}
