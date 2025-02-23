import {apiService} from '@/services/APIService';
import { NumerologyDetailResponse } from '@/types/service';
import {showToast} from '@/utils/showToast';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {createContext, useContext, ReactNode, useState} from 'react';

type NumerologyDetail = {
  name: string;
  birthDate: string;
  // Yaşam Yolu Sayısı
  lifePath: string;
  // İfade Sayısı
  expression: string;
  // Kişisel Yıl Sayısı
  personalYear: string;
  // Karmik Sayı
  checkSpecificNumber: boolean;

  radicalNumber: string;
  rulingPlanet: number;
  pinnacleNumber: string;
};

type NumerologyHistoryRouteParams = {
  id: string;
  type: string;
};

type NumerologyHistoryRouteProp = RouteProp<
  {NumerologyHistoryScreen: NumerologyHistoryRouteParams},
  'NumerologyHistoryScreen'
>;

interface AppContextType {
  numerologyDetail: NumerologyDetail;
  setNumerologyDetail: (values: NumerologyDetail) => void;

  getSaveDetail: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const route = useRoute<NumerologyHistoryRouteProp>();
  const {type, id} = route.params;
  const [numerologyDetail, setNumerologyDetail] = useState<NumerologyDetail>({
    name: '',
    birthDate: '',
    lifePath: '',
    expression: '',
    personalYear: '',
    radicalNumber: '',
    rulingPlanet: 0,
    pinnacleNumber: '',
    checkSpecificNumber: false,
  });

  const getSaveDetail = async () => {
    try {
      const { data }: { data: { numerologyData: NumerologyDetailResponse } } = await apiService.get(`${type}/save-detail/${id}`);
      setNumerologyDetail({
        name: data.numerologyData.name,
        birthDate: data.numerologyData.birthDate,
        lifePath: data.numerologyData.lifePath,
        expression: data.numerologyData.expressionNumber,
        personalYear: data.numerologyData.personalYear,
        radicalNumber: data.numerologyData.radicalNumber,
        checkSpecificNumber: data.numerologyData.checkSpecificNumber,
        rulingPlanet: data.numerologyData.rulingPlanet,
        pinnacleNumber: data.numerologyData.pinnacleNumber,
      });
    } catch (error) {
      showToast({
        message: 'Sunucuya baplanırken bir hata oluştu.',
        type: 'error',
      });
    }
  };

  const value = {
    setNumerologyDetail,
    numerologyDetail,

    getSaveDetail,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useNumerologyHistoryContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
