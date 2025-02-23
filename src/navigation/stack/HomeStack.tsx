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
import {BottomSheet, Typography} from '@/components';
import {useRefsContext} from '@/context';

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
    },
  },
  {
    name: 'TarotDetail',
    component: TarotDetail,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'TarotCardDetail',
    component: TarotCardDetail,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'TarotSpreadScreen',
    component: TarotSpreadScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'NumerologyScreen',
    component: NumerologyScreen,
    options: {
      headerShown: false,
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
    },
  },
  {
    name: 'DreamPremiumScreen',
    component: DreamPremiumScreen,
    options: {
      headerShown: false,
    },
  },
];

const HomeStack = () => {
  const Stack = createStackNavigator();
  const {tokenSheetRef} = useRefsContext();
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
      <BottomSheet ref={tokenSheetRef}>
        <Typography>TOKEN İŞLEMLERİ</Typography>
      </BottomSheet>
    </>
  );
};

export default HomeStack;
