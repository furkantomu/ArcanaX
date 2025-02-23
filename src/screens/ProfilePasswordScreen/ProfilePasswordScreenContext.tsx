import React, {createContext, useContext, ReactNode, useState} from 'react';

interface PasswordVisibleState {
  currentPassword: boolean;
  newPassword: boolean;
  confirmNewPassword: boolean;
}

interface AppContextType {
  passwordVisible: PasswordVisibleState;
  updatePasswordVisible: (
    key: keyof PasswordVisibleState,
    newValue: boolean,
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [passwordVisible, setPasswordVisible] = useState<PasswordVisibleState>({
    currentPassword: true,
    newPassword: true,
    confirmNewPassword: true,
  });

  const updatePasswordVisible = (
    key: keyof PasswordVisibleState,
    newValue: boolean,
  ) => {
    setPasswordVisible(prevState => ({
      ...prevState,
      [key]: newValue,
    }));
  };

  const value = {
    passwordVisible,
    updatePasswordVisible,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const usePasswordContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
