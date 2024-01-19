import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from '../../utils/constants';


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: order,
                credentials: "include"
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
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                credentials: 'include',
                body: details
            }),
        }),
        getPaypalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
                credentials: 'include',
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT'
            })
        }),
        // getStripeClient
    })
})

export const { useCreateOrderMutation, useGetOrderDetailsQuery, useGetMyOrdersQuery, useGetOrdersQuery, useDeliverOrderMutation, useGetPaypalClientIdQuery, usePayOrderMutation } = orderApiSlice;