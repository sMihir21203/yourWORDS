import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleThemeBtn: (state) => {
      state.theme = state.theme === "sunset" ? "light" : "sunset";
      
    },
  },
});

export const { toggleThemeBtn } = themeSlice.actions;
export default themeSlice.reducer;
