import { CustomHeader } from '@/components';
import {COLORS} from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AppProvider} from './DreamScreenContext';

import DreamWrapper from './DreamWrapper';

const DreamScreen = () => {
  const navigation = useNavigation();

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{backgroundColor: COLORS.black, flex: 1}}>
            <CustomHeader leftIcon={true} title={false} rightIcon={true} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: COLORS.black}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <SafeAreaView style={{flex: 1}}>
                <DreamWrapper/>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppProvider>
  );
};

export default DreamScreen;
