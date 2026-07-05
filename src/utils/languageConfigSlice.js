import { createSlice } from "@reduxjs/toolkit";

const languageConfigSlice = createSlice({
  name: "languageConfig",
  initialState: {
    currentLanguage: "en",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { changeLanguage } = languageConfigSlice.actions;
export default languageConfigSlice.reducer;
