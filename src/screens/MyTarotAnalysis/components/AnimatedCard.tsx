import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  View,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {COLORS, FONTS, SIZES} from '@/styles/theme';
import {useMyTarotAnalysisContext} from '../MyTarotAnalysisContext';
import {Button, IconButton, Typography} from '@/components';
import {useHaptic} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@/hooks';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = 110;
const CARD_HEIGHT = 140;
const CENTER_X = width / 2.2 - CARD_WIDTH / 3;
const CENTER_Y = height / 3 - CARD_HEIGHT / 2;

const getCardPositions = () => [
  {x: CENTER_X, y: CENTER_Y},
  {x: CENTER_X, y: CENTER_Y + CARD_HEIGHT + 20},
  {x: CENTER_X - CARD_WIDTH - 20, y: CENTER_Y},
  {x: CENTER_X + CARD_WIDTH + 20, y: CENTER_Y},
  {x: CENTER_X, y: CENTER_Y - CARD_HEIGHT - 20},
];

const AnimatedCard = () => {
  const positions = getCardPositions();
  const {localeValue} = useAppSelector(state => state.settings);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeInfo, setActiveInfo] = useState(false);
  const [activeEditIndex, setActiveEditIndex] = useState(null);

  const displayMode = useSharedValue<'none' | 'flex' | 'contents'>('none');
  const backdrop_zIndex = useSharedValue(1);
  const haptic = useHaptic('soft');
  const translateX = positions.map(() => useSharedValue(width / 2));
  const translateY = positions.map(() => useSharedValue(height + 200));
  const card_width = positions.map(() => useSharedValue(CARD_WIDTH));
  const card_height = positions.map(() => useSharedValue(CARD_HEIGHT));
  const card_zIndex = positions.map(() => useSharedValue(1));
  const card_scale = positions.map(() => useSharedValue(1));
  const opacity = positions.map(() => useSharedValue(0));
  const navigation = useNavigation();

  const {tarotCards, fetchTarotCard, tarotCardDetail, loading} =
    useMyTarotAnalysisContext();

  useEffect(() => {
    positions.forEach((pos, i) => {
      translateX[i].value = withDelay(
        i * 200,
        withTiming(pos.x, {duration: 500, easing: Easing.out(Easing.exp)}),
      );
      translateY[i].value = withDelay(
        i * 200,
        withTiming(pos.y, {duration: 500, easing: Easing.out(Easing.exp)}),
      );
      opacity[i].value = withDelay(i * 200, withTiming(1, {duration: 400}));
    });
  }, []);

  const backDropStyle = useAnimatedStyle(() => ({
    zIndex: backdrop_zIndex.value,
    display: displayMode.value,
  }));

  const expandCard = (index: any) => {
    setActiveIndex(index);
    displayMode.value = 'flex';
    backdrop_zIndex.value = withTiming(30 + index, {duration: 10});
    translateX[index].value = withTiming(width / 2 - 150);
    translateY[index].value = withTiming(height / 3 - 200);
    card_width[index].value = withTiming(300);
    card_height[index].value = withTiming(400);
    card_zIndex[index].value = withTiming(30 + index, {duration: 10});
    card_scale.forEach((s, i) => (s.value = withTiming(i === index ? 1 : 0.8)));
  };

  const collapseCard = (index: any) => {
    setActiveIndex(null);
    setActiveEditIndex(null);
    displayMode.value = 'none';
    backdrop_zIndex.value = withTiming(0, {duration: 10});
    translateX[index].value = withTiming(positions[index].x);
    translateY[index].value = withTiming(positions[index].y);
    card_width[index].value = withTiming(CARD_WIDTH);
    card_height[index].value = withTiming(CARD_HEIGHT);
    card_zIndex[index].value = withTiming(index, {duration: 10});
    card_scale.forEach(s => (s.value = withTiming(1)));
  };

  const handleStart = () => {
    navigation.navigate('MyTarotAnalysisDetail', {
      card: {
        cardName:
          localeValue === 'tr'
            ? tarotCards[Number(activeIndex)]?.name
            : tarotCards[Number(activeIndex)]?.engName,
        cardId: tarotCards[Number(activeIndex)]?.id,
        image: tarotCards[Number(activeIndex)]?.frontImageSource,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.backdrop, backDropStyle]}>
        <Pressable
          style={{flex: 1}}
          onPress={() => collapseCard(Number(activeIndex))}
        />
        <View style={[styles.continuebtnWrapper]}>
          <Button
            text={
              localeValue === 'tr'
                ? `Devam (${tarotCards[Number(activeIndex)]?.name})`
                : `Continue (${tarotCards[Number(activeIndex)]?.engName})`
            }
            buttonStyle={styles.continuebtn}
            variant="secondary"
            handlePress={handleStart}
          />
        </View>
      </Animated.View>
      {positions.map((_, i) => {
        const style = useAnimatedStyle(() => ({
          transform: [
            {translateX: translateX[i].value},
            {translateY: translateY[i].value},
            {scale: card_scale[i].value},
          ],
          opacity: opacity[i].value,
          width: card_width[i].value,
          height: card_height[i].value,
          zIndex: card_zIndex[i].value,
        }));

        return (
          <Animated.View key={i} style={[styles.card, style]}>
            <Pressable
              onPress={() => {
                haptic?.();
                expandCard(i);
              }}>
              <FastImage
                source={{
                  uri: tarotCards[i]?.frontImageSource,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.image}
              />
            </Pressable>

            {activeIndex === i && (
              <View style={styles.cardButtonWrapper}>
                <IconButton
                  iconName="info"
                  iconSize={20}
                  text=""
                  buttonStyle={styles.plusButton}
                  disabled={loading}
                  handlePress={() => {
                    fetchTarotCard(tarotCards[i].id);
                    setActiveInfo(true);
                    setActiveEditIndex(i);
                  }}
                />

                <Button
                  text="X"
                  buttonStyle={styles.hideButton}
                  handlePress={() => collapseCard(i)}
                  variant="secondary"
                />
              </View>
            )}

            {activeEditIndex === i && (
              <Animated.View
                entering={FadeInDown.duration(500).springify().damping(12)}
                exiting={FadeOutUp.duration(300)}
                style={styles.fullscreenInputWrapper}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setActiveEditIndex(null)}>
                  <Typography>X</Typography>
                </TouchableOpacity>

                {activeInfo &&
                  (loading ? (
                    <ActivityIndicator />
                  ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <Typography>
                        {tarotCardDetail.details.description}
                      </Typography>
                    </ScrollView>
                  ))}
              </Animated.View>
            )}
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {height: SIZES.height / 1.5, zIndex: 3},
  backdrop: {
    position: 'absolute',
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: COLORS.blackOpacity1,
    top: 0,
  },
  continuebtnWrapper: {
    height: 50,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    bottom: 170,
  },
  continuebtn: {
    width: 250,
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {width: '100%', height: '100%'},
  cardButtonWrapper: {
    position: 'absolute',
    right: 10,
    top: -50,
    flexDirection: 'row',
    gap: 20,
  },
  plusButton: {
    width: 40,
    height: 40,
    zIndex: 30,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  hideButton: {width: 40, height: 40, zIndex: 30, borderRadius: 20},
  fullscreenInputWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 400,
    backgroundColor: '#171616e8',
    padding: 20,

    zIndex: 99,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.silverGray,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#787777',
    borderRadius: 16,
    width: 25,
    height: 25,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedCard;
