import React, {createContext, useContext, ReactNode, useState} from 'react';

interface birthdate {
  day: string;
  month: string;
  year: string;
  gender: string;
}
interface AppContextType {
  email: string;
  setEmail: (email: string) => void;

  fullName: string;
  setFullName: (fullname: string) => void;

  setBirthdate: (params: birthdate) => void;
  birthdate: birthdate;

  password: string;
  setPassword: (password: string) => void;

  isScrollEnabled: boolean;
  setScrollEnabled: (isScrollEnabled: boolean) => void;

  contextErrors: boolean;
  setContextErrors: (errors: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthdate, setBirthdate] = useState({
    day: '',
    month: '',
    year: '',
    gender: '',
  });
  const [password, setPassword] = useState('');
  const [isScrollEnabled, setScrollEnabled] = useState(true);
  const [contextErrors, setContextErrors] = useState(false);

  const value = {
    email,
    setEmail,

    fullName,
    setFullName,

    birthdate,
    setBirthdate,

    password,
    setPassword,

    isScrollEnabled,
    setScrollEnabled,

    contextErrors,
    setContextErrors,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useOnboardingContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
