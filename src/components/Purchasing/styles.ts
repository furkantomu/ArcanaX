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
      paddingVertical: 20,
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
    title: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    },
    titleText: {
      textAlign: 'center',
    },
    productList: {
      gap: 10,
      marginTop: 20,
    },
    productListItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderRadius: 10,
      borderBottomWidth: 0.5,
      borderColor: COLORS.cream,
    },
    productListItemIcon: {
      resizeMode: 'cover',
      height: 40,
      width: 40,
    },
    productListItemDescription: {
      marginLeft: 20,
    },
    productDescription: {
      color: COLORS.silverGray,
    },
    loading: {
      position: 'absolute',
      width:SIZES.width,
      height: SIZES.height,
      zIndex: 99,
      backgroundColor:COLORS.blackOpacity1,
      paddingTop: 200,
    },
  });
