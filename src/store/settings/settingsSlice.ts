import {createSlice} from '@reduxjs/toolkit';

export interface SettingsState {
  localeValue: string;
  isOnboardingCompleted: boolean;
}
const initialState: SettingsState = {
  localeValue: 'en',
  isOnboardingCompleted: false,
};
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.localeValue = action.payload;
    },
    setOnboardingCompleted: state => {
      state.isOnboardingCompleted = true;
    },
  },
});
export const {setLocale, setOnboardingCompleted} = settingsSlice.actions;
export default settingsSlice.reducer;
