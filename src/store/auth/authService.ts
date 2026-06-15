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

type AuthApiData = {
  id: string;
  name: string;
  email: string;
  role: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  accountId: string;
  gener: string;
  accessToken: string;
  refreshToken: string;
};

const mapAuthUser = (data: AuthApiData) => ({
  id: data.id,
  name: data.name,
  email: data.email,
  role: data.role,
  birthDate: data.birthDate,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  accountId: data.accountId,
  gender: data.gener,
});

export async function login(credentials: LoginPayload): Promise<LoginResponse> {
  const response = await apiService.post<AuthApiData>('auth/login', credentials);
  const data = response.data;

  return {
    user: mapAuthUser(data),
    headers: {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    },
  };
}

export async function register(
  credentials: RegisterPayload,
): Promise<RegisterResponse> {
  const response = await apiService.post<AuthApiData>(
    'auth/register',
    credentials,
  );
  const data = response.data;

  return {
    user: mapAuthUser(data),
    headers: {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    },
  };
}

export async function profile(credentials: {
  id: string;
  email: string;
}): Promise<ProfileResponse> {
  const response = await apiService.get<AuthApiData>(
    `auth/profile/${credentials.id}/${credentials.email}`,
  );
  return {
    user: mapAuthUser(response.data),
  };
}

export async function update(
  credentials: UpdatePayload,
): Promise<UpdateResponse> {
  const response = await apiService.post<{
    name: string;
    email: string;
    birthDate: string;
  }>('auth/update', credentials);
  return {
    user: response.data,
  };
}

export async function resetPassword(credentials: ResetPasswordPayload) {
  await apiService.post('auth/reset-password', credentials);
  return {};
}
