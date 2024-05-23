import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useCreateReviewMutation, useGetProductDetailsQuery } from '../../actions/productApi';
import Loading from '../Loading';
import { useParams } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import ReviewCard from './ReviewCard.jsx';
import { addToCart } from '../../reducers/cartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectUser } from '../../reducers/userSlice.js';

function ProductDetails() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const { id } = useParams();
    const { data, error, isLoading } = useGetProductDetailsQuery(id);
    const product = data?.product;
    
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (product && quantity < product.Stock) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const addToCartHandler = () => {
        if (!product) {
            return;
        }

        const { _id, name, price, images } = product;
        const image = images && images.length > 0 ? images[0].url : '';
        dispatch(addToCart({ product: _id, name, price, quantity, image }));
        toast.success("Item added to Cart");
    }

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const submitReviewToggle = () => {
        setOpen(!open);
    };
    

    const [newReview] = useCreateReviewMutation(); 
    const reviewSubmitHandler = async () => {
        const reviewData = {
            rating,
            comment,
            productId:id,
        };
    
        try {
            const res = await newReview(reviewData).unwrap();
    
            if (res.success) {
                toast.success("Review Added Successfully");
                setOpen(false);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            toast.error("Failed to submit review");
            console.error("Review Submission Error:", err);
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <div>{error.message}</div>;

    return (
        <div className="bg-white max-w-screen-lg mx-auto p-6 shadow-lg rounded-lg">
            {product ? (
                <div className="flex justify-between mb-8">
                    <div className="w-1/2 pr-6">
                        <Carousel>
                            {product.images && product.images.map((item, i) => (
                                <img key={item.url} src={item.url} alt={`${i} Slide`} className="w-full rounded-lg mb-4 shadow-md" />
                            ))}
                        </Carousel>
                    </div>
                    <div className="w-1/2 pl-6">
                        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                        <p className="text-lg mb-6">Product # {product._id}</p>
                        <div className="mb-6 flex items-center">
                            <Rating value={product.ratings} precision={0.5} readOnly />
                            <span className="text-lg text-gray-600 ml-2">({product.numOfReviews} Reviews)</span>
                        </div>
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-blue-500">₹{product.price}</h1>
                            <div className="flex items-center mt-4">
                                <button className="mr-2 bg-gray-200 px-3 py-1 rounded" onClick={decreaseQuantity}>-</button>
                                <input readOnly type="text" value={quantity} className="w-12 text-center bg-gray-200 border border-gray-300 rounded" />
                                <button className="ml-2 bg-gray-200 px-3 py-1 rounded" onClick={increaseQuantity}>+</button>
                            </div>
                            <button
                                className={`mt-4 px-4 py-2 text-white rounded ${product.stock < 1 ? 'bg-red-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                                disabled={product.stock < 1}
                                onClick={addToCartHandler}
                            >
                                Add to Cart
                            </button>
                            <p className="text-lg mt-2">
                                Status: <b className={`${product.stock < 1 ? 'text-red-500' : 'text-green-500'}`}>{product.stock < 1 ? 'OutOfStock' : 'InStock'}</b>
                            </p>
                        </div>
                        <div className="mb-6">
                            <p className="text-lg font-bold">Description:</p>
                            <p className="text-lg">{product.description}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Product not found</p>
            )}

            <div className="mb-6 flex justify-end">
                <button onClick={submitReviewToggle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit Review
                </button>
            </div>

            <h3 className="text-center mb-4 text-2xl font-bold">REVIEWS</h3>

            <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
            >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                    <Rating
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        value={rating}
                        size="large"
                    />

                    <textarea
                        className="w-full h-32 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                        placeholder="Write your review here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product && product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))
                ) : (
                    <p className="text-lg font-semibold col-span-2 text-center">No Reviews Yet</p>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;
