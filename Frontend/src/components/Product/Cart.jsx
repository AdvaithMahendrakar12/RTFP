import React, { Fragment } from "react";
import CartItemCard from "./CartItemCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItemQuantity, removeCartItem } from "../../reducers/cartSlice.js";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../reducers/userSlice.js";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const user = useSelector(selectUser);

  const increaseQuantity = (product, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(updateCartItemQuantity({ product, quantity: newQty }));
  };

  const decreaseQuantity = (product, quantity) => {
    const newQty = quantity - 1;
    if (newQty < 1) {
      return;
    }
    dispatch(updateCartItemQuantity({ product, quantity: newQty }));
  };

  const deleteCartItems = (product) => {
    dispatch(removeCartItem(product));
  };

  const checkoutHandler = () => {
    if (user) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");
    }
  };

  console.log('Cart items:', cartItems); // Debugging line

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-6">
        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <RemoveShoppingCartIcon className="text-6xl mb-4" />
              <Typography variant="h5">No Product in Your Cart</Typography>
              <Link to="/products" className="text-blue-500 underline">
                View Products
              </Link>
            </div>
          </div>
        ) : (
          <Fragment key={cartItems.length}>
            <div className="max-w-4xl mx-auto bg-white shadow-md sm:rounded-lg overflow-hidden">
              <div className="px-4 py-2 sm:px-6">
                <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.product} className="flex items-center justify-between p-4 sm:p-6">
                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => decreaseQuantity(item.product, item.quantity)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        -
                      </button>
                      <span className="text-xl">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-lg font-medium text-gray-900">{`₹ ${item.price * item.quantity}`}</div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 sm:px-6">
                <div className="flex justify-between items-center">
                  <Link to="/products" className="text-blue-500 hover:underline">
                    Continue Shopping
                  </Link>
                  <div className="text-lg font-semibold text-gray-900">{`Total: ₹${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}</div>
                </div>
              </div>
              <div className="px-4 py-2 sm:px-6">
                <div className="flex justify-end">
                  <button
                    onClick={checkoutHandler}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md focus:outline-none"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Cart;
