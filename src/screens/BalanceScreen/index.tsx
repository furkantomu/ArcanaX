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
import {CustomHeader} from '@/components';
import {useNavigation} from '@react-navigation/native';

const BalanceScreen = () => {
  const {user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
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
                <CustomHeader leftIcon={true} title={false} rightIcon={false} />
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
