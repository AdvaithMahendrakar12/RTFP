import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectUser } from '../reducers/userSlice';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const user = selectUser(getState());
      if (user?.token) {
        headers.set('Authorization', `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Order', 'Orders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/order/new',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),
    myOrders: builder.query({
      query: () => '/orders/me',
      providesTags: ['Orders'],
    }),
    getAllOrders: builder.query({
      query: () => '/admin/orders',
      providesTags: ['Orders'],
    }),
    updateOrder: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/order/${id}`,
        method: 'PUT',
        body: { status }, // Ensure the status is being sent in the body
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/order/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrderDetails: builder.query({
      query: (id) => `admin/order/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderDetailsQuery,
} = orderApi;

export const orderApiReducer = orderApi.reducer;
