import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from '../../utils/constants';


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: order,
                credentials: 'include',
            }),
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
                credentials: "include"
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`,
                credentials: "include"
            }),
            keepUnusedDataFor: 60,
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
                credentials: "include"
            }),
            keepUnusedDataFor: 5,
        }),
    })
})

export const { useCreateOrderMutation, useGetOrderDetailsQuery, useGetMyOrdersQuery, useGetOrdersQuery } = orderApiSlice;