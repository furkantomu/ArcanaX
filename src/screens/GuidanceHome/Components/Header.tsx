import {View, Text} from 'react-native';
import React from 'react';
import {Icon, Typography} from '@/components';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';
import {getStyles} from '../styles';
import {responsiveSize} from '@/utils/responsiveSize';

const Header = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const styles = getStyles();
  return (
    <View style={styles.header}>
      <View style={styles.headerWrapper}>
        <Icon name="tarot" style={styles.headerIcon}/>
        <Typography
          weight="bold"
          size="heading"
          style={{fontSize: responsiveSize(40)}}>
          {i18n.t('GUIDANCE_HOME.TITLE', {locale: localeValue})}
        </Typography>
      </View>
      <View>
        <Typography size="large">
          {i18n.t('GUIDANCE_HOME.DESCRIPTION', {locale: localeValue})}
        </Typography>
      </View>
    </View>
  );
};

export default Header;
