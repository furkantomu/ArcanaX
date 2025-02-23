import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AppProvider} from './ProfileScreenContext';

import ProfileWrapper from './ProfileWrapper';

import {COLORS} from '@/styles/theme';

const ProfileScreen = () => {
  return (
    <AppProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{backgroundColor: COLORS.black, flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
              <ProfileWrapper/>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppProvider>
  );
};

export default ProfileScreen;


