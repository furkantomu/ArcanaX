import React, { useEffect } from 'react';
import { Image, ScrollView, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Wrapper from './Wrapper';

import { AppProvider } from './NumerologyPremiumContext';
import { useRefsContext } from '@/context';

import { getStyles } from './styles';
import { COLORS } from '@/styles/theme';
import SaveModal from './components/SaveModal';
import { BottomSheetModal, BottomSheetModalProvider, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';

const NumerologyPremiumScreen = () => {
  const navigation = useNavigation();
  const { lifePathAccordionScrollViewRef, saveNumerologySheetRef } = useRefsContext();

  const styles = getStyles();
  const bg = require('../../../assets/background/bg4.webp');

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' },
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
  const animationConfigs = useBottomSheetSpringConfigs({
    mass: 1,
    stiffness: 420,
    damping: 30,
  });
  return (
    <AppProvider>
      <BottomSheetModalProvider>
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
        <BottomSheetModal ref={saveNumerologySheetRef} enablePanDownToClose
          animationConfigs={animationConfigs}>
          <SaveModal />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </AppProvider>
  );
};
export default NumerologyPremiumScreen;
