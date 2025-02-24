import {Dimensions, PixelRatio} from 'react-native';

const {width} = Dimensions.get('window');

export const responsiveSize = (size: number): number => {
  const scale = width / 320;
  const newSize = size * scale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
