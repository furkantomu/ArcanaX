import React from 'react';
import {View} from 'react-native';
import {getStyles} from './styles';
import MenuItem from './components/MenuItem';
import {Typography} from '@/components';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';
import {Icons} from '@/components/Icon/Icons';

type IconName = keyof typeof Icons;

type MenuConfig = {
  leftIcon: IconName;
  title: string;
  rightIcon: IconName;
  type: string;
};

const MENU_ITEM_TOP: MenuConfig[] = [
  {
    leftIcon: 'password',
    title: 'PASSWORD',
    rightIcon: 'rightChevron',
    type: 'password',
  },
  {
    leftIcon: 'token',
    title: 'TOKEN',
    rightIcon: 'rightChevron',
    type: 'token',
  },
  {
    leftIcon: 'save',
    title: 'SAVE',
    rightIcon: 'rightChevron',
    type: 'history',
  },
];

const MENU_ITEM_BOTTOM: MenuConfig[] = [
  {
    leftIcon: 'accountSettings',
    title: 'ACCOUNT_SETTINGS',
    rightIcon: 'rightChevron',
    type: 'accountSettings',
  },
  {
    leftIcon: 'info',
    title: 'FAQ',
    rightIcon: 'rightChevron',
    type: 'info',
  },
  {
    leftIcon: 'logout',
    title: 'EXIT',
    rightIcon: 'rightChevron',
    type: 'logout',
  },
];

const SettingsMenu = () => {
  const styles = getStyles();
  const {localeValue} = useAppSelector(state => state.settings);
  return (
    <View style={styles.settingsMenu}>
      <Typography weight="NotoSerifCondensedBoldItalic" size="large">
        {i18n.t('PROFILE_SCREEN.OTHER_SETTINGS', {locale:localeValue})}
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
