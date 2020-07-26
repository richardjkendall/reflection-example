import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    value: "all",
  },
  reducers: {
    switchToAll: state => {
      state.value = "all";
    },
    switchToHigh: state => {
      state.value = "high";
    },
    switchToDueToday: state => {
      state.value = "duetoday";
    },
  },
});

export const { switchToAll, switchToHigh, switchToDueToday } = navigationSlice.actions;

export const selectNav = state => state.navigation.value;

export default navigationSlice.reducer;