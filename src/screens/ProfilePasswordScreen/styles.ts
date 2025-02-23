import {StyleSheet} from 'react-native';
import {COLORS} from 'styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    textField: {
      height: 45,
      color: COLORS.cream,
    },
    form: {
      paddingHorizontal: 20,
      marginTop: 50,
      gap: 20,
    },
    title: {
      fontSize: 25,
    },
    dateContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    day: {
      width: 100,
    },
    month: {
      width: 100,
    },
    year: {
      width: 150,
    },
    securePassword: {},
    passwordVisible: {
      height: 45,
      width: 60,
      position: 'absolute',
      top: 10,
      right: 0,
      justifyContent: 'center',
      alignItems: 'flex-end',
      zIndex: 10,
      paddingRight: 20,
    },
    visibleIcon: {
      tintColor: COLORS.cream,
    },
    message: {
      color: COLORS.red,
      textAlign: 'center',
    },
  });
