import {COLORS, SIZES} from '@/styles/theme';
import {StyleSheet} from 'react-native';
export const CARD_MARGIN = 5;

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    bg: {
      width: SIZES.width,
      height: SIZES.height / 2,
      zIndex: 0,
      position: 'absolute',
    },
    bgWrapper: {
      shadowColor: COLORS.black,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.95,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
  });
