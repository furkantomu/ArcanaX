import {createAsyncThunk} from '@reduxjs/toolkit';
import {login, register, profile, update, resetPassword} from './authService';
import type {
  LoginPayload,
  LoginResponse,
  ApiErrorResponse,
  RegisterResponse,
  RegisterPayload,
  ProfileResponse,
  UpdateResponse,
  UpdatePayload,
  ResetPasswordPayload,
} from './authTypes';
import {handleApiError} from './authUtils';

const createAuthThunk = <TResponse, TPayload>(
  type: string,
  handler: (payload: TPayload) => Promise<TResponse>,
  errorMessage?: string,
) => {
  return createAsyncThunk<TResponse, TPayload, {rejectValue: ApiErrorResponse}>(
    type,
    async (payload, {rejectWithValue}) => {
      try {
        const response = await handler(payload);
        return response;
      } catch (error) {
        return rejectWithValue(handleApiError(error, errorMessage));
      }
    },
  );
};
export const authActions = {
  login: createAuthThunk<LoginResponse, LoginPayload>('auth/login', login),
  register: createAuthThunk<RegisterResponse, RegisterPayload>(
    'auth/register',
    register,
  ),
  user: createAuthThunk<ProfileResponse, {id: string; email: string}>(
    'auth/profile',
    (payload: {id: string; email: string}) => profile(payload),
  ),
  update: createAuthThunk<UpdateResponse, UpdatePayload>(
    'auth/update',
    update,
    'Kullanıcı güncellenemedi.',
  ),
  resetPassword: createAuthThunk<{}, ResetPasswordPayload>(
    'auth/reset-password',
    resetPassword,
    'Eski parola yanlış',
  ),
};
