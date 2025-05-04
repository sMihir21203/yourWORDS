import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "sunset",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleThemeBtn: (state) => {
      state.theme = state.theme === "light" ? "sunset" : "light";
      
    },
  },
});

export const { toggleThemeBtn } = themeSlice.actions;
export default themeSlice.reducer;
