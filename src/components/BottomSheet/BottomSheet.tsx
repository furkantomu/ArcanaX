import {Dimensions, StyleSheet, View, BackHandler, useSafeAreaInsets} from 'react-native';
import React, {JSX, useCallback, useImperativeHandle, useEffect, useMemo, useRef} from 'react';
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
  useAnimatedReaction,
  cancelAnimation,
} from 'react-native-reanimated';

import {BottomSheetRefProps} from '@/types';
import {COLORS} from '@/styles/theme';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 150;
const COMMON_SNAP_POINTS = -SCREEN_HEIGHT / 1.2;
const SPRING_CONFIG = {
  damping: 12,
  mass: 1,
  overshootClamping: false,
  restSpeedThreshold: 2,
  restDisplacementThreshold: 2,
} as const;

const OPACITY_SPRING_CONFIG = {
  damping: 14,
  mass: 1,
  overshootClamping: true,
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
      snapPoints = [0, COMMON_SNAP_POINTS],
      initialSnapIndex = 0,
      enablePanDownToClose = true,
      gestureEnabled = true,
      accessibilityLabel = 'Bottom Sheet',
      accessibilityHint = 'Swipe up to expand, swipe down to collapse',
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();
    const translateY = useSharedValue(snapPoints[initialSnapIndex]);
    const opacity = useSharedValue(initialSnapIndex > 0 ? 1 : 0);
    const currentSnapIndex = useSharedValue(initialSnapIndex);
    
    // Track state for proper animation handling
    const isAnimating = useSharedValue(false);
    
    const context = useSharedValue({
      y: 0,
    });

    // Store refs to prevent memory leaks
    const callbackRef = useRef<(() => void) | null>(null);
    const backHandlerRef = useRef<any>(null);

    // Memoize sorted snap points for performance
    const sortedSnapPoints = useMemo(() => {
      const sorted = [...snapPoints].sort((a, b) => a - b); // Sort ascending (most open first)
      return sorted;
    }, [snapPoints]);

    // Memoize open and closed positions
    const openPosition = useMemo(() => sortedSnapPoints[0], [sortedSnapPoints]);
    const closedPosition = useMemo(() => sortedSnapPoints[sortedSnapPoints.length - 1], [sortedSnapPoints]);

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

        // Cancel any ongoing animation
        cancelAnimation(translateY);
        cancelAnimation(opacity);

        isAnimating.value = true;

        translateY.value = withSpring(destination, SPRING_CONFIG, (finished) => {
          if (finished) {
            currentSnapIndex.value = targetSnapIndex;
            isAnimating.value = false;
            if (callback) {
              runOnJS(callback)();
            }
          }
        });

        const targetOpacity = destination === closedPosition ? 0 : 1;
        opacity.value = withSpring(targetOpacity, OPACITY_SPRING_CONFIG);

        // Call callbacks immediately without waiting for animation
        if (destination === closedPosition && onClose) {
          runOnJS(onClose)();
        } else if (destination !== closedPosition && onOpen) {
          runOnJS(onOpen)();
        }
      },
      [translateY, opacity, sortedSnapPoints, onOpen, onClose, currentSnapIndex, closedPosition, isAnimating],
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
      scrollTo(closedPosition, callback);
    }, [scrollTo, closedPosition]);

    useImperativeHandle(ref, () => ({
      scrollTo,
      scrollToIndex,
      close,
    }), [scrollTo, scrollToIndex, close]);

    // Handle Android back button with proper cleanup
    useEffect(() => {
      if (!enableBackHandler) return;

      const handleBackPress = () => {
        if (currentSnapIndex.value > 0) {
          close();
          return true; // Prevent default behavior
        }
        return false; // Allow default behavior
      };

      backHandlerRef.current = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        if (backHandlerRef.current) {
          backHandlerRef.current.remove();
          backHandlerRef.current = null;
        }
      };
    }, [enableBackHandler, close, currentSnapIndex]);

    // Optimize gesture configuration
    const SWIPE_VELOCITY_THRESHOLD = 500;
    const gesture = useMemo(() => {
      return Gesture.Pan()
        .enabled(gestureEnabled)
        .shouldCancelWhenOutside(false)
        .onStart(() => {
          // Cancel any ongoing animation
          cancelAnimation(translateY);
          context.value = {
            y: translateY.value,
          };
        })
        .onUpdate(event => {
          if (isAnimating.value) return; // Prevent gesture during animation

          const newTranslateY = event.translationY + context.value.y;
          
          // Constrain within bounds with overshoot allowed for spring effect
          const minY = Math.min(...sortedSnapPoints);
          const maxY = Math.max(...sortedSnapPoints);
          
          const constrainedY = Math.max(Math.min(newTranslateY, maxY + 50), minY - 50);
          translateY.value = constrainedY;
        })
        .onEnd(event => {
          const isFastSwipe = Math.abs(event.velocityY) > SWIPE_VELOCITY_THRESHOLD;
          const currentY = translateY.value;
          
          if (isFastSwipe) {
            if (event.velocityY < 0) {
              // Fast swipe up - go to most expanded state
              scrollTo(openPosition);
            } else if (enablePanDownToClose && currentY > closedPosition * 0.2) {
              // Fast swipe down - go to closed state
              scrollTo(closedPosition);
            } else {
              // Go to closest snap point
              const closest = findClosestSnapPoint(currentY);
              scrollTo(closest);
            }
          } else {
            // Slow gesture - snap to closest point
            const closest = findClosestSnapPoint(currentY);
            scrollTo(closest);
          }
        });
    }, [gestureEnabled, translateY, sortedSnapPoints, scrollTo, openPosition, closedPosition, enablePanDownToClose, findClosestSnapPoint, isAnimating, context]);

    // Animate styles - prevent unnecessary re-computation
    const rBottomSheetStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: translateY.value,
          },
        ],
      };
    }, []);

    // Animated backdrop with optimized pointer events
    const rBackdropStyles = useAnimatedStyle(() => {
      const backdropOpacityInterpolated = interpolate(
        translateY.value,
        [closedPosition, openPosition],
        [0, backdropOpacity],
        Extrapolation.CLAMP,
      );

      return {
        opacity: enableBackdrop ? backdropOpacityInterpolated : 0,
        pointerEvents: translateY.value >= closedPosition * 0.5 ? 'none' : 'auto',
      };
    }, [enableBackdrop, backdropOpacity, closedPosition, openPosition]);

    const handleBackdropPress = useCallback(() => {
      if (enableBackdrop && !isAnimating.value) {
        close();
      }
    }, [enableBackdrop, close, isAnimating]);

    return (
      <>
        {/* Backdrop with pointer events passthrough when hidden */}
        <Animated.View
          style={[styles.backdrop, rBackdropStyles, {backgroundColor: backdropColor}]}
          onTouchEnd={handleBackdropPress}
          pointerEvents="box-none"
        />
        
        {/* Bottom Sheet with GestureDetector wrapper */}
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              styles.container,
              rBottomSheetStyles,
              {
                backgroundColor: backgroundColor,
                paddingBottom: insets.bottom,
              },
            ]}
            accessible={true}
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            accessibilityRole="adjustable"
          >
            {/* Drag Handle */}
            <View 
              style={[styles.line, {backgroundColor: lineColor}]}
              accessible={true}
              accessibilityLabel="Drag handle"
              accessibilityHint="Double tap to close bottom sheet"
              accessibilityRole="button"
            />
            {/* Content wrapper with safe pass-through for interactions */}
            <View
              style={styles.contentWrapper}
              pointerEvents="box-none"
            >
              {children}
            </View>
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
    width: SCREEN_WIDTH,
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 30,
    overflow: 'hidden',
  },
  line: {
    height: 4,
    width: '40%',
    alignSelf: 'center',
    marginVertical: 12,
    borderRadius: 2,
  },
  contentWrapper: {
    flex: 1,
    pointerEvents: 'box-none',
  },
});
