import React, {useEffect} from 'react';
import {View} from 'react-native';

import Header from './components/Header';
import Content from './components/Content';
import AnimatedContent from './components/AnimatedContent';
import FooterButton from './components/FooterButton';

import {getStyles} from './styles';
import {CustomHeader} from '@/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '@/styles/theme';

const DreamWrapper = () => {
  const styles = getStyles();

  const translateY = useSharedValue(50);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    translateY.value = withDelay(
      200,
      withSpring(0, {damping: 12, stiffness: 100}),
    );
    scale.value = withDelay(
      200, // Her kart için gecikme
      withSpring(1, {damping: 10, stiffness: 100}),
    );
  }, [scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}, {scale: scale.value}],
    };
  });

  return (
    <View>
      <Animated.Image
        source={require('../../../assets/background/dream.webp')}
        style={[styles.ImageBackground, animatedStyle]}
        resizeMode={'contain'}
      />
      <LinearGradient
        colors={[COLORS.black, COLORS.blackOpacity, COLORS.black]}
        style={styles.linearGradient}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        locations={[0.15, 0.5, 0.9]}
      />
      <SafeAreaView style={styles.container}>
        <CustomHeader leftIcon={true} title={false} rightIcon={true} />
        <Header />
        <Content />
        <AnimatedContent />
        <FooterButton />
      </SafeAreaView>
    </View>
  );
};

export default DreamWrapper;
