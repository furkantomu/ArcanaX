import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '@/styles/theme';

const imageWidth = SIZES.width * 0.25;
const imageHeight = imageWidth * 1.4;

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundContent: {
      position: 'relative',
      height: SIZES.height / 3,
      paddingHorizontal: 20,
      zIndex: 3,
    },
    tarotSpreadBG: {
      width: SIZES.width,
      position: 'absolute',
      height: SIZES.height / 1.5,
      zIndex: 0,
    },
    linearGradient: {
      position: 'absolute',
      width: SIZES.width,
      height: SIZES.height / 1.5,
      zIndex: 1,
    },
    title: {
      textAlign: 'center',
    },
    info: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    infoTitle: {
      textAlign: 'center',
    },

    content: {
      zIndex: 1,
      paddingHorizontal: 10,
    },
    cardBgContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'relative',
      marginTop: 50,
    },
    cardBg: {
      width: 120,
      height: 150,
    },
    buttons: {
      paddingHorizontal: 10,
      alignItems: 'center',
      zIndex: 2,

      paddingTop: 50,
    },
    imageContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    subTitle: {
      fontSize: SIZES.body2,
      color: COLORS.cream,
      fontFamily: FONTS.NotoSerifCondensedBoldItalic,
      textAlign: 'center',
      marginBottom: 20,
    },
    rightArrows: {
      width: 100,
      height: 50,
      tintColor: COLORS.cream,
    },
    triquetra: {
      width: 50,
      height: 50,
      tintColor: COLORS.cream,
      transform: [{rotateZ: '180deg'}],
      marginHorizontal: 20,
    },
    leftArrows: {
      width: 100,
      height: 50,
      tintColor: COLORS.cream,
      transform: [{rotateZ: '180deg'}],
    },
    flatList: {
      gap: 12,
      //paddingHorizontal: (SIZES.width - SIZES.width * 0.7) / 2,
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: imageHeight * 1.5,
      width: 'auto',
    },
    scrollInfo: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    cardContainer: {
      zIndex: 3,
    },
    card: {
      width: imageWidth,
      height: imageHeight,
    },
    scrollInfoRightArrows: {
      tintColor: COLORS.cream,
      width: 80,
      height: 10,
    },
    rotate: {
      transform: [{rotateZ: '180deg'}],
    },
    scrollInfoText: {
      color: COLORS.cream,
      marginHorizontal: 20,
    },
    cardSelectionSheet: {
      justifyContent: 'space-between',
      height: SIZES.height / 1.5,
    },
    bottomSheetHeader: {
      alignItems: 'center',
      gap: 50,
      paddingHorizontal: 10,
    },
    bottomSheetText: {
      marginTop: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      paddingHorizontal: 20,
      gap: 5,
    },
    bottomSheetButtonText: {
      fontWeight: 600,
      fontFamily: FONTS.NotoSerifBold,
      fontSize: SIZES.body3,
      color: COLORS.cream,
    },
    regularCard: {
      position: 'absolute',
      zIndex: 1,
      backfaceVisibility: 'hidden',
    },
    spinningCard: {
      width: SIZES.width * 0.5,
      height: imageWidth * 2.7,
      zIndex: 3,
    },
    flippedCard: {
      backfaceVisibility: 'hidden',
      zIndex: 2,
    },
    cardRevealbackgroundContent: {
      paddingBottom: 50,
      zIndex: 2,
    },
    cardRevealHeader: {
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardRevealHeaderText: {
      color: COLORS.cream,
      fontSize: SIZES.body3,
    },
    isFlippedAllButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    isFlippedAllButton: {
      marginTop: 20,
      borderWidth: 0.5,
      width: SIZES.width / 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      paddingVertical: 10,
      backgroundColor: COLORS.blackOpacity1,
      borderColor: COLORS.black,
    },
    spinningCardFlatList: {
      gap: 10,
      //paddingHorizontal: (SIZES.width - SIZES.width * 0.7) / 2,
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: imageWidth * 3,
      marginTop: 20,
      zIndex: 2,
    },
    isFlippedAllButtonText: {
      color: COLORS.cream,
      fontFamily: FONTS.NotoSerifBold,
      letterSpacing: 1,
    },
    selectedCards: {
      marginTop: 10,
      padding: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 10,
    },
    badge: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      backgroundColor: COLORS.blackOpacity1, // Arka plan rengi
      borderRadius: 10, // Yuvarlak kenarlar
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: COLORS.cream, // Gölgenin rengi
      shadowOffset: {width: 0, height: 2}, // Gölgenin yönü
      shadowOpacity: 0.1, // Gölgenin şeffaflığı
      shadowRadius: 5, // Gölgenin yayılma yarıçapı (iOS)
      // elevation: 8, // Android için gölge
    },
    badgeText: {
      color: COLORS.cream,
      fontSize: 16,
      fontWeight: 'bold',
    },
    badgeTextEng: {
      color: COLORS.cream,
      fontFamily: FONTS.NotoSerifThin,
    },
    startLoading: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    resultContainer: {
      marginTop: 30,
      paddingHorizontal: 10,
    },
    result: {
      backgroundColor: COLORS.blackOpacity1,
      borderWidth: 0.5,
      borderColor: COLORS.cream,
      padding: 15,
      borderRadius: 20,
      marginTop: 10,
    },
    resultText: {
      color: COLORS.cream,
      fontSize: SIZES.body4,
    },
    selfMessage: {
      alignSelf: 'flex-end',
      backgroundColor: COLORS.darkGray,
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: COLORS.blackOpacity,
    },
    writingLoading: {
      backgroundColor: COLORS.cream,
      borderRadius: 20,
      width: 100,
      height: 30,
      marginLeft: 5,
      zIndex: 2,
      position: 'absolute',
      bottom: 0,
    },
    textFieldContainer: {
      height: 70,
      width: '100%',
      flexDirection: 'row',
      paddingTop: 5,
    },
    textFieldWrapper: {
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    questionInput: {
      backgroundColor: COLORS.cream,
      width: SIZES.width / 1.2,
      height: 50,
      borderRadius: 20,
      paddingLeft: 10,
    },
    questionInputIcon: {
      tintColor: COLORS.cream,
      width: 50,
      height: 50,
      paddingLeft: 10,
      zIndex: 99,
    },
    cardDetailModalContainer: {
      width: '100%',
      alignItems: 'center',
      height: SIZES.height / 1.2,
    },
    cardDetailModalBg: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: -1,
      top: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      opacity: 0.5,
    },
    cardDetailModalCardTitle: {
      zIndex: 3,
      marginVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardDetailModalCardWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    cardDetailModalCardRightWrapper: {
      justifyContent: 'space-around',
      height: 100,
      backgroundColor: COLORS.blackOpacity1,
      flexDirection: 'row',
      width: '80%',
      borderRadius: 10,
    },
    cardDetailModalCardRightWrapperItem: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardDetailModalCardRightWrapperItemText: {
      color: COLORS.cream,
      fontFamily: FONTS.NotoSerifBold,
      lineHeight: 20,
      textAlign: 'center',
    },
    cardDetailModalCardNumber: {
      height: 40,
      width: 40,
      tintColor: COLORS.cream,
    },
    cardDetailModalCardLeftTitle: {
      color: COLORS.cream,
      fontFamily: FONTS.NotoSerifCondensedMediumItalic,
      fontSize: SIZES.body3,
      textAlign: 'center',
      backgroundColor: COLORS.blackOpacity1,
      width: '80%',
      borderRadius: 10,
      padding: 5,
    },
    cardDetailModalContent: {
      width: '100%',
      paddingHorizontal: 20,
      marginTop: 20,
      height: SIZES.height * 0.50,
    },
    cardDetailModalDescription: {
      backgroundColor: COLORS.blackOpacity1,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    cardDetailModalDescriptionText: {
      color: COLORS.cream,
      fontFamily: FONTS.NotoSerifBold,
      lineHeight: 20,
      textAlign: 'center',
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
      color: COLORS.black,
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
