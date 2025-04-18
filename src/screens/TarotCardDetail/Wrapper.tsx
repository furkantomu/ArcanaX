import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Card, CARD_HEIGHT} from './Component/Card';
import Fab from './Component/Fab';

import {Button, CustomHeader} from '@/components';

import {useTarotDetailContext} from './TarotDetailScreenContext';
import {useAppSelector} from '@/hooks';

import {COLORS, SIZES} from '@/styles/theme';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

const Wrapper = () => {
  const {fetchTarotCards, cards} = useTarotDetailContext();
  const {localeValue} = useAppSelector(state => state.settings);
  const shuffleBack = useSharedValue(false);
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    name: string;
    engName: string;
  } | null>(null);
  const navigation = useNavigation();
  useEffect(() => {
    fetchTarotCards();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={styles.bgWrapper}>
        <Image
          source={require('../../../assets/image1_0.jpg')}
          style={styles.bg}
          blurRadius={0}
        />

        <FlatList
          data={cards}
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
          contentContainerStyle={{flex: 1, zIndex: 30}}
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
      <Fab />
      {cards.length > 0 && (
        <View style={styles.detailButton}>
          <Button
            text={
              selectedCard
                ? localeValue === 'tr'
                  ? selectedCard.name
                  : selectedCard.engName
                : 'Card Selected'
            }
            variant="secondary"
            buttonStyle={styles.btn}
            disabled={!selectedCard}
            handlePress={() =>
              navigation.navigate('TarotCardDetailDescription', {
                id: selectedCard?.id,
              })
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: SIZES.width,
    height: SIZES.height / 2,
    zIndex: 0,
    position: 'absolute',
  },
  bgWrapper: {
    height: SIZES.height / 2,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.95,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 0,
  },
  detailButton: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems:'center',
    zIndex: 30,
  },
  btn: {
    width: SIZES.width / 2,
    zIndex: 90,
  },
});

export default Wrapper;
