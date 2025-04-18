import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
} from 'react-native';

import {Button, Icon, Typography} from '@/components';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';
import {getStyles} from '../styles';
import {useMyTarotAnalysisDetailContext} from '../MyTarotAnalysisDetailContext';
import {useRefsContext} from '@/context';
import {apiService} from '@/services/APIService';
import { SIZES } from '@/styles/theme';

type FooterProps = {};
const sendIcon = require('../../../../assets/icon/send.png');
const Footer = ({}: FooterProps) => {
  const styles = getStyles();
  const {localeValue} = useAppSelector(state => state.settings);
  const {setMessages, messages, setWritingLoading, spreadID} =
    useMyTarotAnalysisDetailContext();
  const {tarotAnalysisScrollViewRef, saveTarotAnalysisSheetRef} = useRefsContext();
  const [newMessage, setNewMessage] = useState('');
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      content: newMessage,
      role: 'user',
    };

    const selfCount = messages.filter(msg => msg.role === 'user').length;
    if (selfCount === 5) {
      Alert.alert(
        'Tarot Okuması Tamamlandı',
        'Maksimum soru hakkınızı kullandınız. Yeni bir okuma yapmak için mevcut oturumu sonlandırmalısınız.',
        [{text: 'Tamam'}],
      );
      return;
    }
    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        content: newMessage,
      },
    ]);
    setNewMessage('');
    Keyboard.dismiss();
    try {
      setWritingLoading(true);
      const response = await apiService.put<{
        id: string;
        messages: [
          {
            role: string;
            content: string;
          },
        ];
      }>(`/tarot/analysis/start/${spreadID}`, newMsg);
      setMessages(prev => [
        ...prev,
        ...response.data.messages.map(chatMessage => ({
          content: chatMessage.content,
          role: chatMessage.role,
        })),
      ]);
    } catch (err) {
      //setError('Bir hata oluştu');

      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: 'assistant',
          content: i18n.t('NOT_CONNECT', {locale: localeValue}),
        },
      ]);
    } finally {
      setWritingLoading(false);
      setTimeout(() => {
        tarotAnalysisScrollViewRef.current?.scrollToEnd({animated: true});
      }, 100);
    }
  };

  const handleCompleted = () => {
    saveTarotAnalysisSheetRef.current?.scrollTo(-SIZES.height / 1.2);
  };
  return (
    <View style={styles.textFieldWrapper}>
      <View style={styles.textFieldContainer}>
        <TextInput
          placeholder={i18n.t('TAROT_READ_START.START_INPUT', {
            locale: localeValue,
          })}
          style={styles.questionInput}
          value={newMessage}
          onSubmitEditing={handleSendMessage}
          onChangeText={setNewMessage}
          returnKeyType="send"
          maxLength={150}
        />
        <TouchableOpacity style={{zIndex: 90}} onPress={handleSendMessage}>
          <Image
            source={sendIcon}
            style={styles.questionInputIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <Typography size="small">
        {i18n.t('TAROT_READ_START.SPREAD_QUESTION_COUNT', {
          locale: localeValue,
        })}
        : 5/
        {messages.filter(msg => msg.role === 'user').length}
      </Typography>
      <Button
        text={i18n.t('TAROT_READ_START.SPREAD_COMPLETED_BUTTON', {
          locale: localeValue,
        })}
        variant="secondary"
        handlePress={handleCompleted}
      />
    </View>
  );
};

export default Footer;
