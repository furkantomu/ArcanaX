import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {setup} from 'react-native-iap';
import dayjs from 'dayjs';

import {BottomSheet, ChangeLanguage, Purchasing} from '@/components';
import {AppTabs} from './tabs/AppTabs';

import {navigationRef} from '@/utils/navigationUtils';
import {RefsProvider, useRefsContext} from '@/context';
import {useAppSelector} from '@/hooks';

import {COLORS} from '@/styles/theme';
import i18n from '@/i18n';
import 'dayjs/locale/tr';


setup({storekitMode: 'STOREKIT2_MODE'});

export const AppNavigationContainer = () => {
  const routeNameRef = useRef<string | undefined>(undefined);
  const {localeValue} = useAppSelector(state => state.settings);
  const {languageChangeSheetRef, purchasingSheetRef} = useRefsContext();
  //   crashlytics().log('Testing Crashlytics');
  // crashlytics().crash();

  useEffect(() => {
    i18n.locale = localeValue;
    dayjs.locale(localeValue);
  }, [localeValue]);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}>
      <View style={styles.navigationLayout}>
        <AppTabs />
      </View>
      <BottomSheet ref={languageChangeSheetRef}>
        <ChangeLanguage />
      </BottomSheet>
      <BottomSheet ref={purchasingSheetRef}>
        <Purchasing />
      </BottomSheet>
    </NavigationContainer>
  );
};

export const AppNavigator = () => {
  return (
    <>
      <GestureHandlerRootView style={styles.navigationLayout}>
        <RefsProvider>
          <SafeAreaProvider>
            <AppNavigationContainer/>
          </SafeAreaProvider>
        </RefsProvider>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  navigationLayout: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});
