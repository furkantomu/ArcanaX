import {apiService} from '@/services/APIService';

import type {
  LoginPayload,
  LoginResponse,
  ProfileResponse,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordPayload,
  UpdatePayload,
  UpdateResponse,
} from './authTypes';

export async function login(credentials: LoginPayload): Promise<LoginResponse> {
  const response = await apiService.post('auth/login', credentials);

  const user = {
    id: response?.data.id,
    name: response.data.name,
    email: response.data.email,
    role: response.data.role,
    birthDate: response.data.birthDate,
    createdAt: response.data.createdAt,
    updatedAt: response.data.updatedAt,
    accountId: response.data.accountId,
    gender: response.data.gener,
  };

  return {
    user: user,
    headers: {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    },
  };
}

export async function register(
  credentials: RegisterPayload,
): Promise<RegisterResponse> {
  const response = await apiService.post('auth/register', credentials);
  const user = {
    id: response?.data.id,
    name: response.data.name,
    email: response.data.email,
    role: response.data.role,
    birthDate: response.data.birthDate,
    createdAt: response.data.createdAt,
    updatedAt: response.data.updatedAt,
    accountId: response.data.accountId,
    gender: response.data.gener,
  };

  return {
    user: user,
    headers: {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    },
  };
}

export async function profile(credentials: {
  id: string;
  email: string;
}): Promise<ProfileResponse> {
  const response = await apiService.get(`auth/profile/${credentials.id}/${credentials.email}`);
  const user = {
    id: response?.data.id,
    name: response.data.name,
    email: response.data.email,
    role: response.data.role,
    birthDate: response.data.birthDate,
    createdAt: response.data.createdAt,
    updatedAt: response.data.updatedAt,
    accountId: response.data.accountId,
    gender: response.data.gener,
  };
  return {
    user: user,
  };
}

export async function update(
  credentials: UpdatePayload,
): Promise<UpdateResponse> {
  const user = await apiService.post('auth/update', credentials);
  return {
    user: user.data,
  };
}
export async function resetPassword(credentials: ResetPasswordPayload) {
  await apiService.post('auth/reset-password', credentials);
  return {};
}
