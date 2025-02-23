import {useAppSelector} from '@/hooks';
import {apiService} from '@/services/APIService';
import {showToast} from '@/utils/showToast';
import {useNavigation} from '@react-navigation/native';
import {AxiosResponse} from 'axios';
import React, {createContext, useContext, ReactNode, useState} from 'react';

interface ResponseType {
  message: string;
  id: string;
}

interface Message {
  userId: string;
  first: string;
  second: string;
  third: string;
  age: string;
}

interface ResponseData {
  message: Message;
  id: string;
}
interface RulingPlanet {
  planet: string;
  description: string;
  career: string;
  relationships: string;
  auspiciousMonths: string;
}
interface KarmicDetail {
  value: string;
  label: string;
  description: string;
}

type NumerologyDetail = {
  name: string;
  birthDate: string;
  // Yaşam Yolu Sayısı
  lifePath: number;
  // İfade Sayısı
  expression: number;
  // Kişisel Yıl Sayısı
  personalYear: number;
  // Karmik Sayı
  checkSpecificNumber: boolean;

  radicalNumber: number;
};

interface AppContextType {
  numerologyDetail: NumerologyDetail;
  setNumerologyDetail: (values: NumerologyDetail) => void;

  lifePath: ResponseType;
  setLifePath: (value: ResponseType) => void;

  radicalNumber: ResponseType;
  setRadicalNumber: (value: ResponseType) => void;

  expressionNumber: ResponseType;
  setExpressionNumber: (value: ResponseType) => void;

  personalYear: ResponseType;
  setPersonalYear: (value: ResponseType) => void;

  pinnacleNumber: ResponseData;
  setPinnacleNumber: (value: ResponseData) => void;

  rulingPlanet: RulingPlanet;
  setRulingPlanet: (value: RulingPlanet) => void;

  karmicNumberDetails: KarmicDetail;
  setKarmicNumberDetails: (value: KarmicDetail) => void;

  saveName: string;
  setSaveName: (value: string) => void;
  saveData: () => void;
  saveLoading: boolean;

  setCompleted: (value: boolean) => void;
  completed: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const navigation = useNavigation();
  const {user} = useAppSelector(state => state.auth);
  const [numerologyDetail, setNumerologyDetail] = useState<NumerologyDetail>({
    name: '',
    birthDate: '',
    lifePath: 0,
    expression: 0,
    personalYear: 0,
    radicalNumber: 0,
    checkSpecificNumber: false,
  });
  const [lifePath, setLifePath] = useState<ResponseType>({
    message: '',
    id: '',
  });
  const [radicalNumber, setRadicalNumber] = useState<ResponseType>({
    message: '',
    id: '',
  });
  const [expressionNumber, setExpressionNumber] = useState<ResponseType>({
    message: '',
    id: '',
  });
  const [personalYear, setPersonalYear] = useState<ResponseType>({
    message: '',
    id: '',
  });
  const [pinnacleNumber, setPinnacleNumber] = useState<ResponseData>({
    id: '',
    message: {
      userId: '',
      first: '',
      second: '',
      third: '',
      age: '',
    },
  });
  const [rulingPlanet, setRulingPlanet] = useState<RulingPlanet>({
    planet: '',
    description: '',
    career: '',
    relationships: '',
    auspiciousMonths: '',
  });
  const [karmicNumberDetails, setKarmicNumberDetails] = useState<KarmicDetail>({
    value: '',
    label: '',
    description: '',
  });
  const [saveName, setSaveName] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const saveData = async () => {
    const values = {
      userId: user?.id,
      saveName,
      numerologyData: {
        name: numerologyDetail.name,
        birthDate: numerologyDetail.birthDate,
        lifePath: lifePath.id,
        radicalNumber: radicalNumber.id,
        expressionNumber: expressionNumber.id,
        personalYear: personalYear.id,
        pinnacleNumber: pinnacleNumber.id,
        rulingPlanet: numerologyDetail.radicalNumber,
        checkSpecificNumber: numerologyDetail.checkSpecificNumber,
      },
    };
    try {
      setSaveLoading(true);
      const response: AxiosResponse<{
        message: string;
      }> = await apiService.post('numerology/save', values);
      showToast({
        message: response.data.message,
        type: 'success',
      });
      navigation.popToTop();
    } catch (error) {
      showToast({
        message: 'Bir hata oluştu.',
        type: 'error',
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const value = {
    numerologyDetail,
    setNumerologyDetail,

    lifePath,
    setLifePath,

    radicalNumber,
    setRadicalNumber,

    expressionNumber,
    setExpressionNumber,

    personalYear,
    setPersonalYear,

    pinnacleNumber,
    setPinnacleNumber,

    rulingPlanet,
    setRulingPlanet,

    karmicNumberDetails,
    setKarmicNumberDetails,

    saveName,
    setSaveName,

    saveData,
    saveLoading,

    completed,
    setCompleted,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useNumerologyPremiumContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
