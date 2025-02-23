import { useCallback, useState } from 'react';
import {View} from 'react-native';
import {
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useAccordion = () => {
    const [layoutHeight, setLayoutHeight] = useState(0);
  const animatedref = useAnimatedRef<View>();
  const isOpened = useSharedValue(false);
  const heightAccordion = useSharedValue(0);


  const animatedheightStyle = useAnimatedStyle(() => ({
    height: withTiming(heightAccordion.value),
  }));

  const handleLayout = useCallback((event: { nativeEvent: { layout: { height: any; }; }; }) => {
    const { height } = event.nativeEvent.layout;
    setLayoutHeight(height);
  }, []);

  const setHeight = () => {
    'worklet';

    heightAccordion.value = !isOpened.value ? layoutHeight : 0;
    isOpened.value = !isOpened.value;
  };
  return {
    animatedref,
    setHeight,
    handleLayout,
    isOpened,
    animatedheightStyle,
  };
};
