import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleThemeBtn: (state) => {
      state.theme = state.theme === "luxury" ? "light" : "luxury";
      
    },
  },
});

export const { toggleThemeBtn } = themeSlice.actions;
export default themeSlice.reducer;
