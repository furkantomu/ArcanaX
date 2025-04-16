import {ActivityIndicator, Image, Pressable, View} from 'react-native';
import React, {useEffect} from 'react';
import {TAROTCARD} from '@/utils/dummy';
import {getStyles} from '../styles';
import {Typography} from '@/components';
import {useNavigation} from '@react-navigation/native';
import {useTarotDetailContext} from '../TarotDetailScreenContext';
import {useAppSelector} from '@/hooks';
import FastImage from 'react-native-fast-image';

type TarotCardType = 'major' | 'cups' | 'pentacles' | 'swords' | 'wands';

interface TarotCardListProps {
  type: TarotCardType;
}

const Card: React.FC<TarotCardListProps> = ({type}) => {
  const {loading, cards, getFilteredTarotCards} = useTarotDetailContext();
  const {localeValue} = useAppSelector(state => state.settings);
  const navigation = useNavigation();
  const styles = getStyles();

  useEffect(() => {
    getFilteredTarotCards(type);
  }, [type]);

  return (
    <View style={[styles.cardContainer]}>
      {loading ? (
        <ActivityIndicator size={'large'} style={styles.loading} />
      ) : (
        cards?.map((card, index) => (
          <Pressable
            key={index}
            style={{alignItems: 'center'}}
            onPress={() =>
              navigation.navigate('TarotCardDetail', {
                id: card.id,
                category: card.category,
              })
            }>
            <FastImage
              source={{
                uri: card?.frontImageSource,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
              style={[styles.cardImage]}
            />

            <Typography>
              {localeValue === 'tr' ? card.name : card.engName}
            </Typography>
          </Pressable>
        ))
      )}
    </View>
  );
};

export default Card;
