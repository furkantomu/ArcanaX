import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, Onboarding} from '@/screens';


const Stack = createStackNavigator();

export const AuthStack = () => {
  const isOnboardingCompleted = false;
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={isOnboardingCompleted ? 'Login' : 'OnboardingScreen'}>
      {!isOnboardingCompleted && (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="OnboardingScreen"
          component={Onboarding}
        />
      )}

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};
