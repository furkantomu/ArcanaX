/* eslint-disable react-native/no-inline-styles */
import {COLORS} from '@/styles/theme';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {AppProvider} from './HistoryScreenContext';
import HistoryWrapper from './HistoryWrapper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader} from '@/components';

const SaveServicesScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });

    return () =>
      navigation.getParent()?.setOptions({
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
      });
  }, [navigation]);
  return (
    <AppProvider>
      <LinearGradient colors={[COLORS.black, '#3F2305']} style={{flex: 1}}>
        <SafeAreaView>
          <CustomHeader leftIcon={true} title={true} rightIcon={true} />
          <HistoryWrapper />
        </SafeAreaView>
      </LinearGradient>
    </AppProvider>
  );
};

export default SaveServicesScreen;
