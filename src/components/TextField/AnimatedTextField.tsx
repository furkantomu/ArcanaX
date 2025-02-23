import {COLORS, FONTS} from '@/styles/theme';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';

type Props = React.ComponentProps<typeof TextInput> & {
  label: string;
  errorText?: string | null;
};

const AnimatedTextField: React.FC<Props> = props => {
  const {label, errorText, value, style, onBlur, onFocus, ...restOfProps} =
    props;
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  let borderColor = isFocused ? COLORS.cream : 'transparent';
  let bgColor = isFocused ? COLORS.cream : 'transparent';
  let labelColor = isFocused ? COLORS.black : COLORS.silverGray;

  if (errorText) {
    borderColor = '#B00020';
  }

  return (
    <View style={style}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: borderColor,
          },
        ]}
        ref={inputRef}
        {...restOfProps}
        value={value}
        onBlur={event => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={event => {
          setIsFocused(true);
          onFocus?.(event);
        }}
      />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, -12],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
          ]}>
          <Text
            style={[
              styles.label,
              {backgroundColor: bgColor, color: labelColor},
            ]}>
            {label}
            {errorText ? '*' : ''}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 24,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    backgroundColor: COLORS.blackOpacity1,
    color: COLORS.cream,
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 8,
  },
  label: {
    fontFamily: FONTS.NotoSerifBold,
    fontSize: 16,
    backgroundColor: COLORS.cream,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: COLORS.openRed,
  },
});

export default AnimatedTextField;
