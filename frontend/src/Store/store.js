import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice.js";
import themeReducer from './Theme/themeSlice.js'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";



const mainReducer = combineReducers({
  user: userReducer,
  theme:themeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
