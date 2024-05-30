import React from 'react';
import { useParams } from 'react-router-dom';
import { useSearchProductsQuery } from '../../actions/productApi.js'; // Adjust the path based on your file structure
import ProductCard from '../../Home/ProductCard.jsx'; // Adjust the path based on your file structure
import Loading from '../../components/Loading.jsx'; // Adjust the path based on your file structure
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

function SpecificProduct() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('keyword');
    console.log("keyword :" , keyword);
  const { data, error, isLoading } = useSearchProductsQuery({ keyword });

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

  if (!data || !data.products || data.products.length === 0) {
    return <div>No products available</div>;
  }

  const { products } = data;
  console.log(products);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4 underline">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products && products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default SpecificProduct;
