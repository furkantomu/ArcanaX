import React from 'react';
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import TarotSpreadWrapper from './TarotSpreadWrapper';
import {AppProvider} from './TarotContext';

import {getStyles} from './style';
import {COLORS} from '@/styles/theme';
import {useRefsContext} from '@/context';
import {BottomSheet} from '@/components';
import SheetHeader from './components/SheetHeader';
import CartSelection from './components/SelectedCardSheet';
import SheetFooter from './components/SheetFooter';
import CardDetail from './components/CardDetail';

const TarotSpreadScreen = ({route}: any) => {
  const {tarotSpreadScrollViewRef, selectCardSheetRef, detailCardSheetRef} =
    useRefsContext();

  const styles = getStyles();

  return (
    <AppProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{backgroundColor: COLORS.black, flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: COLORS.black}}
          ref={tarotSpreadScrollViewRef}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
              <TarotSpreadWrapper route={route} />
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </ScrollView>
        <BottomSheet ref={selectCardSheetRef}>
          <>
            <SheetHeader route={route} />
            <CartSelection />
            <SheetFooter />
          </>
        </BottomSheet>
        <BottomSheet ref={detailCardSheetRef}>
          <CardDetail />
        </BottomSheet>
      </KeyboardAvoidingView>
    </AppProvider>
  );
};

export default TarotSpreadScreen;
