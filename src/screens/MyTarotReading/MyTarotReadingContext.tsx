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

interface AppContextType {
  tarotCards: TarotCard[];
  setTarotCards: (param: TarotCard[]) => void;

  setLoading: (param: boolean) => void;
  loading: boolean;

  fetchTarotCards: () => Promise<void>;

  selectedCards: TarotCard[];
  setSelectedCards: (param: TarotCard[]) => void;

  handleSelectCard: (param: TarotCard) => void;
  handleRemoveCard: (param: TarotCard) => void;
  setLastRemovedCard: (param: TarotCard | null) => void;
  lastRemovedCard: TarotCard | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [tarotCards, setTarotCards] = useState<TarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [lastRemovedCard, setLastRemovedCard] = useState<TarotCard | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTarotCards = async () => {
    try {
      setLoading(true);
      const response = await apiService.get<TarotCard[]>('tarot/cards');
      setTarotCards(response.data);
    } catch (error) {
      console.error('Tarot servisleri yüklenirken hata oluştu:', error);
      throw new Error('Tarot servisleri yüklenemedi!');
    } finally {
      setLoading(false);
    }
  };
  const handleSelectCard = (card: TarotCard) => {
    if (selectedCards.some(c => c.id === card.id)) {
      handleRemoveCard(card);
    } else if (selectedCards.length < 5) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleRemoveCard = (card: TarotCard) => {
    setSelectedCards(prev => {
      const exists = prev.some(c => c.id === card.id);
      if (exists) setLastRemovedCard(card);
      return prev.filter(c => c.id !== card.id);
    });
  };
  const value = {
    fetchTarotCards,
    tarotCards,
    setTarotCards,
    loading,
    setLoading,
    selectedCards,
    setSelectedCards,
    handleSelectCard,
    handleRemoveCard,
    setLastRemovedCard,
    lastRemovedCard,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useMyTarotReadingContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
