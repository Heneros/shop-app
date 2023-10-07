import { apiSlice } from './apiSlice';
import { USERS_URL } from '../../utils/constants';


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        registration: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        })
    })
});

export const { useLoginMutation, useRegistrationMutation } = userApiSlice;