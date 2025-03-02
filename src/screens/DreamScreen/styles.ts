import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from 'styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'space-between',
      gap: 40,
    },
    ImageBackground: {
      width: SIZES.width,
      height: SIZES.height / 1.7,
      position: 'absolute',
      zIndex: -1,
    },
    linearGradient: {
      width: '100%',
      height: SIZES.height / 1.7,
      position: 'absolute',
      zIndex: 0,
    },
    headerTextWrapper: {
      zIndex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      paddingHorizontal: 20,
      zIndex: 3,
      borderRadius: 10,
      backgroundColor: COLORS.blackOpacity,
    },
    contentText: {
      textAlign: 'center',
      color: COLORS.white,
    },
    card: {
      borderBottomWidth: 0.5,
      borderColor: COLORS.cream,
      marginVertical: 10,
      marginHorizontal: 20,
      padding: 20,
      backgroundColor: COLORS.blackOpacity1,
      borderRadius: 20,
      zIndex: 3,
    },
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardTitle: {
      fontSize: SIZES.body2,
      color: COLORS.cream,
    },
    cardSubtitle: {
      color: COLORS.cream,
      fontFamily: FONTS.NotoSerifThin,
    },
    cardDescription: {
      color: COLORS.cream,
      marginTop: 10,
    },
    descriptionTitle: {
      color: COLORS.cream,
      fontWeight: 'bold',
      fontFamily: FONTS.NotoSerifCondensedThin,
    },
    footerWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3,
      paddingBottom: 5,

    },
    footerButton: {
      marginHorizontal: 20,
      zIndex: 3,
    },
  });
