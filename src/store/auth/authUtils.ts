import {AxiosError} from 'axios';

import type {ApiErrorResponse} from './authTypes';
import i18n from '@/i18n';

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
    const errors = i18n.t('LOGIN.ERROR.LOGIN_ERROR');

    if (errors) {
      return {success: false, errors};
    }
  }
  const message =
    customErrorMsg ||
    'Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.';
  return {success: false, errors: message};
};
