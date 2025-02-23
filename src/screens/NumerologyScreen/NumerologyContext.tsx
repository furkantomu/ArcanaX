import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';

type NumerologyDetail = {
  name: string;
  birthDate: string;
  // Yaşam Yolu Sayısı
  lifePath: number;
  // İfade Sayısı
  expression: number;
  // Kişisel Yıl Sayısı
  personalYear: number;
  radicalNumber: number;
  // Karmik Sayı
  checkSpecificNumber: boolean;
};

interface AppContextType {
  height: SharedValue<number>;

  isCalculate: boolean;
  setCalculate: Dispatch<SetStateAction<boolean>>;

  numerologyDetail: NumerologyDetail;
  setNumerologyDetail: Dispatch<SetStateAction<NumerologyDetail>>;

  isCalculationComplete: boolean;
  setCalculationComplete: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const height = useSharedValue(0);
  const [isCalculate, setCalculate] = useState<boolean>(false);
  const [isCalculationComplete, setCalculationComplete] =
    useState<boolean>(false);

  const [numerologyDetail, setNumerologyDetail] = useState<NumerologyDetail>({
    name: '',
    birthDate: '',
    lifePath: 0,
    expression: 0,
    personalYear: 0,
    radicalNumber: 0,
    checkSpecificNumber: false,
  });

  const value = {
    height,

    isCalculate,
    setCalculate,

    setCalculationComplete,
    isCalculationComplete,

    setNumerologyDetail,
    numerologyDetail,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useNumerologyContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
