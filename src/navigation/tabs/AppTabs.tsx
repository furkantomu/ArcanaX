import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from '../stack/HomeStack';
import ProfileStack from '../stack/ProfileStack';

import {useAppSelector} from '@/hooks';
import {selectLoggedIn} from '@/store/auth/authSelectors';
import {AuthStack} from '../stack/AuthStack';
import {COLORS} from '@/styles/theme';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type TabBarIconProps = {
  source: ImageSourcePropType;
  focused: boolean;
};
const TabBarIcon: React.FC<TabBarIconProps> = ({ source, focused }) => (
  <Image
    source={source}
    resizeMode="cover"
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
      width: 25,
      height: 25,
      tintColor: focused ? COLORS.gold : COLORS.cream,
      marginTop: 10,
    }}
  />
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLORS.blackOpacity,
          borderRadius: 50,
          borderTopWidth: 0,
          marginHorizontal: 30,
          marginVertical: 20,
          height: 50,
        },
      }}>
      <Tab.Screen
        name="Astroloji"
        component={HomeStack}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon
              focused={focused}
              source={require('../../../assets/tab/app.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Kişisel"
        component={HomeStack}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon
              focused={focused}
              source={require('../../../assets/tab/zodiac.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileStack}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon
              focused={focused}
              source={require('../../../assets/tab/profile2.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppTabs = () => {
  const isLoggedIn = useAppSelector(selectLoggedIn);

  return isLoggedIn ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="TabHomeScreen"
        component={Tabs}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  ) : (
    <AuthStack />
  );
};
