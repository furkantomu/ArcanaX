import {View} from 'react-native';
import React, {useState} from 'react';
import {getStyles} from '../styles';
import {Button} from '@/components';
import {useDreamContext} from '../DreamScreenContext';
import {apiService} from '@/services/APIService';

const FooterButton = () => {
  const styles = getStyles();
  const {messages, dream, setMessages, setModalVisible, setSpreadID} =
    useDreamContext();
  const [loading, setLoading] = useState(false);

  const handlePress = async (params: string) => {
    if (params === 'completed') {
      setModalVisible(true);
    } else {
      const oldMessage = {
        role: 'user',
        content: dream,
      };
      try {
        setLoading(true);
        const result = await apiService.post('/dream/read/start', {
          questions: dream,
        });
        setSpreadID(result.data.id);
        setMessages(prevMessages => [
          ...prevMessages,
          oldMessage,
          ...result.data.messages,
        ]);
      } catch (error) {
        setMessages(prevMessages => [
          ...prevMessages,
          oldMessage,
          {
            role: 'assistant',
            content: 'Sunucuya bağlanamadı. Jeton iadesi yapılacaktır.',
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <View style={styles.footerWrapper}>
      {messages.length > 0 ? (
        <Button
          text="Kaydet ve Çık"
          variant={'secondary'}
          handlePress={() => handlePress('completed')}
        />
      ) : (
        <Button
          disabled={dream === '' || loading}
          text="Gönder"
          variant={'secondary'}
          handlePress={() => handlePress('send')}
        />
      )}
    </View>
  );
};

export default FooterButton;
