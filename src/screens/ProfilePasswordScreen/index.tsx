import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EditWrapper from './EditWrapper';


import {COLORS} from '@/styles/theme';
import {AppProvider} from './ProfilePasswordScreenContext';
import LinearGradient from 'react-native-linear-gradient';

const ProfilePasswordScreen = () => {
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
        <LinearGradient colors={[COLORS.black, '#3F2305']} style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <SafeAreaView>
                <EditWrapper />
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </AppProvider>
  );
};

export default ProfilePasswordScreen;
