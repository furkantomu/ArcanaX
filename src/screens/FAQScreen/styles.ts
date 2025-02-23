import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from 'styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 20,
      gap: 20,
      marginBottom: 100,
    },
    faqTitle: {
      textAlign: 'center',
    },
    faqAccordion: {
      overflow: 'hidden',
    },
    faqSectionItem: {
      borderBottomWidth: 1,
      borderColor: COLORS.cream,
      paddingVertical: 10,
      gap: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      overflow: 'hidden',
    },
    faqSectionItemLeft: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    faqSectionItemRight: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    faqSectionItemRightIcon: {
      width: 20,
      height: 30,
      tintColor: COLORS.cream,
    },
    faqSectionItemTitle: {
      color: COLORS.gold,
      fontSize: SIZES.body2,
    },
    faqSectionItemItemDescription: {
      color: COLORS.cream,
      fontSize: SIZES.body3,
    },
    faqSectionItemAccordionWrapper: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
    faqSectionAccordionDescription: {
      color: COLORS.cream,
      fontSize: SIZES.body3,
      marginTop: 10,
      textAlign: 'center',
    },
  });
