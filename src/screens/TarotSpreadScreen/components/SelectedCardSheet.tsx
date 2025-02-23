import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {SIZES} from '@/styles/theme';

import {getStyles} from '../style';
import Card from './Card';
import {useTarotContext} from '../TarotContext';

const CartSelection = () => {
  const [shuffledCards, setShuffledCards] = useState<any>([]);
  const {tarotCards} = useTarotContext();
  const styles = getStyles();
  const scrollX = useSharedValue(0);

  const rightArrows = require('../../../../assets/icon/rightArrows.png');
  const back = require('../../../../assets//card/back.webp');


  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e: any) => {
      scrollX.value = e.contentOffset.x / (SIZES.width * 0.7 + 12);
    },
  });

  useEffect(() => {
    const shuffleArray = (array: any) => {
      let shuffledArray = [...array]; // orijinal diziyi değiştirmemek için bir kopyasını al
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // rastgele bir index seç
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ]; // öğeleri yer değiştir
      }
      return shuffledArray;
    };

    setShuffledCards(shuffleArray(tarotCards));
  }, [tarotCards]);
  return (
    <View>
      <Animated.FlatList
        data={shuffledCards}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SIZES.width * 0.7 + 12}
        onScroll={onScrollHandler}
        contentContainerStyle={styles.flatList}
        renderItem={({item, index}) => (
          <Card
            key={index}
            backImageSource={back}
            index={index}
            item={item}
          />
        )}
      />

      <View style={styles.scrollInfo}>
        <Image
          source={rightArrows}
          style={[styles.scrollInfoRightArrows, styles.rotate]}
        />
        <Text style={styles.scrollInfoText}>Yana Kaydır</Text>
        <Image source={rightArrows} style={styles.scrollInfoRightArrows} />
      </View>
    </View>
  );
};
export default CartSelection;
