import { COLORS, FONTS, SIZES } from '@/styles/theme';
import {StyleSheet} from 'react-native';



export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    bg: {
       width: SIZES.width,
       height: SIZES.height,
       position: 'absolute',
       zIndex:0,
      },
      header: {
          marginTop: 30,
          padding: 20,

      },
      headerText: {
          fontSize: 60,
          color: COLORS.cream,
          textAlign: 'left',
          fontWeight: 'bold',
          fontFamily: FONTS.NotoSerifBold,
      },
      bottomWrapper: {
          width: '100%',
          backgroundColor:COLORS.blackOpacity1,
          height: SIZES.height / 2.5,
          position:'absolute',
          bottom: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 20,
          gap: 20,
          justifyContent: 'center',
      },
      dateNumberWrapper: {
          flexDirection:'row',
          justifyContent: 'space-between',
      },
      day:{
          width: SIZES.width / 4,
      },
      month: {
        width: SIZES.width / 4,
      },
      year: {
        width: SIZES.width / 3,
      },
      textField: {
      },
      calculateBtn: {
          backgroundColor: COLORS.cream,
          padding: 20,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems:'center',
      },
      animatedCalculateBtn: {
        width: SIZES.width,
        backgroundColor: COLORS.cream,
        position: 'absolute',
        zIndex: 99,
        justifyContent: 'center',
        bottom: 0,
        paddingHorizontal: 40,
      },
      calculateBtnText: {
          fontSize: SIZES.body2,
          fontFamily:FONTS.NotoSerifBold,
          fontWeight: 'bold',
          color:COLORS.black,
      },
      calculateText: {
        textAlign: 'center',
        fontSize: SIZES.body2,
        color: COLORS.darkBlue1,
      },
      animated: {
        width: '100%',
        height: 300,
      },
  });
