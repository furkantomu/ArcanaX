import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  ProfileScreen,
  ProfileUserScreen,
  ProfilePasswordScreen,
  SaveServicesScreen,
  TarotHistoryScreen,
  NumerologyHistoryScreen,
  BalanceScreen,
  DreamHistoryScreen,
  FAQScreen,
  AccountSettings,
} from '@/screens';

export type RouteTypes = {
  name: string;
  component: FC<any>;
  options: object;
};

export const routes: RouteTypes[] = [
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ProfileUserScreen',
    component: ProfileUserScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ProfilePasswordScreen',
    component: ProfilePasswordScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SaveServicesScreen',
    component: SaveServicesScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'TarotHistoryScreen',
    component: TarotHistoryScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'NumerologyHistoryScreen',
    component: NumerologyHistoryScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'BalanceScreen',
    component: BalanceScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'DreamHistoryScreen',
    component: DreamHistoryScreen,
    options: {
      headerShown: false,
    },
  },

  {
    name: 'FAQScreen',
    component: FAQScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'AccountSettings',
    component: AccountSettings,
    options: {
      headerShown: false,
    },
  },
];

const ProfileStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      {routes.map((route, index) => (
        <Stack.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default ProfileStack;
