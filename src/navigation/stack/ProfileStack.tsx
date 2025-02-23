import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {FC} from 'react';

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
} from '@/screens';
import {COLORS} from '@/styles/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from '@/components';

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
      headerShown: true,
      headerBackButtonDisplayMode: 'minimal',
      headerStyle: {
        backgroundColor: COLORS.black,
      },
      headerTitleStyle: {
        color: COLORS.cream,
      },
      title: 'ArcanaX',
      headerLeft: (props: any) => (
        <TouchableOpacity {...props}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Icon
            name="rightArrow"
            size={50}
            style={{
              tintColor: COLORS.cream,
              marginLeft: 10,
              transform: [{rotate: '180deg'}],
            }}
          />
        </TouchableOpacity>
      ),
    },
  },
  {
    name: 'ProfilePasswordScreen',
    component: ProfilePasswordScreen,
    options: {
      headerShown: true,
      headerBackButtonDisplayMode: 'minimal',
      headerStyle: {
        backgroundColor: COLORS.black,
      },
      headerTitleStyle: {
        color: COLORS.cream,
      },
      title: 'ArcanaX',
      headerLeft: (props: any) => (
        <TouchableOpacity {...props}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Icon
            name="rightArrow"
            size={50}
            style={{
              tintColor: COLORS.cream,
              marginLeft: 10,
              transform: [{rotate: '180deg'}],
            }}
          />
        </TouchableOpacity>
      ),
    },
  },
  {
    name: 'SaveServicesScreen',
    component: SaveServicesScreen,
    options: {
      headerShown: true,
      headerBackButtonDisplayMode: 'minimal',
      headerStyle: {
        backgroundColor: COLORS.black,
      },
      headerTitleStyle: {
        color: COLORS.cream,
      },
      title: 'ArcanaX',
      headerLeft: (props: any) => (
        <TouchableOpacity {...props}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Icon
            name="rightArrow"
            size={50}
            style={{
              tintColor: COLORS.cream,
              marginLeft: 10,
              transform: [{rotate: '180deg'}],
            }}
          />
        </TouchableOpacity>
      ),
    },
  },
  {
    name: 'TarotHistoryScreen',
    component: TarotHistoryScreen,
    options: {
      headerShown: true,
      headerBackButtonDisplayMode: 'minimal',
      headerStyle: {
        backgroundColor: COLORS.black,
      },
      headerTitleStyle: {
        color: COLORS.cream,
      },
      title: 'ArcanaX',
      headerLeft: (props: any) => (
        <TouchableOpacity {...props}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Icon
            name="rightArrow"
            size={50}
            style={{
              tintColor: COLORS.cream,
              marginLeft: 10,
              transform: [{rotate: '180deg'}],
            }}
          />
        </TouchableOpacity>
      ),
    },
  },
  {
    name: 'NumerologyHistoryScreen',
    component: NumerologyHistoryScreen,
    options: {
      headerShown: true,
      headerBackButtonDisplayMode: 'minimal',
      headerStyle: {
        backgroundColor: COLORS.black,
      },
      headerTitleStyle: {
        color: COLORS.cream,
      },
      title: 'ArcanaX',
      headerLeft: (props: any) => (
        <TouchableOpacity {...props}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Icon
            name="rightArrow"
            size={50}
            style={{
              tintColor: COLORS.cream,
              marginLeft: 10,
              transform: [{rotate: '180deg'}],
            }}
          />
        </TouchableOpacity>
      ),
    },
  },
  {
    name: 'BalanceScreen',
    component: BalanceScreen,
    options: {
      headerShown: true,
      headerBackButtonDisplayMode: 'minimal',
      headerStyle: {
        backgroundColor: COLORS.black,
      },
      headerTitleStyle: {
        color: COLORS.cream,
      },
      title: 'ArcanaX',
      headerLeft: (props: any) => (
        <TouchableOpacity {...props}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Icon
            name="rightArrow"
            size={50}
            style={{
              tintColor: COLORS.cream,
              marginLeft: 10,
              transform: [{rotate: '180deg'}],
            }}
          />
        </TouchableOpacity>
      ),
    },
  },
  {
    name: 'DreamHistoryScreen',
    component: DreamHistoryScreen,
    options: {
      headerShown: true,
      headerBackButtonDisplayMode: 'minimal',
      headerStyle: {
        backgroundColor: COLORS.black,
      },
      headerTitleStyle: {
        color: COLORS.cream,
      },
      title: 'ArcanaX',
      headerLeft: (props: any) => (
        <TouchableOpacity {...props}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Icon
            name="rightArrow"
            size={50}
            style={{
              tintColor: COLORS.cream,
              marginLeft: 10,
              transform: [{rotate: '180deg'}],
            }}
          />
        </TouchableOpacity>
      ),
    },
  },

  {
    name: 'FAQScreen',
    component: FAQScreen,
    options: {
      headerShown: true,
      headerBackButtonDisplayMode: 'minimal',
      headerStyle: {
        backgroundColor: COLORS.black,
      },
      headerTitleStyle: {
        color: COLORS.cream,
      },
      title: 'ArcanaX',
      headerLeft: (props: any) => (
        <TouchableOpacity {...props}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Icon
            name="rightArrow"
            size={50}
            style={{
              tintColor: COLORS.cream,
              marginLeft: 10,
              transform: [{rotate: '180deg'}],
            }}
          />
        </TouchableOpacity>
      ),
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
