import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import DreamWrapper from './DreamWrapper';

import {AppProvider} from './DreamScreenContext';
import {COLORS} from '@/styles/theme';
import {BottomSheet} from '@/components';
import SaveModal from './components/SaveModal';
import {useRefsContext} from '@/context';

const DreamPremiumScreen = () => {
  const {saveDreamSheetRef} = useRefsContext();
  return (
    <AppProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{backgroundColor: COLORS.black, flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: COLORS.black}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
              <DreamWrapper />
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomSheet ref={saveDreamSheetRef}>
        <SaveModal />
      </BottomSheet>
    </AppProvider>
  );
};

export default DreamPremiumScreen;
