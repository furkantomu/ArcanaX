import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '@/styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.black,
    },
    scrollView: {},
    safeAreaView: {
      zIndex: 2,
    },
    ImageBackground: {
      width: SIZES.width,
      height: SIZES.height / 2,
      position: 'absolute',
    },
    linearGradient: {
      width: SIZES.width,
      height: SIZES.height / 2,
      position: 'absolute',
      zIndex: 1,
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
      paddingTop: SIZES.height / 4,
      paddingHorizontal: 20,
    },
    title: {
      textAlign: 'center',
    },
    description: {
      textAlign: 'center',
      marginTop: 30,
      zIndex: 2,
    },
    subTitle: {
      marginTop: 30,
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
    priceWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginTop: 20,
    },
    cardTitle: {
      color: COLORS.cream,
    },
    cardSubtitle: {
      color: COLORS.cream,
    },
    cardDescription: {
      color: COLORS.cream,
      marginTop: 10,
    },
    descriptionTitle: {
      color: COLORS.cream,
    },
  });
