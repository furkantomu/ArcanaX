import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from 'styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      paddingBottom: 220,
    },
    collapsibleMenu: {
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      gap: 20,
    },
    collapsibleMenuItem: {
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderRadius: 10,
      marginBottom: 20,
    },
    collapsibleMenuItemText: {
      fontSize: SIZES.body2,
      fontFamily: FONTS.NotoSerifCondensedBoldItalic,
      color: COLORS.cream,
    },
    collapsibleMenuContent: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    settingsMenu: {
      zIndex: 3,
      padding: 0,
      borderRadius: 20,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    settingsMenuItem: {
      //backgroundColor: '#212121',
      paddingLeft: 10,

      borderRadius: 10,
      // iOS için gölge
      shadowColor: '#212121',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      // Android için gölge
      elevation: 5,
      margin: 10,
    },
    leftWrapper: {
      width: '9%',
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    rightWrapper: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: COLORS.darkGray,
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    leftIcon: {
      resizeMode: 'cover',
      tintColor: COLORS.cream,
    },
    rightIcon: {
      resizeMode: 'cover',
      tintColor: COLORS.cream,
    },
  });
