import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from 'styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    bg: {
      width: SIZES.width,
      height: SIZES.height,
      position: 'absolute',
      zIndex: 0,
    },
    headerWrapper: {},
    headerTitle: {
      textAlign: 'center',
    },
    headerNameInfo: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
    },
    headerNameInfoText: {
      backgroundColor: COLORS.darkGray,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    cardContainer: {
      gap: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    card: {
      width: SIZES.width / 2.2,
      height: 230,
      backgroundColor: COLORS.darkGray,
      borderRadius: 20,
    },
    cardImage: {
      height: 200,
      borderRightWidth: 1,
    },
    image: {
      width: '100%',
      maxHeight: '100%',
    },
    cardText: {
      textAlign: 'center',
      marginTop: 5,
    },
    footer: {
      marginTop: 40,
    },
    footerWrapper: {
      bottom: 0,
      height: '100%',
      width: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: COLORS.blackOpacity1,
      paddingHorizontal: 20,
      paddingTop: 40,
      gap: 20,
    },
    description: {
      color: COLORS.cream,
      textAlign: 'center',
    },
    descriptionPremiumButton: {
      backgroundColor: COLORS.darkGray,
      padding: 20,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    descriptionPremiumButtonIcon: {
      width: 50,
      height: 50,
    },
    descriptionPremiumText: {
      textAlign: 'center',
      paddingHorizontal: 30,
      color: COLORS.cream,
    },
  });
