
import React from 'react';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {Typography} from '@/components';

import {getStyles} from '../styles';

const Header = () => {
  const route = useRoute();
  const {numerologyDetail} = route.params;
  const styles = getStyles();

  return (
    <View style={styles.headerWrapper}>
      <Typography size="heading" style={styles.headerTitle}>
        Numeroloji Raporunuz
      </Typography>
      <View style={styles.headerNameInfo}>
        <Typography size="large" style={styles.headerNameInfoText}>
          {numerologyDetail.name}
        </Typography>
        <Typography size="large" style={styles.headerNameInfoText}>
          {numerologyDetail.birthDate}
        </Typography>
      </View>
    </View>
  );
};

export default Header;
