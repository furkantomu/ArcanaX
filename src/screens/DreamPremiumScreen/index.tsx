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

const DreamPremiumScreen = () => {
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
    </AppProvider>
  );
};

export default DreamPremiumScreen;
