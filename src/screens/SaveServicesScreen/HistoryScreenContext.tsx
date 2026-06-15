import {useAppSelector} from '@/hooks';
import {apiService} from '@/services/APIService';
import {showToast} from '@/utils/showToast';
import React, {createContext, useContext, ReactNode, useState} from 'react';

interface SaveType {
  id: string;
  userId: string;
  saveName: string;
  createdAt: string;
}

interface AppContextType {
  saveType: SaveType[];
  setSaveType: React.Dispatch<React.SetStateAction<SaveType[]>>;

  getSave: (params: string) => void;

  getSaveDetail: (type: string, id: string) => void;

  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const {user} = useAppSelector(state => state.auth);
  const [saveType, setSaveType] = useState<SaveType[]>([
    {
      id: '',
      userId: '',
      saveName: '',
      createdAt: '',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const getSave = async (type: string) => {
    try {
      setLoading(true);
      const result = await apiService.get<SaveType[]>(`${type}/save/${user?.id}`);
      setSaveType(result.data);
    } catch (error) {
      showToast({
        message: 'Sunucuya baplanırken bir hata oluştu.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const getSaveDetail = async (type: string, id: string) => {
    try {
       await apiService.get(`${type}/save-detail/${id}`);
    } catch (error) {
      showToast({
        message: 'Sunucuya baplanırken bir hata oluştu.',
        type: 'error',
      });
    }
  };

  const value = {
    getSave,
    getSaveDetail,
    saveType,
    setSaveType,
    loading,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useHistoryContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
