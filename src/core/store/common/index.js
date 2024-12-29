import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "common",
  initialState: {
    language: 'es',
  },
  reducers: {
    setLanguage: (state, action) => {
      return {
        ...state,
        language: action.payload,
      };
    },
  },
});

export default slice.reducer;

export const { setLanguage, setProjectType } = slice.actions;
