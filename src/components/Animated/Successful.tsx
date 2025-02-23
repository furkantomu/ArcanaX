import React, {FC} from 'react';
import LottieView from 'lottie-react-native';
import {getStyles} from './styles';

import checked from '../../../assets/animated/checked.json';

import {COLORS} from 'styles/theme';

interface SuccessfulProps {
  style?: object;
}

const Successful: FC<SuccessfulProps> = props => {
  const colorFilters = [
    {
      keypath: 'CheckRadioButton_Red Circle',
      color: COLORS.darkBlue1,
    },
    {
      keypath: 'CheckRadioButton_Checkmark',
      color: COLORS.darkBlue1,
    },
  ];
  const styles = getStyles();
  return (
    <LottieView
      colorFilters={colorFilters}
      speed={0.5}
      source={checked}
      autoPlay
      loop={false}
      style={styles.checked}
      {...props}
    />
  );
};

export default Successful;
