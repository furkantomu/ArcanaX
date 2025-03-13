import React, {useCallback} from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import {useHaptic, useScaleAnimation} from '@/utils';
import Icon from '../Icon';
import {Icons} from '../Icon/Icons';
import {COLORS, FONTS, SIZES} from '@/styles/theme';
import Typography from '../Typography/Typography';

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

const getButtonStyles = (
  isPrimary: boolean,
  pressed: boolean,
  buttonStyle?: StyleProp<ViewStyle>,
) => [
  styles.baseButton,
  isPrimary ? styles.primaryButton : styles.secondaryButton,
  pressed && !isPrimary ? styles.pressedSecondary : null,
  buttonStyle, // Eklenen stil
];

const getTextStyles = (
  isPrimary: boolean,
  isDestructive: boolean,
  textStyle?: StyleProp<TextStyle>,
) => [
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
          <Typography
            style={getTextStyles(isPrimary, isDestructive, textStyle)}>
            {text}
          </Typography>
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
    justifyContent:'center',
    borderRadius: 13,
    paddingHorizontal: 10,
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
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
  },
  baseText: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    fontFamily: FONTS.NotoSerifBold,
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
