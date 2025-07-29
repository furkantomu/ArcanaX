import React from 'react';
import {View} from 'react-native';

import {IconButton} from '@/components';

import {getStyles} from '../styles';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';
import { SIZES } from '@/styles/theme';
import { useRefsContext } from '@/context';
import { useNavigation } from '@react-navigation/native';

const AddBalance = () => {
  const styles = getStyles();
  const navigation = useNavigation();
  const {localeValue} = useAppSelector(state => state.settings);

  const openModal = () => {
    navigation.navigate('PurchasingScreen');
  };
  return (
    <View>
      <IconButton
        iconSize={40}
        iconStyle={styles.addBalanceButtonIcon}
        iconName="plus"
        text={i18n.t('BALANCE_SCREEN.ADD_TOKEN', {locale: localeValue})}
        buttonStyle={styles.addBalanceButton}
        textStyle={styles.addBalanceButtonText}
        handlePress={openModal}
      />
    </View>
  );
};

export default AddBalance;
