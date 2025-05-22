import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {FC} from 'react';

import {
  HomeScreen,
  TarotScreen,
  TarotDetail,
  TarotSpreadScreen,
  NumerologyScreen,
  NumerologyDetailScreen,
  NumerologyPremiumScreen,
  // CoffeeScreen,
  // CoffeePremiumScreen,
  DreamScreen,
  DreamPremiumScreen,
  TarotCardDetail,
} from '@/screens';
import { CustomTransition } from '@/utils/navigationUtils';

export type RouteTypes = {
  name: string;
  component: FC<any>;
  options: object;
};




export const routes: RouteTypes[] = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'TarotScreen',
    component: TarotScreen,
    options: {
      headerShown: false,
      ...CustomTransition('up'),
    },
  },
  {
    name: 'TarotDetail',
    component: TarotDetail,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
    },
  },
  {
    name: 'TarotCardDetail',
    component: TarotCardDetail,
    options: {
      headerShown: false,
      ...CustomTransition('down'),
    },
  },
  {
    name: 'TarotSpreadScreen',
    component: TarotSpreadScreen,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
    },
  },
  {
    name: 'NumerologyScreen',
    component: NumerologyScreen,
    options: {
      headerShown: false,
      ...CustomTransition('up'),
    },
  },
  {
    name: 'NumerologyDetailScreen',
    component: NumerologyDetailScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'NumerologyPremiumScreen',
    component: NumerologyPremiumScreen,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
    },
  },
  // {
  //   name: 'CoffeeScreen',
  //   component: CoffeeScreen,
  //   options: {
  //     headerShown: false,
  //   },
  // },
  // {
  //   name: 'CoffeePremiumScreen',
  //   component: CoffeePremiumScreen,
  //   options: {
  //     headerShown: false,
  //   },
  // },
  {
    name: 'DreamScreen',
    component: DreamScreen,
    options: {
      headerShown: false,
      ...CustomTransition('up'),
    },
  },
  {
    name: 'DreamPremiumScreen',
    component: DreamPremiumScreen,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
    },
  },
];

const HomeStack = () => {
  const Stack = createStackNavigator();
  return (
    <>
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
    </>
  );
};

export default HomeStack;
