import {createSlice} from '@reduxjs/toolkit';

import {authActions} from './authActions';
import {User} from '@/types/User';

import {AuthHeaders} from './authTypes';
import {showToast} from '@/utils/showToast';
export interface AuthState {
  user: User | null;
  uiFlags: {
    isLoggingIn: boolean;
    isResettingPassword: boolean;
  };
  headers: AuthHeaders | null;
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  uiFlags: {
    isLoggingIn: false,
    isResettingPassword: false,
  },
  headers: null,
  error: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logout: state => {},
    resetAuth: state => {
      state.user = null;
      state.headers = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authActions.login.pending, state => {
        state.uiFlags.isLoggingIn = true;
        state.error = null;
      })
      .addCase(authActions.login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.headers = action.payload.headers;
        state.uiFlags.isLoggingIn = false;
        state.error = null;
      })
      .addCase(authActions.login.rejected, (state, action) => {
        state.uiFlags.isLoggingIn = false;
        state.error = action.payload?.errors ?? null;
        showToast({message: action.payload?.errors ?? '', type: 'error'});
      })
      .addCase(authActions.register.pending, state => {
        state.uiFlags.isLoggingIn = true;
        state.error = null;
      })
      .addCase(authActions.register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.headers = action.payload.headers;
        state.uiFlags.isLoggingIn = false;
        showToast({message: 'Başarıyla kayıt olundu. Giriş yapılıyor...'});
      })
      .addCase(authActions.register.rejected, (state, action) => {
        state.uiFlags.isLoggingIn = false;
        state.error = action.payload?.errors ?? null;
      })
      .addCase(authActions.user.pending, state => {
        state.uiFlags.isLoggingIn = true;
        state.error = null;
      })
      .addCase(authActions.user.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.uiFlags.isLoggingIn = false;
        state.error = null;
      })
      .addCase(authActions.user.rejected, (state, action) => {
        state.uiFlags.isLoggingIn = false;
        state.error = action.payload?.errors ?? null;
        state.uiFlags.isLoggingIn = false;
      })
      .addCase(authActions.update.pending, state => {
        state.uiFlags.isLoggingIn = true;
        state.error = null;
      })
      .addCase(authActions.update.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          birthDate: action.payload.user.birthDate,
          name: action.payload.user.name,
        };
        state.uiFlags.isLoggingIn = false;
        state.error = null;
        showToast({message: 'Kullanıcı bilgileriniz güncellendi.'});
      })
      .addCase(authActions.update.rejected, (state, action) => {
        state.uiFlags.isLoggingIn = false;
        state.error = action.payload?.errors ?? null;
        showToast({message: action.payload?.errors ?? '', type: 'error'});
      })
      .addCase(authActions.resetPassword.pending, state => {
        state.uiFlags.isLoggingIn = true;
        state.error = null;
      })
      .addCase(authActions.resetPassword.fulfilled, state => {
        state.uiFlags.isLoggingIn = false;
        state.error = null;
        showToast({message: 'Parolanız değiştirildi.'});
      })
      .addCase(authActions.resetPassword.rejected, (state, action) => {
        state.uiFlags.isLoggingIn = false;
        state.error = action.payload?.errors ?? null;
        showToast({message: action.payload?.errors ?? '', type: 'error'});
      });
  },
});
export const {logout, resetAuth} = authSlice.actions;
export default authSlice.reducer;
