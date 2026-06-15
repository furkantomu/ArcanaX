import {useAppDispatch, useAppSelector} from '@/hooks';
import i18n from '@/i18n';
import {apiService} from '@/services/APIService';
import {balanceActions} from '@/store/balance/balanceActions';
import {showToast} from '@/utils/showToast';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/navigation/navigation';
import React, {createContext, useContext, ReactNode, useState} from 'react';
import {ImageSourcePropType} from 'react-native/types';

interface TarotCard {
  id: number;
  name: string;
  engName: string;
  category: 'swords' | 'wands' | 'cups' | 'pentacles' | 'major';
  frontImageSource: string;
  backImageSource: ImageSourcePropType;
}

type TarotCardDetail = {
  id: string;
  name: string;
  category: 'swords' | 'wands' | 'cups' | 'pentacles' | 'major';
  engName: string;
  frontImageSource: string;
  details: {
    number: string;
    zodiac: string;
    element: string;
    planet: string;
    title: string;
    description: string;
  };
};
interface Messages {
  content: string;
  role: string;
}

interface AppContextType {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  readingType: number;
  setReadingType: React.Dispatch<React.SetStateAction<number>>;
  readingStarted: boolean;
  setReadingStarted: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCards: TarotCard[];
  setSelectedCards: React.Dispatch<React.SetStateAction<TarotCard[]>>;
  removeCard: (card: TarotCard) => void;
  addCard: (card: TarotCard) => void;
  messages: Messages[];
  setMessages: React.Dispatch<React.SetStateAction<Messages[]>>;
  showOpenButton: boolean;
  setShowOpenButton: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectedCard: TarotCardDetail;
  setSelectedCard: React.Dispatch<React.SetStateAction<TarotCardDetail>>;
  setWritingLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isWritingLoading: boolean;
  setReadingCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  readingCompleted: boolean;
  fetchTarotCards: () => Promise<void>;
  tarotCards: TarotCard[];
  fetchTarotCard: (id: string) => Promise<void>;
  spreadID: string;
  setSpreadID: React.Dispatch<React.SetStateAction<string>>;
  setSaveName: React.Dispatch<React.SetStateAction<string>>;
  saveName: string;
  saveData: () => Promise<void>;
  setSaveLoading: React.Dispatch<React.SetStateAction<boolean>>;
  saveLoading: boolean;
  rating: number | null;
  setRating: React.Dispatch<React.SetStateAction<number | null>>;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const {user} = useAppSelector(state => state.auth);
  const {localeValue} = useAppSelector(state => state.settings);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [tarotCards, setTarotCards] = useState<TarotCard[]>([]);
  const [question, setQuestion] = useState('');
  const [readingType, setReadingType] = useState<number>(0);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [readingStarted, setReadingStarted] = useState<boolean>(false);
  const [readingCompleted, setReadingCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [spreadID, setSpreadID] = useState('');
  const [saveName, setSaveName] = useState('');

  const [messages, setMessages] = useState<Messages[]>([]);
  const [showOpenButton, setShowOpenButton] = useState<boolean>(true);
  const [isWritingLoading, setWritingLoading] = useState<boolean>(false);
  const [isSelectedCard, setSelectedCard] = useState<TarotCardDetail>({
    id: '',
    name: '',
    category: 'swords',
    engName: '',
    frontImageSource: '',
    details: {
      number: '',
      zodiac: '',
      element: '',
      planet: '',
      title: '',
      description: '',
    },
  });
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState('');

  const addCard = (card: TarotCard) => {
    setSelectedCards(prevSelected => {
      const isCardSelected = prevSelected.some(c => c.id === card.id);
      if (isCardSelected) {
        return prevSelected.filter(c => c.id !== card.id);
      } else {
        return [...prevSelected, card];
      }
    });
  };

  const removeCard = (card: TarotCard) => {
    setSelectedCards(prevSelected => {
      return prevSelected.filter(c => c.id !== card.id);
    });
  };
  const fetchTarotCards = async () => {
    try {
      setLoading(true);
      const response = await apiService.get< TarotCard[]>('tarot/cards');
      setLoading(false);
      setTarotCards(response.data);
    } catch (error) {
      setLoading(false);
      console.error('Tarot servisleri yüklenirken hata oluştu:', error);
      throw new Error('Tarot servisleri yüklenemedi!');
    }
  };
  const fetchTarotCard = async (id: string) => {
    try {
      setLoading(true);
      const response = await apiService.get<TarotCardDetail>(`tarot/cards/${id}`);
      setSelectedCard(response.data);
    } catch (error) {
      console.error('Tarot kartları yüklenirken hata oluştu:', error);
      throw new Error('Tarot kartları yüklenemedi!');
    } finally {
      setLoading(false);
    }
  };

  const saveData = async () => {
    try {
      setSaveLoading(true);
      await apiService.post('tarot/save', {
        id: spreadID,
        userId: user?.id,
        saveName,
        rating: rating === null ? -1 : rating,
        comment,
      });
      await dispatch(
        balanceActions.getBalance({accountId: String(user?.accountId)}),
      );
      showToast({
        message: i18n.t('TOAST.SUCCESS', {locale: localeValue}),
        type: 'success',
      });
      setTimeout(() => {
        navigation.popToTop();
      }, 300);
    } catch (error) {
      console.log(error);
      showToast({
        message: i18n.t('TOAST.ERROR', {locale: localeValue}),
        type: 'error',
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const value = {
    question,
    setQuestion,
    readingType,
    setReadingType,
    readingStarted,
    setReadingStarted,

    addCard,
    removeCard,

    selectedCards,

    setMessages,
    messages,

    setShowOpenButton,
    showOpenButton,

    setSelectedCard,
    isSelectedCard,

    setWritingLoading,
    isWritingLoading,

    setReadingCompleted,
    readingCompleted,

    fetchTarotCards,
    tarotCards,

    fetchTarotCard,

    setSpreadID,
    spreadID,

    setSaveName,
    saveName,

    saveData,
    saveLoading,
    setSaveLoading,

    comment,
    setComment,

    rating,
    setRating,

    setSelectedCards
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useTarotContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
