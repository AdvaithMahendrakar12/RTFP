import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';

function ProductCard({ product }) {
  const options = {
    readOnly: true,
    precision: 0.5,
    size: "large",
    value: product.ratings,
  };

  // Check if product.images exists and has at least one image
  const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : '';

  return (
    <div className="w-72 mx-auto my-8 rounded-lg shadow-lg bg-white">
      <Link to={`/product/${product._id}`} className="block">
        <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="font-bold text-lg text-gray-800 uppercase">{product.name}</h2>
          <div className="flex items-center mt-2">
            <Rating {...options} />
            <span className="ml-2 text-gray-600">{product.numOfReviews} Reviews</span>
          </div>
          <span className="block mt-2 font-light text-sm">₹{product.price}</span>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
