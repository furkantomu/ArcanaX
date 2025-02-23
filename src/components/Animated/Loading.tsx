import React, { FC } from 'react';
import LottieView from 'lottie-react-native';

import {getStyles} from './styles';

import loading from '../../../assets/animated/loading.json';
import {COLORS} from 'styles/theme';


interface LoadingProps {
  style?: object;
}

const Loading: FC<LoadingProps> = (props) => {
  const styles = getStyles();
  const colorFilters = [
    {
      keypath: 'Shape Layer 1',
      color: COLORS.darkBlue1,
    },
    {
      keypath: 'Shape Layer 2',
      color: COLORS.darkBlue1,
    },
    {
      keypath: 'Shape Layer 3',
      color: COLORS.darkBlue1,
    },
    {
      keypath: 'Shape Layer 4',
      color: COLORS.darkBlue1,
    },
  ];
  return (
    <LottieView
      colorFilters={colorFilters}
      source={loading}
      autoPlay
      style={styles.loading}
      {...props}
    />
  );
};

export default Loading;
