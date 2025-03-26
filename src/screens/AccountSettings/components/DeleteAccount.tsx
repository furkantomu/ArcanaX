import {Alert, View} from 'react-native';
import React from 'react';
import {getStyles} from '../styles';
import {Button, Typography} from '@/components';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';
import {apiService} from '@/services/APIService';

const DeleteAccount = () => {
  const styles = getStyles();
  const {localeValue} = useAppSelector(state => state.settings);
  const {user} = useAppSelector(state => state.auth);

  const handleDetele = async () => {
    const response = await apiService.post('auth/feedback', {
      userId: user?.id,
      message: 'account delete',
    });

    Alert.alert(
      i18n.t('ACCOUNT_DELETE', {locale: localeValue}),
      i18n.t('ACCOUNT_DELETED_DESCRIPTION', {locale: localeValue}),
      [
        {
          text: i18n.t('ACCOUNT_DELETE_ALERT.CANCEL', {locale: localeValue}),
          style: 'cancel',
        },
      ],
    );
  };

  const handlePress = () => {
    Alert.alert(
      i18n.t('ACCOUNT_DELETE', {locale: localeValue}),
      i18n.t('ACCOUNT_DELETE_DESCRIPTION', {locale: localeValue}),
      [
        {
          text: i18n.t('ACCOUNT_DELETE_ALERT.CANCEL', {locale: localeValue}),
          style: 'cancel',
        },
        {
          text: i18n.t('ACCOUNT_DELETE_ALERT.ACCEPT', {locale: localeValue}),
          onPress: () => handleDetele(),
        },
      ],
    );
  };
  return (
    <View style={[styles.menuItems, styles.accountDelete]}>
      <Typography>{i18n.t('ACCOUNT', {locale: localeValue})}</Typography>
      <Button
        text={i18n.t('ACCOUNT_DELETE', {locale: localeValue})}
        variant="secondary"
        handlePress={handlePress}
      />
    </View>
  );
};

export default DeleteAccount;
