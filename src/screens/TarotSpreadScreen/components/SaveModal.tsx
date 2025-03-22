import {View, TextInput} from 'react-native';
import React from 'react';
import {Button, Typography} from '@/components';
import {getStyles} from '../style';
import {useTarotContext} from '../TarotContext';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';
import EmojiRating from './EmojiRating';

const SaveModal = () => {
  const styles = getStyles();
  const {
    setSaveName,
    saveLoading,
    saveName,
    saveData,
    setReadingCompleted,
  } = useTarotContext();
  const {localeValue} = useAppSelector(state => state.settings);
  return (
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Typography
            weight="NotoSerifCondensedBoldItalic"
            style={styles.modalTitle}>
            {i18n.t('SAVE_MODAL.SAVE_NAME', {locale: localeValue})}:
          </Typography>
          <TextInput
            style={styles.input}
            value={saveName}
            onChangeText={(text: string) => setSaveName(text)}
            placeholder={i18n.t('SAVE_MODAL.ENTER_NAME', {locale: localeValue})}
          />
          <EmojiRating/>
          <View style={styles.modalButton}>
            <Button
              text={i18n.t('SAVE_MODAL.BUTTON', {locale: localeValue})}
              handlePress={() => {
                saveData();
                setReadingCompleted(true);
              }}
              disabled={saveLoading}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </View>
  );
};

export default SaveModal;
