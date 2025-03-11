import React from 'react';
import {View} from 'react-native';

import {Typography} from '@/components';

import {getStyles} from '../styles';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';


const Header = () => {
  const styles = getStyles();
  const {localeValue} = useAppSelector(state => state.settings);

  return (
    <View>
      <View style={styles.headerTextWrapper}>
        <Typography weight={'NotoSerifCondensedMediumItalic'} size={'heading'}>
         {i18n.t('DREAM_SCREEN.TITLE', {locale: localeValue})}
        </Typography>
      </View>
    </View>
  );
};

export default Header;
