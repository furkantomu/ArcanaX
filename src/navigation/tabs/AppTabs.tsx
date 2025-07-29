import React from 'react';
import {Image, ImageSourcePropType, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from '../stack/HomeStack';
import ProfileStack from '../stack/ProfileStack';

import {useAppSelector} from '@/hooks';
import {selectLoggedIn} from '@/store/auth/authSelectors';
import {AuthStack} from '../stack/AuthStack';
import {COLORS} from '@/styles/theme';
import {PurchasingScreen} from '@/screens';
import { CustomTransition } from '@/utils/navigationUtils';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type TabBarIconProps = {
  source: ImageSourcePropType;
  focused: boolean;
};
const TabBarIcon: React.FC<TabBarIconProps> = ({source, focused}) => (
  <Image
    source={source}
    resizeMode="cover"
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
      width: 25,
      height: 25,
      tintColor: focused ? COLORS.gold : COLORS.cream,
    }}
  />
);

const CustomTabButton = ({children, onPress}: any) => (
  <Pressable
    style={{
      backgroundColor: 'transparent',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
    }}
    onPress={onPress}>
    {children}
  </Pressable>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#f5f5dc4f',
          position: 'absolute',
          marginHorizontal: 30,
          marginBottom: 20,
          borderTopWidth: 0,
          height: 50,
          borderBottomWidth: 0,
          borderRadius: 50,
          elevation: 0,
        },
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarButton: props => <CustomTabButton {...props} />,
      }}>
      <Tab.Screen
        name="Astroloji"
        component={HomeStack}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <TabBarIcon
              focused={focused}
              source={require('../../../assets/tab/app.png')}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Kişisel"
        component={HomeStack}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <TabBarIcon
              focused={focused}
              source={require('../../../assets/tab/zodiac.png')}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profil"
        component={ProfileStack}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}: {focused: boolean}) => (
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
      <Stack.Screen
        name="PurchasingScreen"
        component={PurchasingScreen}
        options={() => CustomTransition('down')}
      />
    </Stack.Navigator>
  ) : (
    <AuthStack />
  );
};
