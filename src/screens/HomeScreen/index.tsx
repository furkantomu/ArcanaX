import React from 'react';
import HomeWrapper from './HomeWrapper';
import {AppProvider} from './HomeScreenContext';
import {useBalance} from '@/hooks/useBalance';

const HomeScreen = () => {
  // Custom hook handles all balance-related logic
  useBalance();

  return (
    <AppProvider>
      <HomeWrapper />
    </AppProvider>
  );
};

export default HomeScreen;
