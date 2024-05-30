import React from "react";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="flex items-center">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
      <div>
        <Link to={`/product/${item.id}`} className="text-blue-600 hover:underline">{item.name}</Link>
        <span className="block text-gray-600">{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)} className="text-red-500 cursor-pointer hover:underline">Remove</p>
      </div>
    </div>
  );
}

export default CartItemCard;
