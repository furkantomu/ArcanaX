import {createSlice} from '@reduxjs/toolkit';

export interface SettingsState {
  localeValue: string;
}
const initialState: SettingsState = {
  localeValue: 'en',
};
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    resetSettings: state => {
      state.localeValue = 'en';
    },
    setLocale: (state, action) => {
      state.localeValue = action.payload;
    },
  },
});
export const {resetSettings, setLocale} = settingsSlice.actions;
export default settingsSlice.reducer;
