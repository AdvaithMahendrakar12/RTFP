import React, { Fragment, useState } from "react";
import { Button } from "@mui/material";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SideBar from "./Sidebar.jsx";
import { useCreateProductMutation } from "../../actions/productApi";
import { toast } from "react-toastify";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [imageURLs, setImageURLs] = useState([""]); // State for multiple image URLs

  const categories = [
    "Chairs", "Tables", "Sofas", "Beds", "Dressers", "Desks", "Cabinets"
  ];

  const [createProductMutation, { isLoading }] = useCreateProductMutation();

  const handleImageURLChange = (index, value) => {
    const updatedImageURLs = [...imageURLs];
    updatedImageURLs[index] = value;
    setImageURLs(updatedImageURLs);
  };

  const addImageURLField = () => {
    setImageURLs([...imageURLs, ""]);
  };

  const removeImageURLField = (index) => {
    setImageURLs(imageURLs.filter((_, i) => i !== index));
  };

  const createProductSubmitHandler = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      category,
      stock,
      images: imageURLs // Pass imageURLs to the product data
    };

    try {
      const res = await createProductMutation(productData).unwrap();
      console.log(res);
      toast.success("Product Created Successfully");
      setName("");
      setPrice(0);
      setDescription("");
      setCategory("");
      setStock(0);
      setImageURLs([""]); // Clear imageURLs after submission
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return (
    <Fragment>
      <div className="flex">
        <SideBar />

        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
          <form
            className="flex flex-col items-center justify-around w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
            onSubmit={createProductSubmitHandler}
          >
            <h1 className="text-lg font-light text-gray-700 mb-4">Create Product</h1>

            {/* Existing input fields */}
            <div className="flex items-center w-full mb-4">
              <SpellcheckIcon className="w-6 h-6 mr-2 text-gray-600" />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-2 px-4 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="flex items-center w-full mb-4">
              <AttachMoneyIcon className="w-6 h-6 mr-2 text-gray-600" />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="py-2 px-4 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="flex items-center w-full mb-4">
              <DescriptionIcon className="w-6 h-6 mr-2 text-gray-600" />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
                className="py-2 px-4 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              ></textarea>
            </div>

            <div className="flex items-center w-full mb-4">
              <AccountTreeIcon className="w-6 h-6 mr-2 text-gray-600" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="py-2 px-4 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center w-full mb-4">
              <StorageIcon className="w-6 h-6 mr-2 text-gray-600" />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="py-2 px-4 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            {/* New input fields for multiple image URLs */}
            {imageURLs.map((url, index) => (
              <div key={index} className="flex items-center w-full mb-4">
                <input
                  type="text"
                  placeholder="Image URL"
                  required
                  value={url}
                  onChange={(e) => handleImageURLChange(index, e.target.value)}
                  className="py-2 px-4 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                />
                {imageURLs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageURLField(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageURLField}
              className="text-blue-600 hover:text-blue-800 mb-4"
            >
              Add another image URL
            </button>

            <Button
              type="submit"
              disabled={isLoading}
              className="py-2 px-4 bg-red-600 text-white font-light rounded hover:bg-red-700 focus:outline-none"
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
