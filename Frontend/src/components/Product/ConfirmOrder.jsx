import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { selectUser } from "../../reducers/userSlice";
import { useCreateOrderMutation } from "../../actions/OrderApi.js";
import { resetCart } from "../../reducers/cartSlice.js";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const [createOrder, { isLoading, isSuccess, isError, error }] =
    useCreateOrderMutation();

  const proceedToPayment = async () => {
    const orderItems = cartItems.map((item) => ({
      product: item.product, 
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const orderData = {
      shippingInfo,
      orderItems,
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shippingCharges,
      totalPrice: totalPrice,
    };

    try {
      const res = await createOrder(orderData).unwrap();
      dispatch(resetCart());
      console.log(res);
      toast.success("Order placed successfully");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 md:flex">
            <div className="md:w-1/2">
              <div className="mb-4">
                <Typography variant="h6">Shipping Info</Typography>
                <div className="mt-2">
                  <div className="flex mb-2">
                    <p className="w-1/4">Name:</p>
                    <span>{user.name}</span>
                  </div>
                  <div className="flex mb-2">
                    <p className="w-1/4">Phone:</p>
                    <span>{shippingInfo.phoneNo}</span>
                  </div>
                  <div className="flex mb-2">
                    <p className="w-1/4">Address:</p>
                    <span>{address}</span>
                  </div>
                </div>
              </div>
              <div>
                <Typography variant="h6">Your Cart Items:</Typography>
                <div className="mt-2">
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item.product} className="flex mb-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <Link
                          to={`/product/${item.product}`}
                          className="ml-2 text-blue-500 hover:underline"
                        >
                          {item.name}
                        </Link>{" "}
                        <span className="ml-auto">
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <Typography variant="h6">Order Summary</Typography>
                <div className="mt-4">
                  <div className="flex mb-2">
                    <p className="w-1/2">Subtotal:</p>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex mb-2">
                    <p className="w-1/2">Shipping Charges:</p>
                    <span>₹{shippingCharges}</span>
                  </div>
                  <div className="flex mb-2">
                    <p className="w-1/2">GST:</p>
                    <span>₹{tax}</span>
                  </div>
                </div>
                <div className="flex mt-4">
                  <p className="w-1/2">
                    <b>Total:</b>
                  </p>
                  <span className="ml-auto">₹{totalPrice}</span>
                </div>
                <div className="mt-6">
                  <button
                    onClick={proceedToPayment}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Proceed To Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
