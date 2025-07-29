import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '@/styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      backgroundColor: COLORS.black,
    },
    header:{
      justifyContent: "flex-end",
      alignItems: 'flex-end',
      paddingRight: 20,
      marginVertical: 20,
      zIndex: 99,
      position:'relative',
    },
    closeButton: {
      borderWidth: 1,
      borderColor: COLORS.silverGray,
      width: 45,
      height: 45,
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: COLORS.black,
    },
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
      flex: 1,
      justifyContent: "flex-end",
      alignItems: 'center',
      gap: 40,
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
      justifyContent: 'center',
      paddingLeft: 10,
    },
    title: {
    },
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
      paddingLeft: 10,
      justifyContent:'center',
      alignItems: 'center',
    },
    balanceAdddesc: {
      color: COLORS.silverGray,
    },
    privacy: {
      color: COLORS.silverGray,
      textAlign: 'center',
    },
  });
