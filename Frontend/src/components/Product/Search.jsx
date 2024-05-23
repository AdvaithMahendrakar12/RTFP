import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
    
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/search?keyword=${keyword}`);
        } else {
            navigate("/products");
        }
    };

    return (
        <div className="searchBox fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-600">
            <form onSubmit={searchSubmitHandler} className="flex items-center w-1/2 bg-zinc-500">
                <input
                    type="text"
                    placeholder="Search..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="bg-white shadow-md border-none px-6 py-2 w-full outline-none rounded-none text-gray-600 text-lg font-cursive"
                />
                <button type="submit" className="bg-orange-500 text-white px-4 py-2 ml-2 rounded-none transition-colors duration-500 hover:bg-blue-600">
                    Search
                </button>
            </form>
        </div>
    );
}

export default Search;
