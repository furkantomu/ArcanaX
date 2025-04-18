import {COLORS, FONTS, SIZES} from '@/styles/theme';
import {StyleSheet} from 'react-native';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerWrapper: {
      flex: 1,
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    editIconWrapper: {
      right: 40,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
    },
    editIconBtn: {
      backgroundColor: COLORS.cream,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    editIcon: {
      resizeMode: 'cover',
    },
    fullscreenInputWrapper: {
      position: 'absolute',
      top: 10,
      left: SIZES.width / 12,
      width: SIZES.width / 1.2,
      backgroundColor: COLORS.darkGray,
      padding: 20,
      zIndex: 99,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.silverGray,
    },
    closeButton: {
      backgroundColor: COLORS.silverGray,
      borderRadius: 15,
      width: '100%',
      marginTop: 20,
      height: 40,
      zIndex: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textArea: {
      height: 150,
      width: SIZES.width / 1.2,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: COLORS.blackOpacity1,
      fontSize: SIZES.body3,
      color: COLORS.cream,
      fontFamily: FONTS.NotoSerifRegular,
    },
    image: {
      width: SIZES.width / 1.8,
      height: SIZES.height / 3,
    },
    textFieldWrapper: {
      paddingHorizontal: 10,
      marginBottom: 5,
      marginTop: 10,
    },
    textFieldContainer: {
      height: 70,
      width: '100%',
      flexDirection: 'row',
      paddingTop: 5,
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
    startBtn: {
      width: SIZES.width / 1.8,
    },
    startBtnIcon: {
      resizeMode: 'cover',
    },
    resultContainer: {
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
      marginVertical: 10,
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
