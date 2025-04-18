import {useRefsContext} from '@/context';
import {SIZES} from '@/styles/theme';
import {useHaptic} from '@/utils';
import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {getStyles} from '../style';
import {useTarotContext} from '../TarotContext';
import FastImage from 'react-native-fast-image';

interface TarotCard {
  id: number;
  name: string;
  engName: string;
  category: 'swords' | 'wands' | 'cups' | 'pentacles' | 'major';
  frontImageSource: string;
  backImageSource: ImageSourcePropType;
}

interface SpinningCardProps {
  backImageSource: ImageSourcePropType;
  frontImageSource: string;
  item: TarotCard;
  index: number;
  isFlippedAll: SharedValue<boolean>; // useSharedValue kullanıldığı için
}

const SpinningCard: React.FC<SpinningCardProps> = ({
  backImageSource,
  frontImageSource,
  item,
  index,
  isFlippedAll,
}) => {
  const styles = getStyles();
  const isFlipped = useSharedValue(false);
  const {fetchTarotCard} = useTarotContext();
  const {detailCardSheetRef} = useRefsContext();
  const haptic = useHaptic('soft');

  const openModal = () => {
    detailCardSheetRef.current?.scrollTo(-SIZES.height / 1.2);
  };
  const handlePress = () => {
    haptic?.();
    if (!isFlipped.value) {
      isFlipped.value = !isFlipped.value;
    } else {
      fetchTarotCard(item.id, item.category);
      openModal();
    }
    //isFlipped.value = !isFlipped.value;
  };

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const duration = 1000;

    const spinValue = interpolate(
      Number(isFlipped.value || isFlippedAll.value),
      [0, 1],
      [0, 180],
    );
    const rotateValue = withTiming(`${spinValue}deg`, {duration});

    return {
      transform: [{rotateY: rotateValue}],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const duration = 1000;
    const spinValue = interpolate(
      Number(isFlipped.value || isFlippedAll.value),
      [0, 1],
      [-180, 0],
    );
    const rotateValue = withTiming(`${spinValue}deg`, {duration});

    return {
      transform: [{rotateY: rotateValue}],
    };
  });

  return (
    <Animated.View key={index} style={[styles.cardContainer]}>
      <Animated.View style={[styles.regularCard, regularCardAnimatedStyle]}>
        <TouchableOpacity onPress={handlePress} activeOpacity={1}>
          <Image
            source={backImageSource}
            style={styles.spinningCard}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.flippedCard, flippedCardAnimatedStyle]}>
        <TouchableOpacity onPress={handlePress} activeOpacity={1}>
          <FastImage
            source={{
              uri: frontImageSource,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.spinningCard}
          />
        </TouchableOpacity>
        {/* <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardEngName}>({item.engName})</Text> */}
      </Animated.View>
    </Animated.View>
  );
};

export default SpinningCard;
