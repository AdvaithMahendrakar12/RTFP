import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        name: action.payload.name,
        email : action.payload.email,
        token: action.payload.token,
        avatar: action.payload.avatar,
        role : action.payload.role
      };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logOut: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
});

export const selectUser = (state) => state.user.user;
export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
