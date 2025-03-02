import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from 'styles/theme';

const imageWidth = SIZES.width * 0.5;
const imageHeight = imageWidth * 1.4;

export const getStyles = () =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingBottom:10,
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
    },
    collapsibleMenuItemText: {
      fontSize: 20,
      fontFamily: FONTS.NotoSerifCondensedBoldItalic,
      color: COLORS.cream,
    },
    collapsibleMenuContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 0,
      rowGap: 20,
    },
    cardImage: {
      width: imageWidth,
      height: imageHeight,
    },
    descriptionContainer: {
      paddingHorizontal: 20,
      gap: 30,
    },
    title: {
      color: COLORS.silverGray,
    },
    margin: {
      marginTop: 10,
    },
    loading: {
      marginTop: 100,
    },
  });
