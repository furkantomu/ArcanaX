import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

// Auth durumunu almak için temel seçici
export const selectAuth = (state: RootState) => state.auth;

// Kullanıcının giriş yapıp yapmadığını kontrol et
export const selectLoggedIn = createSelector(selectAuth, auth => auth.user !== null);

// Kullanıcı bilgilerini al
export const selectUser = createSelector(selectAuth, auth => auth.user);

// Kullanıcının ID’sini al
export const selectUserId = createSelector(selectAuth, auth => auth.user?.id);

// Giriş işlemi sırasında yükleme durumu
export const selectIsLoggingIn = createSelector(selectAuth, auth => auth.uiFlags.isLoggingIn);

// Giriş hatasını al
export const selectAuthError = createSelector(selectAuth, auth => auth.error);
