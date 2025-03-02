import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from 'styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    container: {
    flex: 1,
     justifyContent: 'space-between',
    },
    ImageBackground: {
      width: SIZES.width,
      height: SIZES.height / 1.7,
      position: 'absolute',
      zIndex: 0,
    },
    linearGradient: {
      width: '100%',
      height: SIZES.height / 1.8,
      position: 'absolute',
      zIndex: 1,
    },
    headerTextWrapper: {
      zIndex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    textFieldWrapper: {

      zIndex: 3,
      marginTop: 50,
      paddingHorizontal: 10,
    },
    textField:{
      backgroundColor:COLORS.cream,
      textAlignVertical: 'top',
      paddingVertical: 20,
      height: 200,
      borderColor: COLORS.cream,
    },
    footerWrapper: {
      zIndex: 3,
      marginHorizontal: 10,
      paddingBottom: 5,
    },
    contentContainer: {
      zIndex:3,
      marginBottom: 20,
    },
    loadingWrapper: {
      zIndex: 3,
      marginTop: 70,
    },
    resultContainer: {
      marginTop: 30,
      paddingHorizontal: 10,
    },
    result: {
      borderWidth: 0.5,
      borderColor: COLORS.cream,
      padding: 15,
      borderRadius: 20,
      marginTop: 10,
    },
    selfMessage: {
      alignSelf: 'flex-end',
      backgroundColor: COLORS.darkGray,
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: COLORS.blackOpacity1,
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
