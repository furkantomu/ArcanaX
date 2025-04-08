import {View, TextInput} from 'react-native';
import React from 'react';
import {Button, Typography} from '@/components';
import {getStyles} from '../styles';
import {useDreamContext} from '../DreamScreenContext';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';
import EmojiRating from './EmojiRating';
import { COLORS } from '@/styles/theme';

const SaveModal = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const styles = getStyles();
  const {setSaveName, saveLoading, saveName, saveData} = useDreamContext();
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Typography
          weight="NotoSerifCondensedBoldItalic"
          style={styles.modalTitle}>
          {i18n.t('SAVE_MODAL.SAVE_NAME', {locale: localeValue})}
        </Typography>
        <TextInput
          style={styles.input}
          value={saveName}
          onChangeText={(text: string) => setSaveName(text)}
          placeholder={i18n.t('SAVE_MODAL.ENTER_NAME', {locale: localeValue})}
          placeholderTextColor={COLORS.blackOpacity1}
        />
        <EmojiRating/>
        <View style={styles.modalButton}>
          <Button
            text={i18n.t('SAVE_MODAL.BUTTON', {locale: localeValue})}
            handlePress={() => {
              saveData();
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
