import {apiService} from '@/services/APIService';
import {SIZES} from '@/styles/theme';
import React, {createContext, useContext, ReactNode, useState} from 'react';
import {SharedValue, useSharedValue, withSpring} from 'react-native-reanimated';

export type TarotCard = {
  id: string;
  name: string;
  category: 'swords' | 'wands' | 'cups' | 'pentacles' | 'major';
  engName: string;
  frontImageSource: string;
};
export type TarotCardDetail = {
  id: string;
  name: string;
  category: 'swords' | 'wands' | 'cups' | 'pentacles' | 'major';
  engName: string;
  frontImageSource: string;
  details: {
    title: string;
    element: string;
    zodiac: string;
    planet: string;
    description: string;
    number: string;
  };
};

interface AppContextType {
  tarotCards: TarotCard[];
  setTarotCards: (param: TarotCard[]) => void;

  fetchTarotCard: (id: string) => void;

  tarotCardDetail: TarotCardDetail;
  setTarotCardDetail: (param: TarotCardDetail) => void;

  loading: boolean;
  setLoading: (param: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [tarotCards, setTarotCards] = useState<TarotCard[]>([]);
  const [tarotCardDetail, setTarotCardDetail] = useState<TarotCardDetail>({
    id: '',
    name: '',
    category: 'major',
    engName: '',
    frontImageSource: '',
    details: {
      title: '',
      element: '',
      zodiac: '',
      planet: '',
      description: '',
      number: '',
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTarotCard = async (id: string) => {
    try {
      setLoading(true);
      const response = await apiService.get<TarotCardDetail>(
        `tarot/cards/${id}`,
      );
      setTarotCardDetail(response.data);
    } catch (error) {
      console.error('Tarot kartları yüklenirken hata oluştu:', error);
      throw new Error('Tarot kartları yüklenemedi!');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    tarotCards,
    setTarotCards,

    fetchTarotCard,
    setTarotCardDetail,
    tarotCardDetail,

    setLoading,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useMyTarotAnalysisContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
