import {useAppDispatch, useAppSelector} from '@/hooks';
import i18n from '@/i18n';
import {apiService} from '@/services/APIService';
import { balanceActions } from '@/store/balance/balanceActions';
import {showToast} from '@/utils/showToast';
import {useNavigation} from '@react-navigation/native';
import React, {createContext, useContext, ReactNode, useState} from 'react';

interface Messages {
  role: string;
  content: string;
}

interface AppContextType {
  messages: Messages[];
  setMessages: (message: any) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  dream: string;
  setDream: (value: string) => void;

  setModalVisible: (value: boolean) => void;
  modalVisible: boolean;

  setSaveName: (value: string) => void;
  saveName: string;

  setSaveLoading: (value: boolean) => void;
  saveLoading: boolean;

  spreadID: string;
  setSpreadID: (value: string) => void;

  saveData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const {user} = useAppSelector(state => state.auth);
  const {localeValue} = useAppSelector(state => state.settings);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [dream, setDream] = useState('');
  const [messages, setMessages] = useState<Messages[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  const [spreadID, setSpreadID] = useState('');

  const saveData = async () => {
    try {
      setSaveLoading(true);
      await apiService.post('dream/save', {
        id: spreadID,
        userId: user?.id,
        saveName,
      });
      showToast({
        message: i18n.t('TOAST.SUCCESS', {locale: localeValue}),
        type: 'success',
      });
      setTimeout(() => {
        navigation.goBack();
      }, 300);
        await dispatch(
              balanceActions.getBalance({accountId: String(user?.accountId)}),
            );
    } catch (error) {
      console.log(error);
      showToast({message: i18n.t('TOAST.ERROR', {locale: localeValue}), type: 'error'});
    } finally {
      setSaveLoading(false);
    }
  };

  const value = {
    dream,
    setDream,

    messages,
    setMessages,

    loading,
    setLoading,

    modalVisible,
    setModalVisible,

    saveName,
    setSaveName,

    saveLoading,
    setSaveLoading,

    saveData,

    spreadID,
    setSpreadID,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useDreamContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
