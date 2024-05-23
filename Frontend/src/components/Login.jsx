import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation, useRegisterMutation } from '../actions/userApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userSlice';
import { toast } from 'react-toastify';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const handleLoginSubmit = async (data) => {
    try {
      const result = await login({ email: data.email, password: data.password }).unwrap();
      if (result && result.token) {
        const user = {
          name: result.user.name,
          email: result.user.email,
          token: result.token,
          avatar: result.user.avatar,
          role: result.user.role,
        };
        dispatch(setUser(user));
        toast.success('Logged in Successfully');
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to login:', error);
      toast.error(error.data?.error || 'Failed to login');
    }
  };

  const handleRegisterSubmit = async (data) => {
    try {
      const result = await registerUser(data).unwrap();
      if (result && result.token) {
        const user = {
          name: result.user.name,
          token: result.token,
          avatar: result.user.avatar,
          role: result.user.role,
        };
        dispatch(setUser(user));
        toast.success('Registered Successfully');
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to register:', error);
      toast.error(error.data?.error || 'Failed to register');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <button
            className={`w-1/2 py-2 ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        {isLogin ? (
          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {errors.email && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register('password', { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {errors.password && <span className="text-red-500">This field is required</span>}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={isLoginLoading}
            >
              {isLoginLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(handleRegisterSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {errors.name && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {errors.email && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register('password', { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {errors.password && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
              <input
                type="text"
                {...register('avatar', { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {errors.avatar && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                {...register('role')}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={isRegisterLoading}
            >
              {isRegisterLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
