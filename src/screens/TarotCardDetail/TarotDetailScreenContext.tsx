import React, {createContext, useContext, ReactNode, useState} from 'react';
import {apiService} from '@/services/APIService';

type TarotCard = {
  id: string;
  name: string;
  category: 'swords' | 'wands' | 'cups' | 'pentacles' | 'major';
  engName: string;
  frontImageSource: string;
};

interface AppContextType {
  cards: TarotCard[];
  setCards: (param: TarotCard[]) => void;


  tarotCards: TarotCard[];
  setTarotCards: (param: TarotCard[]) => void;

  fetchTarotCards: () => void;

  setLoading: (param: boolean) => void;
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
        const response = await apiService.get<TarotCard[]>(
          'tarot/cards',
        );
        setTarotCards(response.data);
      } catch (error) {
        console.error('Tarot servisleri yüklenirken hata oluştu:', error);
        throw new Error('Tarot servisleri yüklenemedi!');
      }finally {
        setLoading(false);
      }
    };

  const getFilteredTarotCards = (category: string) => {
    const list = tarotCards.filter(card => card.category === category);
    setCards(list)
  };
  const value = {tarotCards, setTarotCards, cards, setCards,fetchTarotCards, getFilteredTarotCards, loading, setLoading};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useTarotDetailContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
