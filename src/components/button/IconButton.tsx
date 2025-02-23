import React, {useCallback} from 'react';
import {Pressable, Text, StyleSheet, View, StyleProp, TextStyle, ViewStyle, ImageStyle} from 'react-native';
import Animated from 'react-native-reanimated';

import {useHaptic, useScaleAnimation} from '@/utils';
import Icon from '../Icon';
import {Icons} from '../Icon/Icons';
import {COLORS} from '@/styles/theme';

type ButtonProps = {
  isDestructive?: boolean;
  text: string;
  handlePress?: () => void;
  variant?: 'primary' | 'secondary';
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  iconName: keyof typeof Icons;
  iconSize: number;
  iconStyle?: StyleProp<ImageStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
};

const getButtonStyles = (isPrimary: boolean, pressed: boolean, buttonStyle?: StyleProp<ViewStyle>) => [
  styles.baseButton,
  isPrimary ? styles.primaryButton : styles.secondaryButton,
  pressed && !isPrimary ? styles.pressedSecondary : null,
  buttonStyle, // Eklenen stil
];

const getTextStyles = (isPrimary: boolean, isDestructive: boolean, textStyle?: StyleProp<TextStyle>) => [
  styles.baseText,
  isPrimary
    ? isDestructive
      ? styles.destructiveText
      : styles.primaryText
    : styles.secondaryText,
  textStyle, // Kullanıcı tarafından gelen ekstra stil
];

export const IconButton = ({
  text,
  isDestructive = false,
  handlePress,
  variant = 'primary',
  disabled = false,
  iconName,
  iconSize,
  iconStyle,
  buttonStyle,
  textStyle,
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
        style={({pressed}) => getButtonStyles(isPrimary, pressed, buttonStyle)}
        {...handlers}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} size={iconSize} style={[iconStyle]} />
        </View>
        <View style={styles.iconTextContainer}>
          <Text style={getTextStyles(isPrimary, isDestructive, textStyle)}>{text}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 13,
    paddingLeft: 10,
    paddingRight: 40,
  },
  primaryButton: {
    backgroundColor: COLORS.cream,
  },
  secondaryButton: {
    backgroundColor: COLORS.blackOpacity,
  },
  pressedSecondary: {
    backgroundColor: '#E5E7EB',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  iconContainer: {
    width: '20%',
  },
  baseText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.16,
    lineHeight: 22,
    textAlign: 'center',
  },
  primaryText: {
    color: COLORS.black,
  },
  secondaryText: {
    color: COLORS.cream,
  },
  destructiveText: {
    color: '#DC2626',
  },
});
