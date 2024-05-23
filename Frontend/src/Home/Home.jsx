import React, { useState } from 'react';
import ProductCard from './ProductCard.jsx';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetProductsQuery } from '../actions/productApi.js';

function Home() {
  const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage state

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fetch products based on currentPage
  const { data, error, isLoading } = useGetProductsQuery({ currentPage });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error.message);
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.products) {
    return <div>No products available</div>;
  }

  const { products } = data;

  return (
    <header className="h-auto flex flex-wrap justify-center">
      <img
        className="w-full hidden md:block"
        src="https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Header"
      />
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </header>
  );
}

export default Home;
