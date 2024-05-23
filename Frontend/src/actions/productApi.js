import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectUser } from '../reducers/userSlice';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    const user = selectUser(getState());
    if (user?.token) {
      headers.set('Authorization', `Bearer ${user.token}`);
    }
    return headers;
    },
   }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({currentPage = 1}) => `products?page=${currentPage}`,
      providesTags: ['Product'],
    }),  
    searchProducts: builder.query({
      query: ({ keyword = "", currentPage = 1 }) => {
        let base = `products?keyword=${keyword}&page=${currentPage}`;
       
        return { url: base };
      },
      providesTags: ['Product'],
    }),
    
    getAdminProducts: builder.query({
      query: () => 'admin/products',
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: 'admin/product/new',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, productData }) => ({
        url: `admin/product/${id}`,
        method: 'PUT',
        body: productData,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `admin/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    getProductDetails: builder.query({
      query: (id) => `product/${id}`,
    }),
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: 'review',
        method: 'PUT',
        body: reviewData,
      
      }),
      invalidatesTags: ['Review'],
    }),
    getProductReviews: builder.query({
      query: (id) => `reviews?id=${id}`,
      providesTags: ['Review'],
    }),
    deleteReview: builder.mutation({
      query: ({ reviewId, productId }) => ({
        url: `reviews?id=${reviewId}&productId=${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useGetProductReviewsQuery,
  useDeleteReviewMutation,
  useSearchProductsQuery
} = productsApi;
