import {  configureStore } from '@reduxjs/toolkit';
import { productsApi } from './actions/productApi';
import { userApi } from './actions/userApi';
import userReducer from './reducers/userSlice'
import cartReducer from './reducers/cartSlice'
import { setupListeners } from '@reduxjs/toolkit/query';
import { orderApi } from './actions/OrderApi';



const store = configureStore({
    reducer: {
      user : userReducer,
      cart : cartReducer,
      [productsApi.reducerPath] : productsApi.reducer,
      [userApi.reducerPath] : userApi.reducer,
      [orderApi.reducerPath] : orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(productsApi.middleware,userApi.middleware,orderApi.middleware)
});

setupListeners(store.dispatch);
export default store;

