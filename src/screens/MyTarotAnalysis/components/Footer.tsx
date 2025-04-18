import {View, Text} from 'react-native';
import React from 'react';
import {getStyles} from '../styles';
import {Typography} from '@/components';
import {useAppSelector} from '@/hooks';

const Footer = () => {
  const styles = getStyles();
  const {localeValue} = useAppSelector(state => state.settings);
  return (
    <View style={styles.footer}>
      <Typography style={styles.footerTitle}>
        {localeValue === 'tr'
          ? 'Yorumlamak istediğin kartı seç'
          : 'Select the card you want to interpret'}
      </Typography>
    </View>
  );
};

export default Footer;
