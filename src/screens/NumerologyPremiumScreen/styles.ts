import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from 'styles/theme';

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
    content: {
      gap: 20,
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
      fontSize: SIZES.body3,
      fontWeight: 'bold',
      color: COLORS.cream,
      textAlign: 'left',
      width: '100%',
      paddingLeft: 20,
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
    loading: {
      height: 50,
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
    planetSection: {
      padding: 20,
      gap: 20,
    },
    planetSectionTitle: {
      color: COLORS.white,
      fontSize: SIZES.body2,
      borderBottomWidth: 1,
      borderColor: COLORS.cream,
      marginBottom: 10,
    },
    planetSectionTResult: {
      color: COLORS.gold,
      fontSize: SIZES.body2,
    },
    lifePathSectionTitle: {
      color: COLORS.cream,
      fontWeight: 'bold',
      fontSize: SIZES.body2,
      textAlign: 'center',
    },
    karmicNumberLabel: {
      color: COLORS.gold,
     
      fontSize: SIZES.body2,
      textAlign: 'center',
      marginBottom: 10,
    },
    lifePathSectionWrapper: {
      padding: 20,
      gap: 20,
    },
    lifePathSectionAccordion: {
      overflow: 'hidden',
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
    footer: {
      paddingHorizontal: 20,
    },
    footerButton: {
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.cream,
      marginHorizontal: 20,
      borderRadius: 10,
    },
    saveButton: {
      height: 50,
      marginBottom: 5,
    },
    footerButtonText: {
      color: COLORS.black,
      fontSize: SIZES.body3,

    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingHorizontal: 30,
      backgroundColor: 'white',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      zIndex: 33,
    },
    modalTitle: {
      color:COLORS.black,
    },
    input: {
      borderBottomWidth: 1,
      marginVertical: 10,
      padding: 5,
      fontFamily: FONTS.NotoSerifBold,
    },
    modalButton: {
      width: '100%',
    },
    button: {
      width: '100%',
    },
  });
