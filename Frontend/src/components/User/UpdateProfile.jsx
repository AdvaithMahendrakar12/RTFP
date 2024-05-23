import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUpdateProfileMutation } from '../../actions/userApi';
import { selectUser, setUser } from '../../reducers/userSlice';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatar?.url || ''); // Use avatar URL instead of file state
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const result = await updateProfile({
        name,
        email,
        avatar: avatarUrl, // Send avatar URL instead of file
      });

      if (result && result.data && result.data.success) {
        const updatedUser = {
          name: result.data.user.name,
          email: result.data.user.email,
          avatar: result.data.user.avatar,
        };

        dispatch(setUser(updatedUser));
        toast.success('Profile updated successfully');
        navigate('/profile');
      } else {
        toast.error(result.data?.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error(error.data?.error || 'Failed to update profile');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="avatarUrl">
            Avatar URL:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            id="avatarUrl"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
