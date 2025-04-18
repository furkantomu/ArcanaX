import {View, Text, Image, ViewToken} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getStyles} from '../styles';
import {useMyTarotReadingContext} from '../MyTarotReadingContext';
import {Card, CARD_HEIGHT} from './Card';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import {SIZES} from '@/styles/theme';

const Header = () => {
  const {fetchTarotCards, tarotCards, selectedCards} =
    useMyTarotReadingContext();
  const shuffleBack = useSharedValue(false);
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    name: string;
    engName: string;
  } | null>(null);
  const styles = getStyles();
  useEffect(() => {
    fetchTarotCards();
  }, []);
  return (
    <View style={{height: SIZES.height / 2}}>
      <View style={styles.bgWrapper}>
        <Image
          source={require('../../../../assets/image1_0.jpg')}
          style={styles.bg}
        />
      </View>
      <FlatList
        //data={tarotCards.filter(i => i.category === 'cups')}
        data={tarotCards}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <Card
            card={item}
            onSelect={(id: string, name: string, engName: string) =>
              setSelectedCard({id, name, engName})
            }
            key={index}
            index={index}
            shuflleback={shuffleBack}
          />
        )}
        contentContainerStyle={{flex: 1}}
        onEndReached={() => {
          console.log('More items are loaded or reached end.');
        }}
        removeClippedSubviews={true} // render dışındakileri kes
        windowSize={5} // belki 7'ye çıkarılabilir (yüksek çözünürlük cihazlarda)
        initialNumToRender={3} // 5 çok olabilir, 3 idealdir
        maxToRenderPerBatch={3} // aynı şekilde batch’leri küçült
        updateCellsBatchingPeriod={150} // render arası bekleme süresi (ms)
        scrollEnabled={false}
        getItemLayout={(data, index) => ({
          length: CARD_HEIGHT, // Kart yüksekliği
          offset: 0, // Kartların kaydırma mesafesi
          index, // Kart sırası
        })}
      />
    </View>
  );
};

export default Header;
