import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import {useDreamContext} from '../DreamScreenContext';

import {getStyles} from '../styles';
import {COLORS} from '@/styles/theme';

const Content = () => {
  const styles = getStyles();
  const {messages, loading} = useDreamContext();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const animatedBadgeStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });

  useEffect(() => {
    if (messages) {
      opacity.value = withDelay(
        300,
        withSpring(1, {damping: 12, stiffness: 100}),
      );
      scale.value = withDelay(
        300,
        withSpring(1, {damping: 12, stiffness: 100}),
      );
    }
  }, [messages, opacity, scale]);

  return (
    <View style={styles.contentContainer}>
      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size={'large'} color={COLORS.cream} />
        </View>
      ) : (
        messages.map((item, idx) => (
          <Animated.View
            style={[styles.resultContainer, animatedBadgeStyle]}
            key={idx}>
            <View
              style={[
                styles.result,
                item.role === 'user'
                  ? styles.selfMessage
                  : styles.otherMessage,
              ]}>
              <Text style={styles.resultText}>{item.content}</Text>
            </View>
          </Animated.View>
        ))
      )}
    </View>
  );
};

export default Content;
