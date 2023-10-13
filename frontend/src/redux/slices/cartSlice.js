import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from '../../utils/cartUtil';


const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };