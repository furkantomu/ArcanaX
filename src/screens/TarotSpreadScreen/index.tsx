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
import {AppProvider} from './TarotContext';

import {getStyles} from './style';
import {COLORS} from '@/styles/theme';
import {useRefsContext} from '@/context';
import {BottomSheet} from '@/components';
import SheetHeader from './components/SheetHeader';

import SheetFooter from './components/SheetFooter';
import CardDetail from './components/CardDetail';
import SaveModal from './components/SaveModal';
import CartSelection from './components/CartSelection';

const TarotSpreadScreen = ({route}: any) => {
  const {
    tarotSpreadScrollViewRef,
    selectCardSheetRef,
    detailCardSheetRef,
    saveTarotSheetRef,
  } = useRefsContext();

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
            <View>
              <TarotSpreadWrapper route={route} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <BottomSheet ref={selectCardSheetRef}>
          <View style={styles.cardSelectionSheet}>
            <SheetHeader route={route} />
            <CartSelection />
            <SheetFooter />
          </View>
        </BottomSheet>
        <BottomSheet ref={detailCardSheetRef}>
          <CardDetail />
        </BottomSheet>
        <BottomSheet ref={saveTarotSheetRef}>
          <SaveModal />
        </BottomSheet>
      </KeyboardAvoidingView>
    </AppProvider>
  );
};

export default TarotSpreadScreen;
