import { apiSlice } from './apiSlice';
import { USERS_URL } from '../../utils/constants';


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                credentials: 'include',
            }),
        }),
        registration: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
                credentials: 'include',
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            })
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            })
        }),
        getUserDetails: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                credentials: 'include',
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
                // credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `/api/upload`,
                method: 'POST',
                body: data,
                // credentials: 'include',
            })
        })
    })
});

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation, useProfileMutation, useDeleteUserMutation, useGetUserDetailsMutation, useUpdateUserMutation, useUploadProductImageMutation } = userApiSlice;