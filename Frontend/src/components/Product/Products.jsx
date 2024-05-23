import React, { useState } from 'react';
import { useGetProductsQuery } from '../../actions/productApi.js'; // Adjust the path based on your file structure
import Loading from '../Loading.jsx';
import ProductCard from '../../Home/ProductCard.jsx';
import Pagination from "react-js-pagination";
import { toast } from 'react-toastify';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const { data, error, isLoading } = useGetProductsQuery({ currentPage });

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    toast.error(error.message);
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.products) {
    return <div>No products available</div>;
  }

  const { products, resultPerPage, productCount } = data;

  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4 underline">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-center mt-8">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productCount}
          onChange={setCurrentPageNo}
          nextPageText="&raquo;"
          prevPageText="&laquo;"
          firstPageText="&laquo;&laquo;"
          lastPageText="&raquo;&raquo;"
          innerClass="inline-flex space-x-2"
          itemClass="px-3 py-2 text-center text-gray-700 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-110"
          linkClass="focus:outline-none"
          activeClass="bg-blue-500 text-white font-bold rounded-md shadow-md"
          disabledClass="text-gray-400 cursor-not-allowed opacity-50"
          breakClass="flex items-center px-2 py-1 text-gray-700 hover:bg-gray-200 rounded-md"
          breakLinkClass="focus:outline-none"
        />
      </div>
    </>
  );
}

export default Products;
