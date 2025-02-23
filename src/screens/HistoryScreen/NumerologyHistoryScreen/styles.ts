import {COLORS, FONTS, SIZES} from '@/styles/theme';
import {StyleSheet} from 'react-native';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 20,
      paddingTop: 20,
    },
    card: {
      overflow: 'hidden',
      marginHorizontal: 20,
      borderRadius: 20,
    },
    cardButton: {
      flexDirection: 'row',
    },
    textContainer: {
      width: SIZES.width / 2,
      backgroundColor: COLORS.blackOpacity1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 20,
    },
    textContainerIcon: {
      width: 20,
      height: 20,
      tintColor: COLORS.cream,
    },
    imageContainer: {
      width: SIZES.width / 2,
      height: 130,
    },
    title: {
      fontSize: SIZES.body2,
      fontWeight: 'bold',
      color: COLORS.cream,
      textAlign: 'left',
      width: '100%',
      paddingLeft: 20,
    },
    containerTitle: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: 20,
    },
    image: {
      width: '100%',
      height: 130,
    },

    accordionWrapper: {
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundColor: COLORS.blackOpacity1,
      paddingHorizontal: 20,
      width: '100%',
    },
    description: {
      fontSize: SIZES.body3,
      fontWeight: 'bold',
      color: COLORS.cream,
      paddingBottom: 20,
      paddingTop: 20,
    },
    lifePathSection: {
      backgroundColor: COLORS.blackOpacity,
      borderRadius: 10,
      marginBottom: 50,
      paddingVertical: 20,
    },
    lifePathSectionTitle: {
      color: COLORS.cream,
      fontWeight: 'bold',
      fontSize: SIZES.title,
      textAlign: 'center',
    },
    lifePathSectionWrapper: {
      padding: 20,
      gap: 20,
    },
    lifePathSectionAccordionWrapper: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
    lifePathSectionAccordionDescription: {
      color: COLORS.cream,
      fontSize: SIZES.body3,
      marginTop: 10,
    },
    lifePathSectionItem: {
      borderBottomWidth: 1,
      borderColor: COLORS.cream,
      paddingVertical: 10,
      gap: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden',
    },
    lifePathSectionItemLeft: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: 50,
    },
    lifePathSectionItemRight: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    lifePathSectionItemRightIcon: {
      width: 20,
      height: 30,
      tintColor: COLORS.cream,
    },
    lifePathSectionItemTitle: {
      color: COLORS.cream,
      fontSize: SIZES.subTitle,
    },
    lifePathSectionItemDescription: {
      color: COLORS.cream,
      fontSize: SIZES.body3,
    },
    lifePathSectionItemImage: {
      width: 60,
      height: 40,
      borderRadius: 10,
    },
    lifePathSectionAccordion: {
      overflow: 'hidden',
    },
    planetSection: {
      padding: 20,
      gap: 20,
    },
    planetSectionTitle: {
      color: COLORS.white,
      fontSize: SIZES.body1,
      borderBottomWidth: 1,
      borderColor: COLORS.cream,
      marginBottom: 10,
    },
    planetSectionTResult: {
      color: COLORS.gold,
      fontSize: SIZES.body1,
    },
    planetSectionDescription: {
      color: COLORS.cream,
      fontSize: SIZES.body2,
    },
    karmicNumberLabel: {
      color: COLORS.gold,
      fontFamily: FONTS.NotoSerifCondensedMediumItalic,
      fontSize: SIZES.body2,
      textAlign: 'center',
      marginBottom: 10,
    },
  });
