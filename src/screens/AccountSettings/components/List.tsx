import React from 'react';
import {View} from 'react-native';

import {Button, Typography} from '@/components';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {setLocale} from '@/store/settings/settingsSlice';
import i18n from '@/i18n';
import {getStyles} from '../styles';

const List = () => {
  const dispatch = useAppDispatch();
  const styles = getStyles();
  const {localeValue} = useAppSelector(state => state.settings);

  const handleChangeLanguage = (locale: string) => {
    dispatch(setLocale(locale));
  };
  return (
    <View style={styles.menuItems}>
      <Typography>
        {i18n.t('CHANGE_LANGUAGE', {locale: localeValue})}
      </Typography>
      <Button
        text="Türkçe"
        variant={`${localeValue === 'tr' ? 'primary' : 'secondary'}`}
        buttonStyle={styles.menuItem}
        handlePress={() => handleChangeLanguage('tr')}
      />
      <Button
        text="English"
        buttonStyle={styles.menuItem}
        variant={`${localeValue === 'en' ? 'primary' : 'secondary'}`}
        handlePress={() => handleChangeLanguage('en')}
      />
    </View>
  );
};

export default List;
