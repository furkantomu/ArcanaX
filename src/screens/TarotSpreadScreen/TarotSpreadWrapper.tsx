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
import SaveModal from './components/SaveModal';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '@/styles/theme';

const tarotSpreadBG = require('../../../assets/background/tarotspread.webp');

const TarotSpreadWrapper = ({route}: any) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const {tarotSpreadScrollViewRef} = useRefsContext();
  const {
    spreadID,
    readingStarted,
    messages,
    setMessages,
    showOpenButton,
    setWritingLoading,
    setModalVisible,
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
      if (selfCount === 10) {
        Alert.alert(
          'Tarot Okuması Tamamlandı',
          'Maksimum soru hakkınızı kullandınız. Yeni bir okuma yapmak için mevcut oturumu sonlandırmalısınız.',
          [{text: 'Tamam'}],
        );
        return;
      }

      setMessages(prevMessages => [...prevMessages, newMsg]);
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
    setModalVisible(true);
  };
  return (
    <>
      {readingStarted ? (
        <CartReveal />
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
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            locations={[0.05, 0.5, 0.95]}
          />
          <SafeAreaView>
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
                placeholder="Bir soru sor..."
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
              Soru Sayısı: 10/
              {messages.filter(msg => msg.role === 'user').length}
            </Typography>
            <Button
              text="Okumayı Bitir"
              variant="secondary"
              handlePress={handleCompleted}
            />
          </View>
        )}
        <SaveModal />
      </SafeAreaView>
    </>
  );
};

export default TarotSpreadWrapper;
