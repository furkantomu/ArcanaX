import {AxiosResponse} from 'axios';
import {apiService} from './APIService';
import {logger} from '@/utils';

export abstract class BaseService {
  protected api = apiService;

  protected async handleRequest<T>(
    request: () => Promise<AxiosResponse<T>>
  ): Promise<T> {
    try {
      const response = await request();
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: unknown) {
    logger.error('API request failed', error);
  }

  protected async get<T>(url: string, config?: any): Promise<T> {
    return this.handleRequest(() => this.api.get<T>(url, config));
  }

  protected async post<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.handleRequest(() => this.api.post<T>(url, data, config));
  }

  protected async put<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.handleRequest(() => this.api.put<T>(url, data, config));
  }

  protected async delete<T>(url: string, config?: any): Promise<T> {
    return this.handleRequest(() => this.api.delete<T>(url, config));
  }
}