import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export { store };
