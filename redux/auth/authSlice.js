import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    id: null,
    login: '',
    //name: '',
    email: null,
  },
  token: null,
  isLogged: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  // extraReducers: {
  //   [registerUser.fulfilled](state, action) {
  //     state.user = action.payload.user;
  //     state.token = action.payload.token;
  //     state.isLogged = true;
  //   },
  //   [loginUser.fulfilled](state, action) {
  //     state.user = action.payload.user;
  //     state.token = action.payload.token;
  //     state.isLogged = true;
  //   },
  //   [logoutUser.fulfilled](state) {
  //     state.user = {
  //       name: '',
  //       email: null,
  //     };
  //     state.token = null;
  //     state.isLogged = false;
  //   },
  // },
});