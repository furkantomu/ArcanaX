import React, {useEffect} from 'react';
import {Image, ScrollView, SafeAreaView} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Wrapper from './Wrapper';

import {AppProvider} from './NumerologyPremiumContext';
import {useRefsContext} from '@/context';

import {getStyles} from './styles';
import { COLORS } from '@/styles/theme';

const NumerologyPremiumScreen = () => {
  const navigation = useNavigation();
  const {lifePathAccordionScrollViewRef} = useRefsContext();
  const styles = getStyles();
  const bg = require('../../../assets/background/bg4.webp');

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
      <SafeAreaView style={styles.container}>
        <Image
          source={bg}
          resizeMode={'cover'}
          style={styles.bg}
          blurRadius={10}
        />
        <ScrollView ref={lifePathAccordionScrollViewRef}>
          <Wrapper />
        </ScrollView>
      </SafeAreaView>
    </AppProvider>
  );
};
export default NumerologyPremiumScreen;
