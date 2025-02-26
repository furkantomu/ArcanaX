import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';

import {getStyles} from '../style';
import Card from './Card';
import {useTarotContext} from '../TarotContext';
import { FlatList } from 'react-native-gesture-handler';

const CartSelection = () => {
  const [shuffledCards, setShuffledCards] = useState<any>([]);
  const {tarotCards} = useTarotContext();
  const styles = getStyles();

  const rightArrows = require('../../../../assets/icon/rightArrows.png');
  const back = require('../../../../assets//card/back.webp');


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
    <>
      <FlatList
        data={shuffledCards}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        //onScroll={onScrollHandler}
        scrollEventThrottle={1000 / 60}
        snapToAlignment="center"
        bounces={false}
        keyExtractor={item => item.id}
       contentContainerStyle={styles.flatList}
        renderItem={({item, index}) => (
          <Card key={index} backImageSource={back} index={index} item={item} />
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
    </>
  );
};
export default CartSelection;
