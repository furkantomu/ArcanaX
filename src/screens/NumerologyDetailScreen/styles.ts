import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from 'styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: SIZES.height * 0.05,
    },
    bg: {
      width: SIZES.width,
      height: SIZES.height,
      position: 'absolute',
      zIndex: 0,
    },
    headerWrapper: {
      marginTop: 70,
    },
    headerTitle: {
      textAlign: 'center',
      fontSize: SIZES.title,
      color: COLORS.cream,
    },
    headerNameInfo: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
    },
    headerNameInfoText: {
      color: COLORS.cream,
      fontSize: SIZES.body2,
      backgroundColor:COLORS.darkGray,
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
      fontSize: SIZES.body2,
      color: COLORS.cream,
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
      paddingVertical: 30,
      gap: 20,
    },
    description: {
      color: COLORS.cream,
      fontSize: SIZES.body3,
      textAlign:'center',
    },
    descriptionPremiumButton: {
      backgroundColor:COLORS.darkGray,
      padding: 20,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
     
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
