import React from 'react';
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';

import TarotSpreadWrapper from './TarotSpreadWrapper';
import { AppProvider } from './TarotContext';

import { getStyles } from './style';
import { COLORS } from '@/styles/theme';
import { useRefsContext } from '@/context';
import { BottomSheet } from '@/components';
import SheetHeader from './components/SheetHeader';

import SheetFooter from './components/SheetFooter';
import CardDetail from './components/CardDetail';
import SaveModal from './components/SaveModal';
import CartSelection from './components/CartSelection';
import ActionSheet from '@/components/ActionSheet/ActionSheet';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';

const TarotSpreadScreen = ({ route }: any) => {
  const {
    tarotSpreadScrollViewRef,
    selectCardSheetRef,
    detailCardSheetRef,
    saveTarotSheetRef,
  } = useRefsContext();

  const styles = getStyles();



  const animationConfigs = useBottomSheetSpringConfigs({
    mass: 1,
    stiffness: 420,
    damping: 30,
  });
  return (
    <AppProvider>
      <BottomSheetModalProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ backgroundColor: COLORS.black, flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: COLORS.black }}
            ref={tarotSpreadScrollViewRef}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <TarotSpreadWrapper route={route} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          <BottomSheetModal ref={selectCardSheetRef} detached
            enablePanDownToClose
            animationConfigs={animationConfigs}
            handleStyle={{ backgroundColor: COLORS.darkGray }}
          >
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.cardSelectionSheet}>
                <SheetHeader route={route} />
                <CartSelection />
                <SheetFooter />
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>
          <BottomSheetModal ref={detailCardSheetRef} backgroundStyle={{ backgroundColor: COLORS.black }} detached> 
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
              <CardDetail />
            </BottomSheetScrollView>
          </BottomSheetModal>
          <BottomSheetModal ref={saveTarotSheetRef}>
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
              <SaveModal />
            </BottomSheetScrollView>
          </BottomSheetModal>
        </KeyboardAvoidingView>
      </BottomSheetModalProvider>
    </AppProvider>
  );
};

export default TarotSpreadScreen;
