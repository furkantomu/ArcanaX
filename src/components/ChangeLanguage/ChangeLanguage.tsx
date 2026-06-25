import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '../Button/Button';

import { useRefsContext } from '@/context';
import { useAppDispatch } from '@/hooks';
import { setLocale } from '@/store/settings/settingsSlice';
import { COLORS, SIZES } from '@/styles/theme';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';


const ChangeLanguage = () => {
  const dispatch = useAppDispatch();
  const { languageChangeSheetRef } = useRefsContext();
  const closeModal = () => {
    languageChangeSheetRef.current?.dismiss({
      overshootClamping: true,
    });
  };
  const handleChangeLanguage = (locale: string) => {
    dispatch(setLocale(locale));
    closeModal();
  };
  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Pressable onPress={() => handleChangeLanguage('tr')}>
          <View style={styles.listItem}>
            <Button
              text="Turkish"
              buttonStyle={styles.listButton}
              textStyle={styles.listButtonText}
              handlePress={() => handleChangeLanguage('tr')}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => handleChangeLanguage('en')}>
          <View style={styles.listItem}>
            <Button
              text="English"
              buttonStyle={styles.listButton}
              textStyle={styles.listButtonText}
              handlePress={() => handleChangeLanguage('en')}
          />
        </View>
          </Pressable>
      </View>
    </BottomSheetScrollView>
  );
};

export default ChangeLanguage;

const styles = StyleSheet.create({
  container: {

  },
  listItem: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.silverGray,
    backgroundColor: COLORS.darkGray,
  },
  listButton: {
    width: SIZES.width,
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  listButtonText: {},
});
