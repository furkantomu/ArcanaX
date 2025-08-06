import {BaseService} from './BaseService';
import {API_ENDPOINTS} from '@/config/api';

interface TarotCard {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface TarotReading {
  id: string;
  cards: TarotCard[];
  interpretation: string;
  createdAt: string;
}

class TarotService extends BaseService {
  async getTarotCards(): Promise<TarotCard[]> {
    return this.get<TarotCard[]>(API_ENDPOINTS.TAROT.CARDS);
  }

  async getTarotServices(): Promise<any[]> {
    return this.get<any[]>(API_ENDPOINTS.TAROT.SERVICES);
  }

  async createTarotReading(data: any): Promise<TarotReading> {
    return this.post<TarotReading>(API_ENDPOINTS.TAROT.READINGS, data);
  }

  async getTarotReadings(): Promise<TarotReading[]> {
    return this.get<TarotReading[]>(API_ENDPOINTS.TAROT.READINGS);
  }
}

export const tarotService = new TarotService();