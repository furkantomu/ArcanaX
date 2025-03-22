import React, {createContext, useContext, ReactNode, useState} from 'react';

interface AppContextType {
  loginType: 'login' | 'register' | 'password';

  setLoginType: (type: 'login' | 'register' | 'password') => void;

  setPasswordVisible: (value: boolean) => void;
  passwordVisible: boolean;

  setRegisterPasswordVisible: (value: {
    password: boolean;
    confirmPassword: boolean;
  }) => void;
  registerPasswordVisible: {
    password: boolean;
    confirmPassword: boolean;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [loginType, setLoginType] = useState<'login' | 'register' | 'password'>('login');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState({
    password: true,
    confirmPassword: true,
  });

  const value = {
    loginType,
    setLoginType,

    setPasswordVisible,
    passwordVisible,

    registerPasswordVisible,
    setRegisterPasswordVisible,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useLoginContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
