import {useAppDispatch, useAppSelector} from '@/hooks';
import i18n from '@/i18n';
import {apiService} from '@/services/APIService';
import {balanceActions} from '@/store/balance/balanceActions';
import {showToast} from '@/utils/showToast';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/navigation/navigation';
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
  setNumerologyDetail: React.Dispatch<React.SetStateAction<NumerologyDetail>>;
  lifePath: ResponseType;
  setLifePath: React.Dispatch<React.SetStateAction<ResponseType>>;
  radicalNumber: ResponseType;
  setRadicalNumber: React.Dispatch<React.SetStateAction<ResponseType>>;
  expressionNumber: ResponseType;
  setExpressionNumber: React.Dispatch<React.SetStateAction<ResponseType>>;
  personalYear: ResponseType;
  setPersonalYear: React.Dispatch<React.SetStateAction<ResponseType>>;
  pinnacleNumber: ResponseData;
  setPinnacleNumber: React.Dispatch<React.SetStateAction<ResponseData>>;
  rulingPlanet: RulingPlanet;
  setRulingPlanet: React.Dispatch<React.SetStateAction<RulingPlanet>>;
  karmicNumberDetails: KarmicDetail;
  setKarmicNumberDetails: React.Dispatch<React.SetStateAction<KarmicDetail>>;
  saveName: string;
  setSaveName: React.Dispatch<React.SetStateAction<string>>;
  saveData: () => Promise<void>;
  saveLoading: boolean;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  completed: boolean;
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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  const {localeValue} = useAppSelector(state => state.settings);
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
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const saveData = async () => {
    const values = {
      userId: user?.id,
      saveName,
      rating: rating === null ? -1 : rating,
      comment,
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
        message: i18n.t('TOAST.SUCCESS', {locale: localeValue}),
        type: 'success',
      });
      navigation.popToTop();
      await dispatch(
        balanceActions.getBalance({accountId: String(user?.accountId)}),
      ).unwrap();
    } catch (error) {
      showToast({
        message: i18n.t('TOAST.ERROR', {locale: localeValue}),
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

    comment,
    setComment,

    rating,
    setRating,
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
