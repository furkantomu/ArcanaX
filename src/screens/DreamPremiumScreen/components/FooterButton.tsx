import {View} from 'react-native';
import React from 'react';
import {getStyles} from '../styles';
import {Button} from '@/components';
import {useDreamContext} from '../DreamScreenContext';
import {apiService} from '@/services/APIService';
import {SIZES} from '@/styles/theme';
import {useRefsContext} from '@/context';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const FooterButton = () => {
  const styles = getStyles();
  const {messages, dream, setMessages, setSpreadID, setLoading, loading} =
    useDreamContext();
  const {saveDreamSheetRef} = useRefsContext();
  const {localeValue} = useAppSelector(state => state.settings);

  const handlePress = async (params: string) => {
    if (params === 'completed') {
      saveDreamSheetRef.current?.scrollTo(-SIZES.height / 2);
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
          text={i18n.t('DREAM_PREMIUM_SCREEN.CONFIRM_BUTTON_TEXT', {locale: localeValue})}
          variant={'secondary'}
          handlePress={() => handlePress('completed')}
        />
      ) : (
        <Button
          disabled={dream === '' || loading}
          text={i18n.t('DREAM_PREMIUM_SCREEN.BUTTON_TEXT', {locale: localeValue})}
          variant={'secondary'}
          handlePress={() => handlePress('send')}
        />
      )}
    </View>
  );
};

export default FooterButton;
