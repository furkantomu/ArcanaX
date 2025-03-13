import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from 'styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    ImageBackground: {
      width: SIZES.width,
      height: SIZES.height / 2.5,
      position: 'absolute',
      zIndex: -1,
    },
    linearGradient: {
      width: SIZES.width,
      height: SIZES.height / 2.5,
      zIndex: 0,
      position: 'absolute',
    },
    headerTextWrapper: {
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,

    },
    profileInfoSection: {
      zIndex: 3,
      maxWidth: '90%',
      overflow: 'hidden',
      //backgroundColor:'#a5a5a33d',
      backgroundColor: COLORS.blackOpacity1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 20,
      gap: 10,
      borderRadius: 10,
      marginTop: 20,
    },
    profileImage: {},
    profileIcon: {tintColor: COLORS.cream},
    profileName: {
      width: '60%',
    },
    profileEdit: {},
    editIcon: {
      tintColor: COLORS.cream,
    },
    editButton: {backgroundColor: 'transparent', width: 40},
    settingsMenu: {
      zIndex: 3,
      marginTop: SIZES.height / 4.5,
      marginHorizontal: 20,
      gap: 30,
      backgroundColor: COLORS.darkGray,
      padding: 10,
      borderRadius: 10,
      marginBottom: 80,
    },
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
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftWrapper: {
      width: '9%',
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    rightWrapper: {
      width: '88%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
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
    tokenIcon: {
      resizeMode: 'cover',
      width: 25,
    },
  });
