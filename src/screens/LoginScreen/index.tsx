import React from 'react';
import {AppProvider} from './LoginContext';
import LoginScreen from './LoginScreen';

const LoginContainer = () => {
  return (
    <AppProvider>
      <LoginScreen/>
    </AppProvider>
  );
};

export default LoginContainer;
