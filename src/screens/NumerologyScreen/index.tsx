import React, {useEffect} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Content from './components/Content';

import {getStyles} from './styles';
import {AppProvider} from './NumerologyContext';
import {COLORS} from '@/styles/theme';
import { CustomHeader } from '@/components';

const NumerologyScreen = () => {
  const navigation = useNavigation();
  const styles = getStyles();
  const bg = require('../../../assets/background/bg4.webp');

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

  return (
    <AppProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{backgroundColor: COLORS.black, flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.container}>
          <CustomHeader leftIcon={true} title={false} rightIcon={true} />
            <Image source={bg} resizeMode={'cover'} style={styles.bg} />
            <Content />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AppProvider>
  );
};
export default NumerologyScreen;
