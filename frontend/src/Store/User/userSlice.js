import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  success: null,
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
    signOutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //update user detials
    updateStart: (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = {
        ...state.currentUser, // Preserve existing user data
        data: {
          ...state.currentUser.data, // Preserve nested `data`
          loggedInUser: {
            ...state.currentUser.data?.loggedInUser, // Preserve `user`
            ...action.payload, // Merge new data (avatar, username, etc.)
          },
        },
      };
      state.success = action.payload.message || "update successfull";
      state.error = null;
      state.loading = false;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    },

    //deleteUser

    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },

    //clear Msgs
    clearAllMessages: (state) => {
      state.success = null;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,

  signOutStart,
  signOutSuccess,
  signOutFailure,

  updateStart,
  updateSuccess,
  updateFailure,

  deleteUserSuccess,

  clearAllMessages,
} = userSlice.actions;

export default userSlice.reducer;
