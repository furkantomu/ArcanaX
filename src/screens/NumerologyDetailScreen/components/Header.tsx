
import React from 'react';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {Typography} from '@/components';

import {getStyles} from '../styles';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const Header = () => {
  const route = useRoute();
  const {localeValue} = useAppSelector(state => state.settings);
  const {numerologyDetail} = route.params;
  const styles = getStyles();

  return (
    <View style={styles.headerWrapper}>
      <Typography size="heading" style={styles.headerTitle}>
       {i18n.t('NUMEROLOGY_DETAIL_SCREEN.TITLE', {locale:localeValue})}
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
