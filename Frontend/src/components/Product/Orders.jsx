import React from 'react';
import { useMyOrdersQuery } from '../../actions/OrderApi.js';

const Orders = () => {
  const { data, error, isLoading } = useMyOrdersQuery();

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-600">Error: {error.message}</div>;
  }

  if (!data || !data.orders || !data.orders.length) {
    return <div className="text-center mt-4 text-red-600">No orders found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div>
        {data.orders.map((order) => (
          <div key={order._id} className="border rounded-md p-4 mb-4">
            <h3 className="text-lg font-bold">Order ID: {order._id}</h3>
            <p className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <ul className="mt-2">
              {order.orderItems.map((item) => (
                <li key={item.product} className="flex justify-between py-1">
                  <span>{item.name}</span>
                  <span>Quantity: {item.quantity} - Price: ₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Total: ₹{order.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
