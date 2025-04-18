import {StyleSheet} from 'react-native';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,

    },
    wrapper: {
      flex: 1,
      paddingHorizontal: 20,
      gap: 20,
    },
    header: {
      marginTop: 20,
      borderRadius: 20,
  
    },
    headerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      paddingRight: 20,
    },
    headerIcon: {
      resizeMode: 'cover',
      width: 50,
      height: 50,
      marginRight: 20,
    },
  });
