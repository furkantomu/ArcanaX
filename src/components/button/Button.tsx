import React, {useCallback} from 'react';
import {Pressable, StyleProp, StyleSheet, TextStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {useHaptic, useScaleAnimation} from '@/utils';
import {FONTS, SIZES} from '@/styles/theme';

type ButtonProps = {
  isDestructive?: boolean;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  handlePress?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  buttonStyle?: object;
};

export const Button = ({
  text,
  textStyle,
  isDestructive = false,
  handlePress,
  variant = 'primary',
  disabled = false,
  buttonStyle,
}: ButtonProps) => {
  const {handlers, animatedStyle} = useScaleAnimation();
  const haptic = useHaptic(isDestructive ? 'medium' : 'soft');

  const handleButtonPress = useCallback(() => {
    if (!disabled) {
      haptic?.();
      handlePress?.();
    }
  }, [disabled, handlePress, haptic]);

  const isPrimary = variant === 'primary';

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handleButtonPress}
        disabled={disabled}
        accessible
        accessibilityRole="button"
        accessibilityState={{disabled}}
        style={({pressed}) => [
          styles.baseButton,
          isPrimary ? styles.primaryButton : styles.secondaryButton,
          pressed && !isPrimary ? styles.pressedSecondary : {},
          disabled && styles.disabledButton,
          buttonStyle,
        ]}
        {...handlers}>
        <Animated.Text
          style={[
            styles.baseText,
            textStyle,
            isPrimary
              ? isDestructive
                ? styles.primaryDestructiveText
                : styles.primaryText
              : isDestructive
              ? styles.secondaryDestructiveText
              : styles.secondaryText,
          ]}>
          {text}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 11,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#1E40AF', // bg-blue-800
  },
  secondaryButton: {
    backgroundColor: '#F9FAFB', // bg-gray-50
  },
  pressedSecondary: {
    backgroundColor: '#E5E7EB', // bg-gray-100 (pressed effect)
  },
  disabledButton: {
    opacity: 0.5,
  },
  baseText: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    letterSpacing: 0.16,
    lineHeight: 22,
    fontFamily: FONTS.NotoSerifBold,
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF', // text-white
  },
  primaryDestructiveText: {
    color: '#DC2626', // text-tomato-800
  },
  secondaryText: {
    color: '#111827', // text-gray-950
    fontFamily: FONTS.NotoSerifBold,
  },
  secondaryDestructiveText: {
    color: '#9B111E', // text-ruby-800
  },
});
