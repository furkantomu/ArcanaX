import {COLORS, SIZES} from '@/styles/theme';
import {StyleSheet} from 'react-native';
export const CARD_MARGIN = 5;

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerGradient: {
      height: SIZES.height / 1.5,
      width: SIZES.width,
      zIndex: 1,
      position: 'absolute',
    },
    bg: {
      width: '100%',
      height: SIZES.height / 1.5,
      resizeMode: 'cover',
      shadowColor: COLORS.black,
      zIndex: 0,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.95,
      shadowRadius: 3.84,
      elevation: 5,
      position: 'absolute',
    },
    footer: {
      marginHorizontal: 20,
      marginTop: 40,
      gap: 20,
    },
    footerTitle: {
      textAlign: 'center',
    },
  });
