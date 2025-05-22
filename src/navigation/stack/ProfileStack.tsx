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
import {CustomTransition} from '@/utils/navigationUtils';

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
      ...CustomTransition('right'),
    },
  },
  {
    name: 'ProfilePasswordScreen',
    component: ProfilePasswordScreen,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
    },
  },
  {
    name: 'SaveServicesScreen',
    component: SaveServicesScreen,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
    },
  },
  {
    name: 'TarotHistoryScreen',
    component: TarotHistoryScreen,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
    },
  },
  {
    name: 'NumerologyHistoryScreen',
    component: NumerologyHistoryScreen,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
    },
  },
  {
    name: 'BalanceScreen',
    component: BalanceScreen,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
    },
  },
  {
    name: 'DreamHistoryScreen',
    component: DreamHistoryScreen,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
    },
  },

  {
    name: 'FAQScreen',
    component: FAQScreen,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
    },
  },
  {
    name: 'AccountSettings',
    component: AccountSettings,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
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
