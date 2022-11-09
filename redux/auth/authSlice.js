import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    id: null,
    login: '',
  },
  isLogged: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user.id = action.payload.id;
      state.user.login = action.payload.login
      state.isLogged = true;
      //console.log("setUser PAYLOAD ------->", action.payload);
    },
    refreshUser(state, action) {
      state.user.id = action.payload.id;
      state.user.login = action.payload.login
      state.isLogged = true;
      //console.log('refreshUser PAYLOAD ----->', action.payload);
    },
    deleteUser(state) {
      state.user.id = null;
      state.user.login = "";
      state.isLogged = false;
    },
  },
});

export const { setUser, refreshUser, deleteUser } = authSlice.actions;