import React from 'react';
import { Rating } from '@mui/material';

function ReviewCard({ review }) {
    const options = {
        readOnly : true,
        precision : 0.5,
        size: "large",    
        value: review.rating,
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img
                            className="h-12 w-12 rounded-full"
                            src='https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600'
                            alt={`${review.name}'s avatar`}
                        />
                    </div>
                    <div className="ml-4">
                        <div className="text-lg font-semibold text-gray-900">{review.name}</div>
                        <div className="flex items-center mt-1">
                            <Rating {...options} />
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <span className="text-gray-700">{review.comment}</span>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;
