import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '@/styles/theme';

const imageWidth = SIZES.width * 0.25;
const imageHeight = imageWidth * 1.4;

export const getStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.black,
      flex: 1,
    },
    backgroundContent: {
      position: 'relative',
      height: SIZES.height / 3,
    },
    linearGradient: {
      position: 'absolute',
      width: SIZES.width,
      height: SIZES.height / 1.5,
      zIndex: 0,
    },
    title: {
      textAlign: 'center',
      marginTop: 50,
      zIndex: 2,
    },
    info: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
      zIndex: 1,
    },
    infoTitle: {
      textAlign: 'center',
      lineHeight: 0,
    },
    tarotSpreadBG: {
      width: SIZES.width,
      position: 'absolute',
      height: SIZES.height / 1.5,
      zIndex: -1,
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
      marginTop: 30,
      zIndex: 2,
      backgroundColor: COLORS.black,
      height: '100%',
      paddingTop: 50,
    },
    imageContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    subTitle: {
      fontSize: SIZES.subTitle,
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
      backgroundColor: 'transparent',
      height: imageHeight * 1.5,
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
    bottomSheetHeader: {
      alignItems: 'center',
      gap: 100,
    },
    bottomSheetText: {
      marginTop: 30,
      textAlign: 'center',
    },
    buttonContainer: {
      paddingHorizontal: 20,
      gap: 5,
      marginTop: 120,
    },
    bottomSheetButtonText: {
      fontWeight: 600,
      fontFamily: FONTS.NotoSerifBold,
      fontSize: SIZES.body2,
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
      elevation: 8, // Android için gölge
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
      bottom: 5,
    },
    textFieldContainer: {
      height: 70,
      width: '100%',
      flexDirection: 'row',
      paddingTop: 5,
    },
    textFieldWrapper: {
      paddingHorizontal: 10,
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
    cardDetailModalBg: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: -1,
      top: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    cardDetailModalCardTitleVertical: {
      transform: [{rotate: '180deg'}],
      backgroundColor: COLORS.blackOpacity1,
      borderRadius: 10,
      marginTop: 10,
      paddingHorizontal: 20,
      paddingVertical: 5,
      zIndex: 3,
    },
    cardDetailModalCardTitle: {
      color: COLORS.cream,
      fontFamily: FONTS.NotoSerifBold,
      textAlign: 'center',
      fontSize: SIZES.body3,
    },
    cardDetailModalCardWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    cardDetailModalCardLeftWrapper: {
      justifyContent: 'center',
    },
    cardDetailModalCard: {
      width: SIZES.width / 1.4,
      height: SIZES.height / 2.3,
      marginTop: 10,
      marginLeft: 30,
    },
    cardDetailModalCardRightWrapper: {
      paddingTop: 20,
      justifyContent: 'space-around',
      gap: 20,
    },
    cardDetailModalCardRightWrapperItem: {},
    cardDetailModalCardRightWrapperItemText: {
      color: COLORS.cream,
      fontFamily: FONTS.NotoSerifBold,
      lineHeight: 20,
      textAlign: 'center',
      marginTop: 5,
    },
    cardDetailModalCardNumber: {
      height: 40,
      width: 40,
      tintColor: COLORS.cream,
    },
    cardDetailModalCardLeftTitleVertical: {
      backgroundColor: 'transparent',
      left: 0,
      position: 'absolute',
      transform: [{rotate: '-90deg'}],
      height: '100%',
      width: '100%',
      justifyContent: 'flex-start',
    },
    cardDetailModalWrapper: {},
    cardDetailModalContainer: {
      height: SIZES.height / 3.5,
      width: '100%',
      alignItems: 'center',
    },
    cardDetailModalCardLeftTitle: {
      color: COLORS.cream,
      fontFamily: FONTS.NotoSerifCondensedMediumItalic,
      fontSize: SIZES.subTitle,
      letterSpacing: 1,
    },
    cardDetailModalContent: {
      width: '100%',
      padding: 20,
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
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
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
    },
    button: {
      width: 100,
    },
  });
