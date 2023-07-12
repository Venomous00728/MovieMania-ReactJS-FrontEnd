import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: null,
  tab: "",
  themeMode: "",
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setCount } = navSlice.actions;
export const { setTab } = navSlice.actions;
export const { setThemeMode } = navSlice.actions;

export const selectCount = (state) => state.nav.count;
export const selectTab = (state) => state.nav.tab;
export const selectThemeMode = (state) => state.nav.themeMode;

export default navSlice.reducer;
