import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {COLORS, SIZES} from '@/styles/theme';
import Login from './Login';
import {useLoginContext} from './LoginContext';
import Register from './Register';

const LoginScreen = () => {
  const height = useSharedValue(0);
  const buttonAnimationStyle = useAnimatedStyle(() => ({
    flex: height.value,
  }));

  const {loginType} = useLoginContext();

  useEffect(() => {
    if (loginType === 'login') {
      height.value = withSpring(1.2, {
        damping: 30,
        stiffness: 200,
      });
    } else {
      height.value = withSpring(4, {
        damping: 50,
        stiffness: 500,
      });
    }
  }, [height, loginType]);

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode={'cover'}
            style={styles.image}
            source={require('../../../assets/login/loginBackground1.webp')}
          />
        </View>

        <Animated.View style={[styles.content, buttonAnimationStyle]}>
          {loginType === 'login' ? <Login /> : <Register />}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: 'transparent', // Arka plan şeffaf kalmalı
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: SIZES.height / 2,
  },
  content: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 4,
    width: '100%',
    backgroundColor: COLORS.cream,
  },
});
