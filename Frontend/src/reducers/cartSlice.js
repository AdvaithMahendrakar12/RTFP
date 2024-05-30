import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  shippingInfo: JSON.parse(localStorage.getItem('shippingInfo')) || {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.product === item.product);

      if (existingItem) {
        existingItem.quantity = item.quantity;
      } else {
        state.cartItems.push(item);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      console.log('Before removal:', JSON.parse(JSON.stringify(state.cartItems)));  // Debugging line
      state.cartItems = state.cartItems.filter(item => item.product !== action.payload);
      console.log('After removal:', JSON.parse(JSON.stringify(state.cartItems)));  // Debugging line
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateCartItemQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.product === product);

      if (existingItem) {
        existingItem.quantity = quantity;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo));
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.shippingInfo = {};
      localStorage.removeItem('cartItems');
      localStorage.removeItem('shippingInfo');
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  updateCartItemQuantity,
  saveShippingInfo,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
