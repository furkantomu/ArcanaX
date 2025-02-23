import React, {useEffect, useState} from 'react';
import {View, TouchableWithoutFeedback, Modal, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getStyles} from '../styles';
import {Button, Typography} from '@/components';
import {useNumerologyPremiumContext} from '../NumerologyPremiumContext';
import {TextInput} from 'react-native-gesture-handler';
import {COLORS} from '@/styles/theme';
const Footer = () => {
  const styles = getStyles();
  const navigation = useNavigation();

  const {
    saveData,
    saveName,
    setSaveName,
    saveLoading,
    setCompleted,
    completed,
  } = useNumerologyPremiumContext();
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (!completed) {
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        Alert.alert(
          'Numeroloji Analizi',
          'Bu sayfadan çıkmak istediğinize emin misiniz?',
          [
            {text: 'Hayır', style: 'cancel'},
            {
              text: 'Evet',
              onPress: () => {
                setModalVisible(true);
              },
            },
          ],
        );
      });
      return unsubscribe;
    }
  }, [completed, navigation]);

  return (
    <View style={styles.footer}>
      <Button
        text="Kaydet ve Anasayfaya Dön"
        handlePress={handlePress}
        variant={'secondary'}
        buttonStyle={styles.saveButton}
      />

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
                    setCompleted(true);
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
    </View>
  );
};

export default Footer;
