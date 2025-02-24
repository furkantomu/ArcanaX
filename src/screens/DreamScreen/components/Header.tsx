import React from 'react';
import {View} from 'react-native';

import {Typography} from '@/components';

import {getStyles} from '../styles';


const Header = () => {
  const styles = getStyles();

  return (
    <View>
      <View style={styles.headerTextWrapper}>
        <Typography weight={'NotoSerifCondensedMediumItalic'} size={'heading'}>
          Rüyalarınızın Anlamını Keşfedin!
        </Typography>
      </View>
    </View>
  );
};

export default Header;
