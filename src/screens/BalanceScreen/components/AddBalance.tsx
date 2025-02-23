import React from 'react';
import {View} from 'react-native';

import {IconButton} from '@/components';

import {getStyles} from '../styles';

const AddBalance = () => {
  const styles = getStyles();
  return (
    <View>
      <IconButton
        iconSize={40}
        iconStyle={styles.addBalanceButtonIcon}
        iconName="plus"
        text="Jeton Yükle"
        buttonStyle={styles.addBalanceButton}
        textStyle={styles.addBalanceButtonText}
      />
    </View>
  );
};

export default AddBalance;
