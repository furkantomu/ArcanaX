import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

import {getStore} from '@/store/storeAccessor';
import { showToast } from '@/utils/showToast';

class APIService {
  private static instance: APIService;
  private api = axios.create();

  private constructor() {
    this.api = axios.create({
      baseURL: 'http://192.168.1.101:3002/',
    });
    this.setupInterceptors();
  }

  public static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  private getHeaders() {
    const store = getStore();
    const state = store.getState();
    const headers = state.auth.headers;
    if (!headers) {
      return {};
    }

    return {
      Authorization: `Bearer ${headers.accessToken}`,
    };
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      async (
        config: AxiosRequestConfig,
      ): Promise<InternalAxiosRequestConfig> => {
        const headers = this.getHeaders();

        return {
          ...config,
          headers: {
            ...config.headers,
            ...headers,
          },
        } as InternalAxiosRequestConfig;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        console.log('error.code', error.code);
        console.log('error.message', error.message);
        console.log('error.status', error.status);
        if (error.code === 'ECONNABORTED') {
          console.error('İstek zaman aşımına uğradı:', error.message);
          showToast({message:'Sunucuya ulaşılamıyor. Lütfen bağlantınızı kontrol edin.', type:'error'});
        }
        if (error.response?.status === 401) {
          const store = getStore();
          store.dispatch({type: 'auth/logout'});
        }
        return Promise.reject(error);
      },
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig) {
    return this.api.get<T>(url, config);
  }

  public async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ) {
    return this.api.post<T>(url, data, config);
  }

  public async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ) {
    return this.api.put<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.api.delete<T>(url, config);
  }
}

export const apiService = APIService.getInstance();
