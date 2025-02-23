import React from 'react';
import {View} from 'react-native';
import {getStyles} from './styles';
import MenuItem from './components/MenuItem';
import {Typography} from '@/components';

const MENU_ITEM_TOP = [
  {
    leftIcon: 'password',
    title: 'Şifre İşlemleri',
    rightIcon: 'rightChevron',
    type: 'password',
  },
  {
    leftIcon: 'token',
    title: 'Jeton İşlemleri',
    rightIcon: 'rightChevron',
    type: 'token',
  },
  {
    leftIcon: 'save',
    title: 'Kayıtlı İşlemler',
    rightIcon: 'rightChevron',
    type: 'history',
  },
];

const MENU_ITEM_BOTTOM = [
  {
    leftIcon: 'info',
    title: 'SSS/Destek',
    rightIcon: 'rightChevron',
    type: 'info',
  },
  {
    leftIcon: 'logout',
    title: 'Çıkış',
    rightIcon: 'rightChevron',
    type: 'logout',
  },
];

const SettingsMenu = () => {
  const styles = getStyles();
  return (
    <View style={styles.settingsMenu}>
      <Typography weight="NotoSerifCondensedBoldItalic" size="large">
        Diğer Ayarlar
      </Typography>
      <View style={styles.settingsMenuItem}>
        {MENU_ITEM_TOP.map((item, idx) => (
          <MenuItem
            key={idx}
            leftIcon={item.leftIcon}
            title={item.title}
            rightIcon={item.rightIcon}
            type={item.type}
            index={idx}
          />
        ))}
      </View>
      <View style={styles.settingsMenuItem}>
        {MENU_ITEM_BOTTOM.map((item, idx) => (
          <MenuItem
            key={idx}
            leftIcon={item.leftIcon}
            title={item.title}
            rightIcon={item.rightIcon}
            type={item.type}
            index={idx}
          />
        ))}
      </View>
    </View>
  );
};

export default SettingsMenu;
