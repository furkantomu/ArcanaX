import React, {createContext, useContext, ReactNode, useState} from 'react';
import {apiService} from '@/services/APIService';

export type TarotServiceType = {
  id: string;
  name: string;
  engName: string;
  aim: string;
  usageArea: string;
  feature: string;
  type: string;
  price: string;
  count: string;
};
interface AppContextType {
  tarotService: TarotServiceType[];
  fetchTarotServices: () => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [tarotService, setTarotService] = useState<TarotService[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchTarotServices = async (): Promise<TarotServiceType[]> => {
    try {
      setLoading(true);
      const response = await apiService.get<{data: TarotServiceType[]}>(
        'tarot/services',
      );

      setLoading(false);
      setTarotService(response.data);
      return response.data.data;
    } catch (error) {
      setLoading(false);
      console.error('Tarot servisleri yüklenirken hata oluştu:', error);
      throw new Error('Tarot servisleri yüklenemedi!');
    }
  };
  const value = {tarotService, fetchTarotServices, loading};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useTarotContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
