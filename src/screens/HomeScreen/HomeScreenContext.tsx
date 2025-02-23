import React, {createContext, useContext, ReactNode, useState} from 'react';

interface AppContextType {
  screenIndex: number;
  setScreenIndex: (value: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [screenIndex, setScreenIndex] = useState(0);
  const value = {
    screenIndex,
    setScreenIndex,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useHomeContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
