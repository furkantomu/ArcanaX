import {Button} from '@/components';
import {useAppSelector} from '@/hooks';
import i18n from '@/i18n';
import {apiService} from '@/services/APIService';
import {COLORS, SIZES} from '@/styles/theme';
import {showToast} from '@/utils/showToast';
import React, {useState} from 'react';
import {Modal, View, Text, TextInput, StyleSheet} from 'react-native';

const ContactModal = ({isVisible, onClose}) => {
  const {user} = useAppSelector(state => state.auth);
  const {localeValue} = useAppSelector(state => state.settings);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    try {
      setLoading(true);
      const response = await apiService.post('auth/feedback', {
        userId: user?.id,
        message,
      });
      showToast({
        message: i18n.t('FEEDBACK_RESPONSE', {locale: localeValue}),
        type: 'success',
      });
      onClose();
      console.log('res', response);
      return response.data;
    } catch (error) {
      showToast({
        message: i18n.t('NETWORK_ERROR', {locale: localeValue}),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage();
  };

  return (
    <Modal transparent visible={isVisible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {i18n.t('CONTACT_MODAL.TITLE', {locale: localeValue})}
          </Text>
          <TextInput
            style={styles.textarea}
            placeholder={i18n.t('CONTACT_MODAL.PLACEHOLDER', {
              locale: localeValue,
            })}
            value={message}
            onChangeText={setMessage}
            multiline
            placeholderTextColor={COLORS.silverGray}
          />
          <View style={styles.buttonContainer}>
            <Button
              text={i18n.t('CONTACT_MODAL.CANCEL', {locale: localeValue})}
              buttonStyle={styles.buttonOutline}
              handlePress={onClose}
              variant="secondary"
            />

            <Button
              text={i18n.t('CONTACT_MODAL.SUBMIT', {locale: localeValue})}
              buttonStyle={styles.button}
              handlePress={handleSend}
              variant="primary"
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: COLORS.darkGray,
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.body2,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.cream,
  },
  textarea: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    color: COLORS.cream,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    width: SIZES.width / 3,
  },
  buttonOutline: {
    width: SIZES.width / 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ContactModal;
