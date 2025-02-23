import type {User} from '@/types/User';

export interface AuthHeaders {
  accessToken: string;
  refreshToken: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterPayload {
  email: string;
  password: string;
  birthDate: string;
  name: string;
}
export interface LoginResponse {
  user: User;
  headers: AuthHeaders;
  error?: string;
}

export interface RegisterResponse {
  user: User;
  headers: AuthHeaders;
  error?: string;
}
export interface ProfileResponse {
  user: User;
}

export interface UpdateResponse {
  user: {
    name: string;
    email: string;
    birthDate: string;
  };
}
export interface UpdatePayload {
  userId: string;
  name: string;
  email: string;
  birthDate: string;
}
export interface ResetPasswordPayload {
  userId: string;
  oldPassword: string;
  password: string;
}
export interface ApiErrorResponse {
  success: boolean;
  errors: string;
}
