import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import {getStyles} from '../style';
import Card from './Card';
import {useTarotContext} from '../TarotContext';
import { SIZES } from '@/styles/theme';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

interface TarotCard {
  id: number;
  name: string;
  engName: string;
  category: 'swords' | 'wands' | 'cups' | 'pentacles' | 'major';
  frontImageSource: string;
  backImageSource: any;
}

const CartSelection = () => {
  const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([]);
  const {tarotCards} = useTarotContext();
  const styles = getStyles();
  const {localeValue} = useAppSelector(state => state.settings);
  const rightArrows = require('../../../../assets/icon/rightArrows.png');
  const back = require('../../../../assets/card/back.webp');

  useEffect(() => {
    const shuffleArray = (array: TarotCard[]): TarotCard[] => {
      if (!array || array.length === 0) return [];
      
      let shuffledArray = [...array]; // Don't modify the original array
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Select a random index
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ]; // Swap elements
      }
      return shuffledArray;
    };

    if (tarotCards && tarotCards.length > 0) {
      setShuffledCards(shuffleArray(tarotCards));
    }
  }, [tarotCards]);

  const renderCard = ({item}: {item: TarotCard}) => (
    <Card backImageSource={back} item={item} />
  );

  const keyExtractor = (item: TarotCard) => item.id.toString();

  return (
    <>
      <FlatList
        data={shuffledCards}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SIZES.width * 0.7 + 12}
        scrollEventThrottle={16}
        snapToAlignment="center"
        bounces={false}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatList}
        renderItem={renderCard}
      />

      <View style={styles.scrollInfo}>
        <Image
          source={rightArrows}
          style={[styles.scrollInfoRightArrows, styles.rotate]}
        />
        <Text style={styles.scrollInfoText}>
          {i18n.t('TAROT_READ_START.SLIDER', {locale: localeValue})}
        </Text>
        <Image source={rightArrows} style={styles.scrollInfoRightArrows} />
      </View>
    </>
  );
};

export default CartSelection;