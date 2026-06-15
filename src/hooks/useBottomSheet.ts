import {useCallback, useRef, useEffect} from 'react';
import Animated, {
  useSharedValue,
  cancelAnimation,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

/**
 * useBottomSheetAnimation Hook
 * Manages Bottom Sheet animation state with proper cleanup
 * Prevents memory leaks and ensures smooth animations
 */
export const useBottomSheetAnimation = (
  snapPoints: number[],
  initialIndex: number,
  onOpen?: () => void,
  onClose?: () => void,
) => {
  const translateY = useSharedValue(snapPoints[initialIndex]);
  const opacity = useSharedValue(initialIndex > 0 ? 1 : 0);
  const currentSnapIndex = useSharedValue(initialIndex);
  const isAnimating = useSharedValue(false);
  
  const callbackRef = useRef<(() => void) | null>(null);

  // Sort snap points for consistent ordering
  const sortedSnapPoints = useRef(
    [...snapPoints].sort((a, b) => a - b),
  ).current;

  const openPosition = sortedSnapPoints[0];
  const closedPosition = sortedSnapPoints[sortedSnapPoints.length - 1];

  // Find closest snap point efficiently
  const findClosestSnapPoint = useCallback(
    (value: number) => {
      'worklet';
      let closestPoint = sortedSnapPoints[0];
      let minDistance = Math.abs(value - closestPoint);

      for (let i = 1; i < sortedSnapPoints.length; i++) {
        const distance = Math.abs(value - sortedSnapPoints[i]);
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = sortedSnapPoints[i];
        }
      }

      return closestPoint;
    },
    [sortedSnapPoints],
  );

  // Cleanup animation callback
  const clearCallback = useCallback(() => {
    callbackRef.current = null;
  }, []);

  // Cancel all animations
  const cancelAllAnimations = useCallback(() => {
    cancelAnimation(translateY);
    cancelAnimation(opacity);
  }, [translateY, opacity]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAllAnimations();
      clearCallback();
    };
  }, [cancelAllAnimations, clearCallback]);

  return {
    translateY,
    opacity,
    currentSnapIndex,
    isAnimating,
    sortedSnapPoints,
    openPosition,
    closedPosition,
    findClosestSnapPoint,
    cancelAllAnimations,
    callbackRef,
  };
};

/**
 * useBottomSheetGestureContext Hook
 * Manages gesture context state
 */
export const useBottomSheetGestureContext = () => {
  const context = useSharedValue({
    y: 0,
  });

  return context;
};

/**
 * useBottomSheetBackHandler Hook
 * Manages Android back button handling with cleanup
 */
export const useBottomSheetBackHandler = (
  enabled: boolean,
  currentSnapIndex: Animated.Shared<number>,
  close: () => void,
) => {
  const backHandlerRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled) return;

    const {BackHandler} = require('react-native');

    const handleBackPress = () => {
      if (currentSnapIndex.value > 0) {
        close();
        return true;
      }
      return false;
    };

    backHandlerRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      if (backHandlerRef.current) {
        backHandlerRef.current.remove();
        backHandlerRef.current = null;
      }
    };
  }, [enabled, currentSnapIndex, close]);

  return backHandlerRef;
};
