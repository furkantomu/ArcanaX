import React, {createContext, useContext, ReactNode, useState} from 'react';
import {apiService} from '@/services/APIService';

type TarotCard = {
  id: string;
  name: string;
  category: 'swords' | 'wands' | 'cups' | 'pentacles' | 'major'; // Örnek kategoriler
  engName: string;
  frontImageSource: string;
};

interface AppContextType {
  cards: TarotCard[];

  tarotCards: TarotCard[];
  fetchTarotCards: () => Promise<void>;

  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;

  getFilteredTarotCards: (category: string) => TarotCard[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [tarotCards, setTarotCards] = useState<TarotCard[]>([]);
  const [cards, setCards] = useState<TarotCard[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const fetchTarotCards = async () => {
    try {
      setLoading(true);
      const response = await apiService.get<TarotCard[]>('tarot/cards');
      setLoading(false);
      setTarotCards(response.data);
    } catch (error) {
      setLoading(false);
      console.error('Tarot servisleri yüklenirken hata oluştu:', error);
      throw new Error('Tarot servisleri yüklenemedi!');
    }
  };

  const getFilteredTarotCards = (category: string) => {
    const list = tarotCards.filter(card => card.category === category);
    setCards(list);
    return list;
  };
  const value = {tarotCards, fetchTarotCards, loading, setLoading, getFilteredTarotCards, cards};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useTarotDetailContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
