import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from 'styles/theme';

const imageWidth = SIZES.width * 0.8;
const imageHeight = imageWidth * 1.3;

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: imageWidth,
      height: imageHeight,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      marginTop: 120,
    },
    imageIconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingHorizontal: 20,
    },
    icon: {
      width: 40,
      height: 40,
      tintColor: COLORS.cream,
      resizeMode:'cover',
    },
    iconWrapper: {
      alignItems: 'center',
      gap: 10,
    },
    descriptionContainer: {
      marginTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    loading: {
      marginVertical: 100,
    },
  });
