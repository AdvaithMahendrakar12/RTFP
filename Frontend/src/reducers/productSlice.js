import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: { products: [], loading: false, error: null },
    reducers: {
        allProductRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        allProductSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            // state.productsCount = action.payload.productsCount;
            // state.resultPerPage = action.payload.resultPerPage;
            // state.filteredProductsCount = action.payload.filteredProductsCount;
        },
        allProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    }
});

export const { allProductRequest, allProductSuccess, allProductFail, clearErrors } = productSlice.actions;
export default productSlice.reducer;
