import {AxiosError} from 'axios';

import type {ApiErrorResponse} from './authTypes';

export const handleApiError = (error: unknown, customErrorMsg?: string) => {
  const {response} = error as AxiosError<ApiErrorResponse>;
  console.log('error', response);
  if (response?.status === 409) {
    const {errors} = response.data;

    if (errors) {
      return {success: false, errors};
    }
  }
  if (response?.status === 401) {
    const {errors} = response.data;

    if (errors) {
      return {success: false, errors};
    }
  }
  const message =
    customErrorMsg ||
    'Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.';
  return {success: false, errors: message};
};
