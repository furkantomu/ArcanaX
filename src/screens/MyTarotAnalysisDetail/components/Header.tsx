import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getStyles} from '../styles';
import {useMyTarotAnalysisDetailContext} from '../MyTarotAnalysisDetailContext';
import FastImage from 'react-native-fast-image';
import {Button, Icon, IconButton, Typography} from '@/components';
import {Pressable, TextInput} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {balanceActions} from '@/store/balance/balanceActions';
import i18n from '@/i18n';
import {apiService} from '@/services/APIService';
import Animated, {
  FadeInDown,
  FadeOutUp,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import {useScaleAnimation} from '@/utils';
import {COLORS} from '@/styles/theme';

const Header = () => {
  const styles = getStyles();
  const {
    tarotCards,
    handleInputChange,
    userInputs,
    setStartReading,
    startReading,
    loading,
    setLoading,
    setMessages,
    opacity,
    scale,
    setSpreadID,
    fetchTarotCard,
    tarotCardDetail,
    detailLoading,
  } = useMyTarotAnalysisDetailContext();
  const {user} = useAppSelector(state => state.auth);
  const {localeValue} = useAppSelector(state => state.settings);
  const {handlers, animatedStyle} = useScaleAnimation();
  const dispatch = useAppDispatch();
  const [activeInfo, setActiveInfo] = useState(false);

  const handleSendMessage = async () => {
    //if (!userInputs.trim()) return;
    try {
      setLoading(true);
      const response = await apiService.post<{
        id: string;
        userId: string;
        messages: [
          {
            role: string;
            content: string;
          },
        ];
      }>('/tarot/analysis/start', {
        questions: userInputs,
        tarotCard: tarotCards.cardName,
      });
      setMessages(prev => [
        ...prev,
        ...response.data.messages.map(chatMessage => ({
          content: chatMessage.content,
          role: chatMessage.role,
        })),
      ]);
      setSpreadID(response.data.id);
      setStartReading(true);
      const balanceData = {
        userId: String(user?.id),
        accountId: String(user?.accountId),
        balance: Number(-4),
        amount: 0,
        transactionId: '',
        appTransactionId: '',
        originalTransactionId: '',
        storefrontId: '',
        productId: '',
      };
      await dispatch(balanceActions.addBalance(balanceData));
    } catch (err) {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: 'assistant',
          content: i18n.t('NOT_CONNECT', {locale: localeValue}),
        },
      ]);
    } finally {
      await dispatch(
        balanceActions.getBalance({accountId: String(user?.accountId)}),
      );
      setLoading(false);
      opacity.value = withDelay(
        300,
        withSpring(1, {damping: 12, stiffness: 100}),
      );
      scale.value = withDelay(
        300,
        withSpring(1, {damping: 12, stiffness: 100}),
      );
    }
  };
  return (
    <View style={styles.headerWrapper}>
      <Animated.View style={[styles.editIconWrapper, animatedStyle]}>
        <Pressable
          style={styles.editIconBtn}
          onPress={() => {
            fetchTarotCard(tarotCards.cardId);
            setActiveInfo(true);
          }}
          {...handlers}>
          <Icon name="info" style={styles.editIcon} />
        </Pressable>
      </Animated.View>
      <FastImage
        source={{
          uri: tarotCards.image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.image}
      />
      {activeInfo && (
        <Animated.View
          entering={FadeInDown.duration(500).springify().damping(12)}
          exiting={FadeOutUp.duration(300)}
          style={styles.fullscreenInputWrapper}>
          {activeInfo &&
            (detailLoading ? (
              <ActivityIndicator />
            ) : (
              <Typography size="medium" style={{textAlign: 'center'}}>
                {tarotCardDetail?.details.description}
              </Typography>
            ))}
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.8}
            onPress={() => setActiveInfo(false)}>
            <Typography
              weight="bold"
              style={{
                textAlign: 'center',
                color: COLORS.black,
                fontWeight: 'bold',
              }}>
              {localeValue === 'tr' ? 'Kapat' : 'Close'}
            </Typography>
          </TouchableOpacity>
        </Animated.View>
      )}

      <Typography>{tarotCards.cardName}</Typography>
      {!startReading && (
        <>
          <TextInput
            style={styles.textArea}
            value={userInputs}
            onChangeText={handleInputChange}
            placeholder={
              localeValue === 'tr'
                ? 'Kartla ilgili düşüncelerini yaz...'
                : 'Write your thoughts about the card...'
            }
            placeholderTextColor="#b3b3b3c2"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <IconButton
            iconName="token"
            iconSize={32}
            text={localeValue === 'tr' ? 'Başla (4 Jeton)' : 'Begin (4 Tokens)'}
            buttonStyle={styles.startBtn}
            iconStyle={styles.startBtnIcon}
            handlePress={() => handleSendMessage()}
            disabled={loading}
          />
        </>
      )}
      {loading && <ActivityIndicator size={'large'} style={{marginTop: 70}} />}
    </View>
  );
};

export default Header;
