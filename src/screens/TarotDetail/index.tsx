import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {CustomHeader} from '@/components';
import TarotDetailWrapper from './TarotDetailWrapper';

import {COLORS} from '@/styles/theme';
import {AppProvider} from './TarotDetailScreenContext';

const TarotDetail = () => {
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
        <SafeAreaView style={{flex: 1}}>
        <CustomHeader leftIcon={true} title={false} rightIcon={true} />
          <TarotDetailWrapper />
        </SafeAreaView>
      </LinearGradient>
    </AppProvider>
  );
};

export default TarotDetail;
