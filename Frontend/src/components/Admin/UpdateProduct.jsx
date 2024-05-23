import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SideBar from "./Sidebar";
import { useUpdateProductMutation, useGetProductDetailsQuery } from "../../actions/productApi";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams();
  const { data: product, error: productError, isLoading: productLoading } = useGetProductDetailsQuery(id);
  const [updateProductMutation, { isLoading: updateLoading, error: updateError, isSuccess: isUpdated }] = useUpdateProductMutation();
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    Stock: 0, // Changed 'stock' to 'Stock'
    imageURLs: [""],
  });
  const [updateFields, setUpdateFields] = useState({
    name: false,
    price: false,
    description: false,
    category: false,
    Stock: false, // Changed 'stock' to 'Stock'
    imageURLs: false,
  });

  const categories = [
    "Chairs",
    "Tables",
    "Sofas",
    "Beds",
    "Dressers",
    "Desks",
    "Cabinets",
  ];

  useEffect(() => {
    if (product) {
      setFields({
        name: product.name || "",
        price: product.price || 0,
        description: product.description || "",
        category: product.category || "",
        Stock: product.Stock || 0, // Changed 'stock' to 'Stock'
        imageURLs: product.images ? product.images.map((image) => image.url) : [""],
      });
    }
  }, [product]);

  const handleFieldChange = (field, value) => {
    setFields({ ...fields, [field]: value });
  };

  const handleImageURLChange = (index, value) => {
    const updatedImageURLs = [...fields.imageURLs];
    updatedImageURLs[index] = value;
    setFields({ ...fields, imageURLs: updatedImageURLs });
  };

  const addImageURLField = () => {
    setFields({ ...fields, imageURLs: [...fields.imageURLs, ""] });
  };

  const removeImageURLField = (index) => {
    setFields({ ...fields, imageURLs: fields.imageURLs.filter((_, i) => i !== index) });
  };

  const handleCheckboxChange = (field) => {
    setUpdateFields({ ...updateFields, [field]: !updateFields[field] });
  };

  const updateProductSubmitHandler = async (e) => {
    e.preventDefault();

    const productData = {};
    Object.keys(fields).forEach((key) => {
      if (updateFields[key]) {
        productData[key] = fields[key];
      }
    });

    try {
      await updateProductMutation({ id, productData }).unwrap();
      toast.success("Updated Successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Update failed: ", error);
    }
  };

  return (
    <Fragment>
      <div className="flex">
        <SideBar />
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
          {productLoading ? (
            <Loading />
          ) : (
            <form
              className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
              onSubmit={updateProductSubmitHandler}
            >
              <h1 className="text-lg font-light text-gray-700 mb-4">Update Product</h1>

              <div className="flex items-center w-full mb-4">
                <input
                  type="checkbox"
                  checked={updateFields.name}
                  onChange={() => handleCheckboxChange("name")}
                />
                <SpellcheckIcon className="w-6 h-6 mr-2 text-gray-600" />
                <input
                  type="text"
                  placeholder="Product Name"
                  value={fields.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className="py-2 px-4 w-full border border-gray-300 rounded focus:outline-none"
                  disabled={!updateFields.name}
                />
              </div>

              <div className="flex items-center w-full mb-4">
                <input
                  type="checkbox"
                  checked={updateFields.price}
                  onChange={() => handleCheckboxChange("price")}
                />
                <AttachMoneyIcon className="w-6 h-6 mr-2 text-gray-600" />
                <input
                  type="number"
                  placeholder="Price"
                  value={fields.price}
                  onChange={(e) => handleFieldChange("price", e.target.value)}
                  className="py-2 px-4 w-full border border-gray-300 rounded focus:outline-none"
                  disabled={!updateFields.price}
                />
              </div>

              <div className="flex items-center w-full mb-4">
                <input
                  type="checkbox"
                  checked={updateFields.description}
                  onChange={() => handleCheckboxChange("description")}
                />
                <DescriptionIcon className="w-6 h-6 mr-2 text-gray-600" />
                <textarea
                  placeholder="Product Description"
                  value={fields.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  cols="30"
                  rows="1"
                  className="py-2 px-4 w-full border border-gray-300 rounded focus:outline-none"
                  disabled={!updateFields.description}
                ></textarea>
              </div>

              <div className="flex items-center w-full mb-4">
                <input
                  type="checkbox"
                  checked={updateFields.category}
                  onChange={() => handleCheckboxChange("category")}
                />
                <AccountTreeIcon className="w-6 h-6 mr-2 text-gray-600" />
                <select
                  value={fields.category}
                  onChange={(e) => handleFieldChange("category", e.target.value)}
                  className="py-2 px-4 w-full border border-gray-300 rounded focus:outline-none"
                  disabled={!updateFields.category}
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
                <input
                  type="checkbox"
                  checked={updateFields.Stock}
                  onChange={() => handleCheckboxChange("Stock")}
                />
                <StorageIcon className="w-6 h-6 mr-2 text-gray-600" />
                <input
                  type="number"
                  placeholder="Stock"
                  value={fields.Stock}
                  onChange={(e) => handleFieldChange("Stock", e.target.value)}
                  className="py-2 px-4 w-full border border-gray-300 rounded focus:outline-none"
                  disabled={!updateFields.Stock}
                />
              </div>

              <div className="flex flex-col w-full mb-4">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={updateFields.imageURLs}
                    onChange={() => handleCheckboxChange("imageURLs")}
                  />
                  <span className="ml-2 text-gray-600">Image URLs</span>
                </div>
                {fields.imageURLs.map((url, index) => (
                  <div key={index} className="flex items-center w-full mb-2">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={url}
                      onChange={(e) => handleImageURLChange(index, e.target.value)}
                      className="py-2 px-4 w-full border border-gray-300 rounded focus:outline-none"
                      disabled={!updateFields.imageURLs}
                    />
                    {fields.imageURLs.length > 1 && (
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
                {updateFields.imageURLs && (
                  <button
                    type="button"
                    onClick={addImageURLField}
                    className="text-blue-600 hover:text-blue-800 mb-4"
                  >
                    Add another image URL
                  </button>
                )}
              </div>

              <Button
                type="submit"
                disabled={updateLoading}
                className="py-2 px-4 bg-red-600 text-white font-light rounded hover:bg-red-700 focus:outline-none"
              >
                {updateLoading ? "Updating..." : "Update"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
