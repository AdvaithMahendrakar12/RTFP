import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1',credentials:'include',}), 
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: credentials,
      }),
      transformResponse: (response) => response?.data?.user ?? response,
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: userData,
        credentials : 'include'
      }),
      transformResponse: (response) => response?.data?.user ?? response,
    }),
      
    loadUser: builder.query({
      query: () => '/me',
      transformResponse: (response) => response?.data?.user ?? response,
    }),
    logout: builder.mutation({
      query: () => ({ url: '/logout', method: 'GET' }),
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/me/update',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: userData,
      }),
      transformResponse: (response) => response?.data?.success ?? response,
    }),
    updatePassword: builder.mutation({
      query: (passwords) => ({
        url: '/password/update',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: passwords,
      }),
      transformResponse: (response) => response?.data?.success ?? response,
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        credentials: "include",
      }), 
    }),
    getUserDetails: builder.query({
      query: (id) => ({ url: `/admin/user/${id}` }),
      transformResponse: (response) => response?.data?.user ?? response,
    }),
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/admin/user/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: userData,
      }),
      transformResponse: (response) => response?.data?.success ?? response,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/admin/user/${id}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLoadUserQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAllUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi;



