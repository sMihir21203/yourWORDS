import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //logout
    signOut: (state) => {
      state.currentUser=null
    },

    //update user detials
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = {
        ...state.currentUser,      // Preserve existing user data
        data: {
          ...state.currentUser.data,  // Preserve nested `data`
          user: {
            ...state.currentUser.data?.user,  // Preserve `user`
            ...action.payload,  // Merge new data (avatar, username, etc.)
          }
        }
      };
      state.error = null;
      state.loading = false;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signOut,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
} = userSlice.actions;

export default userSlice.reducer;
