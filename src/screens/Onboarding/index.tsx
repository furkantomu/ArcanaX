import React from 'react';

import {AppProvider} from './OnboardingContext';
import FlatListRender from './FlatListRender';
import {KeyboardAvoidingView, Platform} from 'react-native';

function Onboarding() {
  return (
    <AppProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}>
        <FlatListRender />
      </KeyboardAvoidingView>
    </AppProvider>
  );
}

export default Onboarding;
