import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '@/styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    container: {},
    ImageBackground: {
      width: SIZES.width,
      height: SIZES.height / 1.2,
      position: 'absolute',
      resizeMode: 'cover',
    },
    linearGradient: {
      width: SIZES.width,
      height: SIZES.height / 1.2,
      position: 'absolute',
      zIndex: 1,
    },
    content: {
      zIndex: 2,
      paddingHorizontal: 20,
      height: SIZES.height / 1.4,
      justifyContent: 'space-between',
    },
    tokenIcon: {
      resizeMode: 'cover',
      height: 30,
      marginLeft: 10,
      marginRight: 5,
    },
    currentBalance: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {},
    titleText: {
      textAlign: 'center',

    },
    loading: {
      position: 'absolute',
      width: SIZES.width,
      height: SIZES.height,
      zIndex: 99,
      backgroundColor: COLORS.blackOpacity1,
      paddingTop: 200,
    },
    balanceAddWrapper: {
      marginTop: 0,
      gap: 3,
    },
    balanceAdddesc: {
      color: COLORS.silverGray,
    },
    privacy: {

      color: COLORS.silverGray,
      textAlign: 'center',
    },
  });
