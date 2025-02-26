import {View, TextInput} from 'react-native';
import React from 'react';
import {Button, Typography} from '@/components';
import {getStyles} from '../styles';
import { useNumerologyPremiumContext } from '../NumerologyPremiumContext';

const SaveModal = () => {
  const styles = getStyles();
    const {
      saveData,
      saveName,
      setSaveName,
      saveLoading,
      setCompleted,
    } = useNumerologyPremiumContext();

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Typography
          weight="NotoSerifCondensedBoldItalic"
          style={styles.modalTitle}>
          Kayıt İsmi:
        </Typography>
        <TextInput
          style={styles.input}
          value={saveName}
          onChangeText={(text: string) => setSaveName(text)}
          placeholder="Metin girin..."
        />
        <View style={styles.modalButton}>
          <Button
            text="Onayla"
            handlePress={() => {
              saveData();
              setCompleted(true);
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
