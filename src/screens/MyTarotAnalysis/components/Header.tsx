import React from 'react';
import { Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS} from '@/styles/theme';
import {getStyles} from '../styles';

const Header = () => {
  const styles = getStyles();
  return (
    <>
      <LinearGradient
        colors={[
          COLORS.blackOpacity1,
          COLORS.blackOpacity,
          COLORS.blackOpacity1,
        ]}
        style={styles.headerGradient}
      />
      <Image
        source={require('../../../../assets/image1_0.jpg')}
        style={styles.bg}
      />
    </>
  );
};

export default Header;
