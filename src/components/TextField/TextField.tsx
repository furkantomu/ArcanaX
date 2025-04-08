import React from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {COLORS, FONTS} from '@/styles/theme';
import {TextInputPropsTypes} from '@/types/components/input';

const TextField: React.FC<TextInputPropsTypes> = ({
  inputName,
  label,
  value,
  onChangeText,
  onFocus,
  onBlur,
  handleTextField,
  onLayout,
  placeholder,
  placeholderTextColor,
  secureTextEntry = false,
  errorMessage,
  style,
  selected = false,
  multiline = false,
  numberOfLines = 4,
  keyboardType = 'default',
  maxLength,
  textFieldButton = false,
  textFieldButtonStyle,
  textFieldIconSource,
  textFieldIconStyle,
}) => {
  const styles = getStyles();

  const handleInputChange = (text: string | number) => {
    onChangeText(inputName, text);
  };
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <RNTextInput
        style={[styles.input, style, selected && styles.selectedInput]}
        value={value}
        onChangeText={text => handleInputChange(text)}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || COLORS.blackOpacity1 }
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onLayout={onLayout}
      />
      {textFieldButton && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleTextField}
          style={[
            styles.clearBtn,
            selected && styles.selectedInput,
            textFieldButtonStyle,
          ]}>
          <Image
            resizeMode="contain"
            source={textFieldIconSource}
            style={[styles.icon, textFieldIconStyle]}
          />
        </TouchableOpacity>
      )}

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};
export const getStyles = () =>
  StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    label: {
      marginBottom: 5,
      fontSize: 16,
      color: COLORS.black,
      fontFamily: FONTS.NotoSerifBold,
    },
    input: {
      height: 40,
      borderColor: COLORS.darkGray,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      color: COLORS.black,
      fontFamily: FONTS.NotoSerifBold,
    },
    error: {
      marginTop: 5,
      color: 'red',
      fontSize: 12,
    },
    selectedInput: {
      borderColor: COLORS.darkGray,
    },
    clearBtn: {
      backgroundColor: COLORS.darkGray,
      width: 40,
      height: '100%',
      position: 'absolute',
      right: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRightWidth: 0,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderColor: COLORS.darkGray,
    },
    icon: {
      width: 20,
      height: 20,
      tintColor: COLORS.black,
    },
  });

export default TextField;
