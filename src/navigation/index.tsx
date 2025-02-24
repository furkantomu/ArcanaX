import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {navigationRef} from '@/utils/navigationUtils';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RefsProvider} from '@/context';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {AppTabs} from './tabs/AppTabs';

import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { COLORS } from '@/styles/theme';

dayjs.locale('tr');

export const AppNavigationContainer = () => {
  const routeNameRef = useRef<string | undefined>(undefined);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
    >
      <View style={styles.navigationLayout}>
        <AppTabs />
      </View>
    </NavigationContainer>
  );
};

export const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={styles.navigationLayout}>
      <RefsProvider>
        <SafeAreaProvider>
          <AppNavigationContainer />
        </SafeAreaProvider>
      </RefsProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  navigationLayout: {
    flex: 1,
    backgroundColor:COLORS.black,
  },
});
