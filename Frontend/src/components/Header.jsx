import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectUser } from '../reducers/userSlice';
import { toast } from 'react-toastify';


export default function Header({user}) {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';
  

    if (isLoginPage) {
      return null;
    }
 

    const handleLogout = () => {
        dispatch(logOut());
        toast.success("Logged OUT successfully");
        navigate('/login');
    };

    return (
        <div className="sticky top-0 left-0 right-0 bg-white shadow-lg z-50">
            <nav className="mx-auto max-w-screen-xl px-4 lg:px-6 py-2.5">
                <div className="flex justify-between items-center w-full">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="hidden lg:flex lg:w-auto lg:items-center">
                        <ul className="flex space-x-8 font-medium">
                            <li>
                                <NavLink
                                    exact
                                    to="/"
                                    className="text-gray-700 hover:text-orange-700"
                                    activeClassName="text-orange-700"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/products"
                                    className="text-gray-700 hover:text-orange-700"
                                    activeClassName="text-orange-700"
                                >
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className="text-gray-700 hover:text-orange-700"
                                    activeClassName="text-orange-700"
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className="text-gray-700 hover:text-orange-700"
                                    activeClassName="text-orange-700"
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center space-x-4 lg:order-2">
                        <Link to="/search" className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                            <SearchIcon />
                        </Link>
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                            >
                                Log Out
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                            >
                                Log In
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
