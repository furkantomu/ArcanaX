import {Loading} from '@/components';
import {COLORS, SIZES} from '@/styles/theme';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import SpinningCard from './components/SpinningCard';
import {useTarotContext} from './TarotContext';

import {getStyles} from './style';
import {useRefsContext} from '@/context';
import {useHaptic} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import {getReadingTypeText} from '@/utils/getReadingTypeText';
import {apiService} from '@/services/APIService';
import Markdown, {MarkdownIt} from 'react-native-markdown-display';
import {SafeAreaView} from 'react-native-safe-area-context';
import i18n from '@/i18n';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {balanceActions} from '@/store/balance/balanceActions';

const markdownStyles = {
  body: {color: COLORS.cream, fontSize: 15, fontFamily: 'NotoSerif-Regular'},
  strong: {color: COLORS.gold},
};

const CartReveal = ({route}) => {
  const {
    selectedCards,
    showOpenButton,
    setShowOpenButton,
    messages,
    setMessages,
    question,
    isWritingLoading,
    readingCompleted,
    readingType,
    setSpreadID,
    fetchTarotCard,
    setReadingCompleted,
  } = useTarotContext();
  const styles = getStyles();
  const scrollX = useSharedValue(0);
  const isFlipped = useSharedValue(false);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const {detailCardSheetRef, saveTarotSheetRef} =
    useRefsContext();
  const {localeValue} = useAppSelector(state => state.settings);
  const {user} = useAppSelector(state => state.auth);
  const haptic = useHaptic('soft');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const tarotSpreadBG = require('../../../assets/background/tarotspread5.webp');
  const back = require('../../../assets/card/back.webp');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e: any) => {
      scrollX.value = e.contentOffset.x / (SIZES.width * 0.7 + 12);
    },
  });

  const animatedBadgeStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });
  useEffect(() => {
    let MESSAGE = '';
    if (question === '') {
      if (readingType === 6) {
        MESSAGE =
          localeValue === 'tr' ? 'İlişki okuması' : 'Relationship Reading';
      }
      MESSAGE = localeValue === 'tr' ? 'Genel Açılım' : 'General Spread';
    } else {
      MESSAGE = `${question}`;
    }

    setMessage(MESSAGE);
  }, [localeValue, question, readingType, selectedCards]);
  useEffect(() => {
    if (!readingCompleted && !showOpenButton) {
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        Alert.alert(
          i18n.t('ALERT.TITLE', {locale: localeValue}),
          i18n.t('ALERT.DESCRIPTION', {locale: localeValue}),
          [
            {text: i18n.t('ALERT.NO', {locale: localeValue}), style: 'cancel'},
            {
              text: i18n.t('ALERT.YES', {locale: localeValue}),
              onPress: () => {
                saveTarotSheetRef.current?.scrollTo(-SIZES.height / 1.2);
              },
            }, // Çıkışı onaylarsa devam eder
          ],
        );
      });

      return unsubscribe;
    }
  }, [
    localeValue,
    navigation,
    readingCompleted,
    saveTarotSheetRef,
    showOpenButton,
  ]);
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const result = await apiService.post('/tarot/read/start', {
        readingType: getReadingTypeText(readingType, localeValue),
        questions: message,
        tarotCards: selectedCards.map(card => card.engName),
      });
      setMessages(prevMessages => [...prevMessages, ...result.data.messages]);
      setSpreadID(result?.data.id);

      const data = {
        userId: String(user?.id),
        accountId: String(user?.accountId),
        balance: Number(-route.params.price),
        amount: 0,
        transactionId: '',
        appTransactionId: '',
        originalTransactionId: '',
        storefrontId: '',
        productId: '',
      };
      await dispatch(balanceActions.addBalance(data));
    } catch (err) {
      setError('Bir hata oluştu');
      setReadingCompleted(true);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: 'assistant',
          content: i18n.t('NOT_CONNECT', {locale: localeValue}),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    detailCardSheetRef.current?.scrollTo(-SIZES.height / 1.2);
  };

  const handlePress = async () => {
    const {balance} = await dispatch(
      balanceActions.getBalance({accountId: String(user?.accountId)}),
    ).unwrap();
    if (Number(balance.totalBalance) < Number(route.params.price)) {
      Alert.alert(
        i18n.t('BALANCE_CONTROL.TITLE', {
          locale: localeValue,
        }),
        i18n.t('BALANCE_CONTROL.DESCRIPTION', {
          locale: localeValue,
        }),
        [
          {
            text: i18n.t('BALANCE_CONTROL.CANCEL', {
              locale: localeValue,
            }),
            style: 'cancel',
          },
          {
            text: i18n.t('BALANCE_CONTROL.BUY', {
              locale: localeValue,
            }),
            onPress: () =>
              navigation.navigate('PurchasingScreen')
          },
        ],
      );
      return;
    }
    if (!isFlipped.value) {
      isFlipped.value = !isFlipped.value;
    }
    setShowOpenButton(false);
    handleSendMessage();
    opacity.value = withDelay(
      300,
      withSpring(1, {damping: 12, stiffness: 100}),
    );
    scale.value = withDelay(300, withSpring(1, {damping: 12, stiffness: 100}));
    haptic?.();
  };

  const handleCardDetail = item => {
    fetchTarotCard(item.id);
    openModal();
  };
  return (
    <View style={styles.cardRevealbackgroundContent}>
      <LinearGradient
        colors={[COLORS.black, COLORS.blackOpacity, COLORS.black]}
        style={styles.linearGradient}
      />
      <Image
        source={tarotSpreadBG}
        style={styles.tarotSpreadBG}
        resizeMode={'cover'}
        blurRadius={5}
      />
      <SafeAreaView style={{zIndex: 2}}>
        <View style={styles.cardRevealHeader}>
          <Text style={styles.cardRevealHeaderText}>
            {i18n.t('TAROT_READ_START.SPREAD_TITLE', {locale: localeValue})}
          </Text>
        </View>
        <Animated.FlatList
          data={selectedCards}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SIZES.width * 0.7 + 12}
          onScroll={onScrollHandler}
          contentContainerStyle={styles.spinningCardFlatList}
          renderItem={({item, index}) => (
            <SpinningCard
              backImageSource={back}
              frontImageSource={String(item.frontImageSource)}
              index={index}
              isFlippedAll={isFlipped}
              item={item}
            />
          )}
        />
        {showOpenButton && (
          <View style={styles.isFlippedAllButtonContainer}>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.isFlippedAllButton}
              //</View>disabled={isFlipped.value}
            >
              <Text style={styles.isFlippedAllButtonText}>
                {i18n.t('TAROT_READ_START.SPREAD_BUTTON', {
                  locale: localeValue,
                })}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.selectedCards}>
          {selectedCards.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardDetail(item)}>
              <Animated.View style={[styles.badge, animatedBadgeStyle]}>
                <Text style={styles.badgeText}>
                  {localeValue === 'tr' ? item.name : item.engName}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
        {loading && (
          <View style={styles.startLoading}>
            <ActivityIndicator size="large" color={COLORS.cream} />
          </View>
        )}

        {messages.map((item, idx) => (
          <Animated.View
            style={[styles.resultContainer, animatedBadgeStyle]}
            key={idx}>
            <View
              style={[
                styles.result,
                item.role === 'user' ? styles.selfMessage : styles.otherMessage,
              ]}>
              <Markdown
                markdownit={MarkdownIt({
                  typographer: true,
                  linkify: true,
                  breaks: true,
                }).disable(['blockquote', 'list', 'code'])}
                //rules={rules}
                style={markdownStyles}>
                {item.content}
              </Markdown>
            </View>
          </Animated.View>
        ))}
      </SafeAreaView>
      {isWritingLoading && (
        <View style={styles.writingLoading}>
          <Loading />
        </View>
      )}
    </View>
  );
};

export default CartReveal;
