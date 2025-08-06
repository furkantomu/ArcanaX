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
import {ICON_SIZES, TAB_BAR} from '@/constants';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type TabBarIconProps = {
  source: ImageSourcePropType;
  focused: boolean;
};
const TabBarIcon: React.FC<TabBarIconProps> = React.memo(({source, focused}) => (
  <Image
    source={source}
    resizeMode="cover"
    style={{
      width: ICON_SIZES.MEDIUM,
      height: ICON_SIZES.MEDIUM,
      tintColor: focused ? COLORS.gold : COLORS.cream,
    }}
  />
));

const CustomTabButton = React.memo(({children, onPress}: any) => (
  <Pressable
    style={{
      backgroundColor: 'transparent',
      borderRadius: TAB_BAR.BORDER_RADIUS,
      justifyContent: 'center',
      alignItems: 'center',
      height: TAB_BAR.HEIGHT,
    }}
    onPress={onPress}>
    {children}
  </Pressable>
));

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#f5f5dc4f',
          position: 'absolute',
          marginHorizontal: TAB_BAR.MARGIN_HORIZONTAL,
          marginBottom: TAB_BAR.MARGIN_BOTTOM,
          borderTopWidth: 0,
          height: TAB_BAR.HEIGHT,
          borderBottomWidth: 0,
          borderRadius: TAB_BAR.BORDER_RADIUS,
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
