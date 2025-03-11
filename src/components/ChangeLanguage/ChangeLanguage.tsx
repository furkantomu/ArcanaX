import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Button} from '../button/Button';

import { useRefsContext } from '@/context';
import {useAppDispatch} from '@/hooks';
import {setLocale} from '@/store/settings/settingsSlice';
import {COLORS, SIZES} from '@/styles/theme';


const ChangeLanguage = () => {
  const dispatch = useAppDispatch();
  const {languageChangeSheetRef} = useRefsContext();
  const closeModal = () => {
    languageChangeSheetRef.current?.scrollTo(0);
  };
  const handleChangeLanguage = (locale: string) => {
    dispatch(setLocale(locale));
    closeModal();
  };
  return (
    <View style={styles.container}>
      <View style={styles.listItem}>
        <Button
          text="Turkish"
          buttonStyle={styles.listButton}
          textStyle={styles.listButtonText}
          handlePress={() => handleChangeLanguage('tr')}
        />
      </View>
      <View style={styles.listItem}>
        <Button
          text="English"
          buttonStyle={styles.listButton}
          textStyle={styles.listButtonText}
          handlePress={() => handleChangeLanguage('en')}
        />
      </View>
    </View>
  );
};

export default ChangeLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.silverGray,
    backgroundColor: COLORS.black,
  },
  listButton: {
    width: SIZES.width,
    backgroundColor: 'transparent',
  },
  listButtonText: {},
});
