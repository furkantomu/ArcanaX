import React from 'react';
import {AppProvider} from './TarotScreenContext';
import TarotScreenWrapper from './TarotScreeWrapper';

const TarotScreen = () => {
  return (
    <AppProvider>
      <TarotScreenWrapper />
    </AppProvider>
  );
};

export default TarotScreen;
