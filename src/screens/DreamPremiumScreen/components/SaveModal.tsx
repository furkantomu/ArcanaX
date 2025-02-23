import {View, Modal, TouchableWithoutFeedback, TextInput} from 'react-native';
import React from 'react';
import {Button, Typography} from '@/components';
import { getStyles } from '../styles';
import { useDreamContext } from '../DreamScreenContext';

const SaveModal = () => {
  const styles = getStyles();
  const {
    modalVisible,
    setModalVisible,
    setSaveName,
    saveLoading,
    saveName,
    saveData,
  } = useDreamContext();
  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      transparent
      animationType="fade">
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
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
                text="Kapat"
                handlePress={() => {
                  setModalVisible(false);
                }}
                buttonStyle={styles.button}
              />
              <Button
                text="Onayla"
                handlePress={() => {
                  saveData();
                  setModalVisible(false);
                }}
                disabled={saveLoading}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SaveModal;
