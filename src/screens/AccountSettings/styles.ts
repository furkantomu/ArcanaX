import {StyleSheet} from 'react-native';
import {COLORS} from 'styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    settingsMenuItem: {
      backgroundColor: '#212121',
      paddingRight: 10,
      borderRadius: 10,
      // iOS için gölge
      shadowColor: '#212121',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      // Android için gölge
      elevation: 5,
      marginHorizontal: 20,
      paddingVertical: 20,
    },
    menuItems: {
      gap: 10,
      marginHorizontal: 20,
    },
    menuItem: {},
    accountDelete: {
      marginTop: 20,
    },
  });
