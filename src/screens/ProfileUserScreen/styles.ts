import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from 'styles/theme';

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
      width: SIZES.width * 0.20,
    },
    month: {
      width: SIZES.width * 0.20,
    },
    year: {
      width: SIZES.width * 0.30,
    },
  });
