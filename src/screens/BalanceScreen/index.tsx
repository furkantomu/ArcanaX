import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Wrapper from './Wrapper';
import {AppProvider} from './BalanceScreenContext';

import {COLORS} from '@/styles/theme';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {balanceActions} from '@/store/balance/balanceActions';

const BalanceScreen = () => {
  const {user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(balanceActions.getBalance({accountId: String(user?.accountId)}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AppProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{backgroundColor: COLORS.black, flex: 1}}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <LinearGradient colors={[COLORS.black, '#3F2305']} style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <SafeAreaView>
                <Wrapper />
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </AppProvider>
  );
};

export default BalanceScreen;
