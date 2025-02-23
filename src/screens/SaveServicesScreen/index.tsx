/* eslint-disable react-native/no-inline-styles */
import {COLORS} from '@/styles/theme';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {AppProvider} from './HistoryScreenContext';
import HistoryWrapper from './HistoryWrapper';

const SaveServicesScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });

    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: '',
          position: 'absolute',
          backgroundColor: COLORS.blackOpacity,
          borderRadius: 50,
          borderTopWidth: 0,
          marginHorizontal: 30,
          marginVertical: 20,
          height: 50,
        },
      });
  }, [navigation]);
  return (
    <AppProvider>
      <LinearGradient colors={[COLORS.black, '#3F2305']} style={{flex: 1}}>
        <HistoryWrapper />
      </LinearGradient>
    </AppProvider>
  );
};

export default SaveServicesScreen;
