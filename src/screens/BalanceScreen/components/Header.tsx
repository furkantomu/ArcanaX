import React from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';

import {Icon, Typography} from '@/components';

import {useAppSelector} from '@/hooks';

import {getStyles} from '../styles';

import {COLORS} from '@/styles/theme';

const Header = () => {
  const styles = getStyles();
  const {balance} = useAppSelector(state => state.balance);
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
          Mevcut Jeton
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
          Hesap Açılış Tarihi:
        </Typography>
        <Typography size="medium" style={{...styles.color}}>
          {dayjs(balance?.createdAt).format('DD MMMM YYYY')}
        </Typography>
      </View>
    </View>
  );
};

export default Header;
