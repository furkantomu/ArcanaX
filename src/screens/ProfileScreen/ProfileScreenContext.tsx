import React, {createContext, useContext, ReactNode} from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   birthDate: string;
//   role: string;
//   updatedAt: string;
//   createdAt: string;
// }

interface AppContextType {}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const value = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useProfileContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
