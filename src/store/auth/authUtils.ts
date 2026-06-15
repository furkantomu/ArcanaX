import {AxiosError} from 'axios';

import type {ApiErrorResponse} from './authTypes';
import i18n from '@/i18n';

export const handleApiError = (error: unknown, customErrorMsg?: string) => {
  const {response} = error as AxiosError<ApiErrorResponse>;
  if (response?.status === 409) {
    const {errors} = response.data;

    if (errors) {
      return {success: false, errors};
    }
  }
  if (response?.status === 401) {
      return {success: false, errors: response.data.errors};
  }
  const message =
    customErrorMsg ||
    i18n.t('LOGIN.ERROR.NETWORK_ERROR');
  return {success: false, errors: message ?? 'Unknown error'};
};
