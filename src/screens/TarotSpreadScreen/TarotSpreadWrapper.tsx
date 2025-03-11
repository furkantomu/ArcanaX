import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import CartReveal from './CartReveal';

import Header from './components/Header';
import Content from './components/Content';
import FooterButtons from './components/FooterButtons';

import {Button, CustomHeader, Typography} from '@/components';

import {useRefsContext} from '@/context';

import {useTarotContext} from './TarotContext';
import {getStyles} from './style';

import {apiService} from '@/services/APIService';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES} from '@/styles/theme';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const tarotSpreadBG = require('../../../assets/background/tarotspread.webp');

const TarotSpreadWrapper = ({route}: any) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const {tarotSpreadScrollViewRef, saveTarotSheetRef} = useRefsContext();
  const {localeValue} = useAppSelector(state => state.settings);
  const {
    spreadID,
    readingStarted,
    messages,
    setMessages,
    showOpenButton,
    setWritingLoading,
  } = useTarotContext();
  const styles = getStyles();
  const sendIcon = require('../../../assets/icon/send.png');

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
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

      setMessages(prevMessages => [...prevMessages, newMsg]);
      setTimeout(() => {
        tarotSpreadScrollViewRef.current?.scrollToEnd({animated: true});
      }, 100);
      setNewMessage('');
      Keyboard.dismiss();

      try {
        setWritingLoading(true);
        const result = await apiService.put(
          `/tarot/read/start/${spreadID}`,
          newMsg,
        );

        setMessages(prevMessages => [...prevMessages, ...result.data.messages]);
      } catch (err) {
        console.log('Bir hata oluştu', err);
      } finally {
        setWritingLoading(false);
        setTimeout(() => {
          tarotSpreadScrollViewRef.current?.scrollToEnd({animated: true});
        }, 100);
      }
    }
  };
  const handleCompleted = () => {
    saveTarotSheetRef.current?.scrollTo(-SIZES.height / 2);
  };
  return (
    <>
      {readingStarted ? (
        <CartReveal route={route}/>
      ) : (
        <>
          <Image
            source={tarotSpreadBG}
            style={styles.tarotSpreadBG}
            resizeMode={'cover'}
          />
          <LinearGradient
            colors={[COLORS.black, COLORS.blackOpacity, COLORS.black]}
            style={styles.linearGradient}
          />
          <SafeAreaView style={{zIndex: 3}}>
            <CustomHeader leftIcon={true} title={false} rightIcon={true} />
            <Header route={route} />
            <Content />
            <FooterButtons />
          </SafeAreaView>
        </>
      )}
      <SafeAreaView>
        {!showOpenButton && messages.length > 0 && (
          <View style={styles.textFieldWrapper}>
            <View style={styles.textFieldContainer}>
              <TextInput
                placeholder= {i18n.t('TAROT_READ_START.START_INPUT', {locale: localeValue})}
                style={styles.questionInput}
                value={newMessage}
                onChangeText={setNewMessage}
                onSubmitEditing={handleSendMessage}
                returnKeyType="send"
                maxLength={50}
              />
              <TouchableOpacity onPress={handleSendMessage}>
                <Image
                  source={sendIcon}
                  style={styles.questionInputIcon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
            <Typography size="small">
             {i18n.t('TAROT_READ_START.SPREAD_QUESTION_COUNT', {locale: localeValue})}: 5/
              {messages.filter(msg => msg.role === 'user').length}
            </Typography>
            <Button
              text= {i18n.t('TAROT_READ_START.SPREAD_COMPLETED_BUTTON', {locale: localeValue})}
              variant="secondary"
              handlePress={handleCompleted}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default TarotSpreadWrapper;
