import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';

import {getStore} from '@/store/storeAccessor';
import {showToast} from '@/utils/showToast';
import crashlytics from '@react-native-firebase/crashlytics';

class APIService {
  private static instance: APIService;
  private api = axios.create();

  private constructor() {
    this.api = axios.create({
      baseURL: 'https://www.arcanaxapp.xyz/',
      //baseURL: 'http://192.168.1.103:3002/',
    });
    this.setupInterceptors();
  }

  public static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }


  private getHeaders(): AxiosRequestHeaders {
    const store = getStore();
    const state = store.getState();
    const headers = state.auth.headers;
    const headersObj: AxiosRequestHeaders = {
      'Accept-Language': state.settings.localeValue,
    };
    if (headers) {
      headersObj.Authorization = `Bearer ${headers.accessToken}`;
    }
    return headersObj;
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
        const store = getStore();
        const state = store.getState();
        if (error.code === 'ECONNABORTED') {
          console.error('İstek zaman aşımına uğradı:', error.message);
          showToast({
            message: 'Sunucuya ulaşılamıyor. Lütfen bağlantınızı kontrol edin.',
            type: 'error',
          });
        }
        if (error.response?.status === 401) {
          store.dispatch({type: 'auth/logout'});
        }

        try {
           crashlytics().recordError(
            new Error(
              `email:${state.auth.user.email} url: ${
                error.config?.url
              }, errorMessage: ${JSON.stringify(error.response?.data)}`,
            ),
          );
        } catch (e) {
          console.log('Failed to log error to Crashlytics:', e);
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