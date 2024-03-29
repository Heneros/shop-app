import { products_url } from "../../utils/constants";

import { apiSlice } from "./apiSlice";




export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber, keyword }) => ({
                url: products_url,
                params: { keyword, pageNumber }
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${products_url}/${productId}`,
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: products_url,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${products_url}/${data.productId}`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ['Products']
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${products_url}/${productId}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            providesTags: ['Product'],
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${products_url}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery, useUpdateProductMutation, useCreateProductMutation, useDeleteProductMutation, useCreateReviewMutation } = productsApiSlice;