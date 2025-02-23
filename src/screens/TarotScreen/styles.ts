import {StyleSheet} from 'react-native';
import { COLORS, FONTS, SIZES } from '@/styles/theme';


export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.black,
    },
    scrollView: {},
    ImageBackground: {
      width: SIZES.width,
      height: SIZES.height / 2,
      position: 'absolute',
    },
    linearGradient: {
      width: SIZES.width,
      height: SIZES.height / 2,
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
    cardImage: {
      width: 60,
      height: 80,
      marginRight: 20,
    },
    rightArrows: {
      width: 60,
      height: 10,
      marginBottom: 10,
      tintColor: COLORS.cream,
    },

    content: {
      paddingHorizontal: 20,
      paddingBottom: 100,
    },
    title: {
      fontSize: SIZES.title,
      color: COLORS.cream,
      fontFamily: FONTS.NotoSerifThin,
      textAlign: 'center',
    },
    description: {
      fontSize: SIZES.body4,
      color: COLORS.cream,
      textAlign: 'center',
      marginTop: 30,
    },
    subTitle: {
      fontSize: SIZES.subTitle,
      color: COLORS.cream,
      marginTop: 30,
      fontFamily: FONTS.NotoSerifCondensedMediumItalic,
    },
    loading: {
      marginTop: 50,
    },
    card: {
      borderBottomWidth: 0.5,
      borderColor: COLORS.cream,
      marginVertical: 10,
      padding: 20,
      backgroundColor: COLORS.darkGray,
      borderRadius: 20,
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
  });
