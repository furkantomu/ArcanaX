import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from 'styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    ImageBackground: {
      position: 'absolute',
      width: SIZES.width,
      height: SIZES.height,
    },
    flatList: {
      gap: 12,
      paddingHorizontal: (SIZES.width - SIZES.width * 0.7) / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flex: {
      flex: 1,
      backgroundColor: COLORS.cream,
      alignItems: 'center',
    },
    homeContainer: {
      paddingHorizontal: 20,

      position: 'absolute',
      bottom: SIZES.height / 5,
    },
    tarotButton: {
      width: SIZES.width * 0.6,
    },
  });
