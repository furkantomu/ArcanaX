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
import Markdown, { MarkdownIt } from 'react-native-markdown-display';

const markdownStyles = {
  body: {color: COLORS.cream, fontSize: 15, fontFamily: 'NotoSerif-Regular'}, 
  strong: {color: COLORS.gold},
};

const CartReveal = () => {
  const {
    selectedCards,
    showOpenButton,
    setShowOpenButton,
    messages,
    setMessages,
    setSelectedCard,
    question,
    isWritingLoading,
    readingCompleted,
    readingType,
    setSpreadID,
    fetchTarotCard,
    setModalVisible,
  } = useTarotContext();
  const styles = getStyles();
  const scrollX = useSharedValue(0);
  const isFlipped = useSharedValue(false);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const {detailCardSheetRef} = useRefsContext();
  const haptic = useHaptic('soft');
  const navigation = useNavigation();
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
      MESSAGE = 'Genel Açılım';
    } else {
      MESSAGE = `${question}`;
    }

    setMessage(MESSAGE);
  }, [question, readingType, selectedCards]);
  useEffect(() => {
    if (!readingCompleted) {
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        Alert.alert(
          'Okuma Devam Ediyor',
          'Bu sayfadan çıkmak istediğinize emin misiniz?',
          [
            {text: 'Hayır', style: 'cancel'}, // Kullanıcı çıkışı iptal edebilir
            {
              text: 'Evet',
              onPress: () => {
                setModalVisible(true);
              },
            }, // Çıkışı onaylarsa devam eder
          ],
        );
      });

      return unsubscribe; 
    }
  }, [navigation, readingCompleted, setModalVisible]);
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const result = await apiService.post('/tarot/read/start', {
        readingType: getReadingTypeText(readingType),
        questions: message,
        tarotCards: selectedCards.map(card => card.engName),
      });
      setMessages(prevMessages => [...prevMessages, ...result.data.messages]);
      setSpreadID(result?.data.id);
    } catch (err) {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    detailCardSheetRef.current?.scrollTo(-SIZES.height / 1.2);
  };

  const handlePress = () => {
    if (!isFlipped.value) {
      isFlipped.value = !isFlipped.value;
    }
    setShowOpenButton(false);
    handleSendMessage();
    //isFlipped.value = !isFlipped.value;
    opacity.value = withDelay(
      300,
      withSpring(1, {damping: 12, stiffness: 100}),
    );
    scale.value = withDelay(300, withSpring(1, {damping: 12, stiffness: 100}));
    haptic?.();
  };

  const handleCardDetail = item => {
    setSelectedCard(item);
    fetchTarotCard(item.id, item.category);
    openModal();
  };
  return (
    <View style={styles.cardRevealbackgroundContent}>
      <LinearGradient
        colors={[COLORS.black, COLORS.blackOpacity, COLORS.black]}
        style={styles.linearGradient}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        locations={[0.05, 0.5, 0.95]}
      />
      <Image
        source={tarotSpreadBG}
        style={styles.tarotSpreadBG}
        resizeMode={'cover'}
        blurRadius={5}
      />
      <View style={styles.cardRevealHeader}>
        <Text style={styles.cardRevealHeaderText}>
          Seçilen Kartlar Açmak İçin Dokun
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
            <Text style={styles.isFlippedAllButtonText}>Okumayı Başlat</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.selectedCards}>
        {selectedCards.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleCardDetail(item)}>
            <Animated.View style={[styles.badge, animatedBadgeStyle]}>
              <Text style={styles.badgeText}>{item.name}</Text>
              <Text style={styles.badgeTextEng}>({item.engName})</Text>
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
      {isWritingLoading && (
        <View style={styles.writingLoading}>
          <Loading />
        </View>
      )}
    </View>
  );
};

export default CartReveal;
