import {useAppDispatch, useAppSelector} from '@/hooks';
import i18n from '@/i18n';
import {apiService} from '@/services/APIService';
import {balanceActions} from '@/store/balance/balanceActions';
import {showToast} from '@/utils/showToast';
import {useNavigation} from '@react-navigation/native';
import React, {createContext, useContext, ReactNode, useState} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';

export type TarotCard = {
  cardName: string;
  image: string;
  cardId: string;
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

type Messages = {
  content: string;
  role: string;
};

interface AppContextType {
  opacity: SharedValue<number>;
  scale: SharedValue<number>;

  tarotCards: TarotCard;
  setTarotCards: React.Dispatch<React.SetStateAction<TarotCard>>;

  fetchTarotCard: (id: string) => void;

  tarotCardDetail: TarotCardDetail | null;
  setTarotCardDetail: React.Dispatch<
    React.SetStateAction<TarotCardDetail | null>
  >;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  handleInputChange: (text: string) => void;
  setUserInputs: React.Dispatch<React.SetStateAction<string>>;
  userInputs: string;

  startReading: boolean;
  setStartReading: React.Dispatch<React.SetStateAction<boolean>>;

  isWritingLoading: boolean;
  setWritingLoading: React.Dispatch<React.SetStateAction<boolean>>;

  messages: Messages[];
  setMessages: React.Dispatch<React.SetStateAction<Messages[]>>;

  setSpreadID: React.Dispatch<React.SetStateAction<string>>;
  spreadID: string;

  setSaveLoading: React.Dispatch<React.SetStateAction<boolean>>;
  saveLoading: boolean;

  setDetailLoading: React.Dispatch<React.SetStateAction<boolean>>;
  detailLoading: boolean;

  rating: number | null;
  setRating: React.Dispatch<React.SetStateAction<number | null>>;

  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;

  setSaveName: React.Dispatch<React.SetStateAction<string>>;
  saveName: string;

  saveData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {user} = useAppSelector(state => state.auth);
  const {localeValue} = useAppSelector(state => state.settings);

  const [tarotCards, setTarotCards] = useState<TarotCard>({
    cardName: '',
    image: '',
    cardId: '',
  });
  const [tarotCardDetail, setTarotCardDetail] =
    useState<TarotCardDetail | null>(null);
  const [userInputs, setUserInputs] = useState<string>('');
  const [spreadID, setSpreadID] = useState<string>('');
  const [saveName, setSaveName] = useState('');

  const [loading, setLoading] = useState<boolean>(false);
  const [startReading, setStartReading] = useState<boolean>(false);
  const [isWritingLoading, setWritingLoading] = useState<boolean>(false);

  const [messages, setMessages] = useState<Messages[]>([]);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);

  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleInputChange = (text: string) => {
    setUserInputs(text);
  };
  const fetchTarotCard = async (id: string) => {
    try {
      setDetailLoading(true);
      const response = await apiService.get<TarotCardDetail>(
        `tarot/cards/${id}`,
      );
      setTarotCardDetail(response.data);
    } catch (error) {
      console.error('Tarot kartları yüklenirken hata oluştu:', error);
      throw new Error('Tarot kartları yüklenemedi!');
    } finally {
      setDetailLoading(false);
    }
  };
  const saveData = async () => {
    try {
      setSaveLoading(true);
      await apiService.post('tarot/save', {
        id: spreadID,
        userId: user?.id,
        saveName: saveName !== '' ? saveName : tarotCards.cardName,
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
        navigation.goBack();
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
    opacity,
    scale,

    tarotCards,
    setTarotCards,

    setLoading,
    loading,

    setUserInputs,
    userInputs,
    handleInputChange,

    startReading,
    setStartReading,

    messages,
    setMessages,

    isWritingLoading,
    setWritingLoading,

    spreadID,
    setSpreadID,

    setSaveName,
    saveName,

    saveData,
    saveLoading,
    setSaveLoading,

    detailLoading,
    setDetailLoading,

    comment,
    setComment,

    rating,
    setRating,
    tarotCardDetail,
    setTarotCardDetail,

    fetchTarotCard,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useMyTarotAnalysisDetailContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
