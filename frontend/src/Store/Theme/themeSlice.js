import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "abyss",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleThemeBtn: (state) => {
      state.theme = state.theme === "light" ? "abyss" : "light";
      
    },
  },
});

export const { toggleThemeBtn } = themeSlice.actions;
export default themeSlice.reducer;
