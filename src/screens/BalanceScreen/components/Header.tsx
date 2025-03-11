import React from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';

import {Icon, Typography} from '@/components';

import {useAppSelector} from '@/hooks';

import {getStyles} from '../styles';

import {COLORS} from '@/styles/theme';
import i18n from '@/i18n';

const Header = () => {
  const styles = getStyles();
  const {balance} = useAppSelector(state => state.balance);
  const {localeValue} = useAppSelector(state => state.settings);
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <Icon name="token" style={styles.icon} />
      </View>
      <View style={styles.accountInfoContainer}>
        <Typography
          size="medium"
          weight="NotoSerifCondensedItalic"
          style={{color: COLORS.blackOpacity1}}>
          {i18n.t('BALANCE_SCREEN.CURRENT_BALANCE', {locale: localeValue})}
        </Typography>
        <Typography
          size="heading"
          style={{...styles.balanceText, ...styles.color}}>
          {balance?.totalBalance}
        </Typography>
      </View>
      <View style={styles.accountSubTitleContainer}>
        <Typography
          size="medium"
          weight="NotoSerifCondensedItalic"
          style={{color: COLORS.blackOpacity1}}>
          {i18n.t('BALANCE_SCREEN.ACCOUNT_OPENING', {locale: localeValue})}:
        </Typography>
        <Typography size="medium" style={{...styles.color}}>
          {dayjs(balance?.createdAt).format('DD MMMM YYYY')}
        </Typography>
      </View>
    </View>
  );
};

export default Header;
