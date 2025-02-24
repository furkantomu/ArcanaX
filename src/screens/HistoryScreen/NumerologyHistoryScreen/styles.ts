import {COLORS, SIZES} from '@/styles/theme';
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
      borderBottomWidth: 1,
      borderColor: COLORS.cream,
      marginBottom: 10,
    },
    planetSectionResult: {
      color: COLORS.gold,

    },

    karmicNumberLabel: {
      color: COLORS.gold,
      textAlign: 'center',
      marginBottom: 10,
    },
  });
