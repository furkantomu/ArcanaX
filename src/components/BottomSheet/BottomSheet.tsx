import {Dimensions, StyleSheet, View, BackHandler} from 'react-native';
import React, {JSX, useCallback, useImperativeHandle, useEffect, useMemo} from 'react';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

import {BottomSheetRefProps} from '@/types';
import {COLORS} from '@/styles/theme';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 150;
const COMMON_SNAP_POINT = -SCREEN_HEIGHT / 1.2; // Most commonly used value
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
} as const;

const OPACITY_SPRING_CONFIG = {
  damping: 12,
  stiffness: 200,
} as const;

type BottomSheetProps = {
  children?: JSX.Element | JSX.Element[];
  backgroundColor?: string;
  lineColor?: string;
  onOpen?: () => void;
  onClose?: () => void;
  enableBackdrop?: boolean;
  backdropColor?: string;
  backdropOpacity?: number;
  enableBackHandler?: boolean;
  snapPoints?: number[];
  initialSnapIndex?: number;
  enablePanDownToClose?: boolean;
  gestureEnabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  (
    {
      children,
      backgroundColor = COLORS.black,
      lineColor = COLORS.cream,
      onOpen,
      onClose,
      enableBackdrop = true,
      backdropColor = COLORS.black,
      backdropOpacity = 0.5,
      enableBackHandler = true,
      snapPoints = [0, COMMON_SNAP_POINT],
      initialSnapIndex = 0,
      enablePanDownToClose = true,
      gestureEnabled = true,
      accessibilityLabel = 'Bottom Sheet',
      accessibilityHint = 'Swipe up to expand, swipe down to collapse',
    },
    ref,
  ) => {
    const translateY = useSharedValue(snapPoints[initialSnapIndex]);
    const opacity = useSharedValue(initialSnapIndex > 0 ? 1 : 0);
    const currentSnapIndex = useSharedValue(initialSnapIndex);

    const context = useSharedValue({
      y: 0,
    });

    // Memoize sorted snap points for performance
    const sortedSnapPoints = useMemo(() => 
      [...snapPoints].sort((a, b) => b - a), // Sort descending (most negative first)
    [snapPoints]);

    // Find closest snap point
    const findClosestSnapPoint = useCallback((value: number) => {
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
    }, [sortedSnapPoints]);

    const scrollTo = useCallback(
      (destination: number, callback?: () => void) => {
        'worklet';
        const targetSnapIndex = sortedSnapPoints.indexOf(destination);
        if (targetSnapIndex === -1) return;

        translateY.value = withSpring(destination, SPRING_CONFIG, (finished) => {
          if (finished) {
            currentSnapIndex.value = targetSnapIndex;
            if (callback) {
              runOnJS(callback)();
            }
          }
        });

        const targetOpacity = destination === 0 ? 0 : 1;
        opacity.value = withSpring(targetOpacity, OPACITY_SPRING_CONFIG);

        // Call callbacks
        if (destination === 0 && onClose) {
          runOnJS(onClose)();
        } else if (destination !== 0 && onOpen) {
          runOnJS(onOpen)();
        }
      },
      [translateY, opacity, sortedSnapPoints, onOpen, onClose, currentSnapIndex],
    );

    const scrollToIndex = useCallback(
      (index: number, callback?: () => void) => {
        'worklet';
        if (index >= 0 && index < sortedSnapPoints.length) {
          scrollTo(sortedSnapPoints[index], callback);
        }
      },
      [scrollTo, sortedSnapPoints],
    );

    const close = useCallback((callback?: () => void) => {
      scrollTo(0, callback);
    }, [scrollTo]);

    useImperativeHandle(ref, () => ({
      scrollTo,
      scrollToIndex,
      close,
    }), [scrollTo, scrollToIndex, close]);

    // Handle Android back button
    useEffect(() => {
      if (!enableBackHandler) return;

      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (currentSnapIndex.value > 0) {
          close();
          return true; // Prevent default behavior
        }
        return false; // Allow default behavior
      });

      return () => backHandler.remove();
    }, [enableBackHandler, close, currentSnapIndex]);

    const SWIPE_VELOCITY_THRESHOLD = 1000;
    const gesture = Gesture.Pan()
      .enabled(gestureEnabled)
      .onStart(() => {
        context.value = {
          y: translateY.value,
        };
      })
      .onUpdate(event => {
        const newTranslateY = event.translationY + context.value.y;
        
        // Constrain within bounds
        const minY = Math.min(...sortedSnapPoints);
        const maxY = Math.max(...sortedSnapPoints);
        
        translateY.value = Math.max(Math.min(newTranslateY, maxY), minY);
      })
      .onEnd(event => {
        const isFastSwipe = Math.abs(event.velocityY) > SWIPE_VELOCITY_THRESHOLD;
        
        if (isFastSwipe) {
          if (event.velocityY < 0) {
            // Fast swipe up - go to most expanded state
            scrollTo(sortedSnapPoints[0]);
          } else if (enablePanDownToClose) {
            // Fast swipe down - go to closed state
            scrollTo(0);
          } else {
            // Go to closest snap point
            const closest = findClosestSnapPoint(translateY.value);
            scrollTo(closest);
          }
        } else {
          // Slow gesture - snap to closest point
          const closest = findClosestSnapPoint(translateY.value);
          scrollTo(closest);
        }
      });

    const rBottomSheetStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: translateY.value,
          },
        ],
      };
    }, []);

    const rBackdropStyles = useAnimatedStyle(() => {
      const backdropOpacityInterpolated = interpolate(
        translateY.value,
        [0, MAX_TRANSLATE_Y],
        [0, backdropOpacity],
        Extrapolation.CLAMP,
      );

      return {
        opacity: enableBackdrop ? backdropOpacityInterpolated : 0,
        pointerEvents: translateY.value === 0 ? 'none' : 'auto',
      };
    }, [enableBackdrop, backdropOpacity]);

    const handleBackdropPress = useCallback(() => {
      if (enableBackdrop) {
        close();
      }
    }, [enableBackdrop, close]);

    return (
      <>
        {/* Backdrop */}
        <Animated.View
          style={[styles.backdrop, rBackdropStyles, {backgroundColor: backdropColor}]}
          onTouchEnd={handleBackdropPress}
        />
        
        {/* Bottom Sheet */}
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              styles.container,
              rBottomSheetStyles,
              {backgroundColor: backgroundColor},
            ]}
            accessible={true}
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            >
            <View 
              style={[styles.line, {backgroundColor: lineColor}]}
              accessible={true}
              accessibilityLabel="Drag handle"
              accessibilityHint="Double tap to close bottom sheet"
            />
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  },
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 25,
  },
  container: {
    position: 'absolute',
    height: SCREEN_HEIGHT,
    width: '100%',
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 30,
  },
  line: {
    height: 4,
    width: '40%',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },
});
