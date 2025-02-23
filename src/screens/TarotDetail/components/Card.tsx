import {ActivityIndicator, Image, Pressable, View} from 'react-native';
import React, {useEffect} from 'react';
import {TAROTCARD} from '@/utils/dummy';
import {getStyles} from '../styles';
import {Typography} from '@/components';
import {useNavigation} from '@react-navigation/native';
import {useTarotDetailContext} from '../TarotDetailScreenContext';

type TarotCardType = 'major' | 'cups' | 'pentacles' | 'swords' | 'wands';

interface TarotCardListProps {
  type: TarotCardType;
}

const Card: React.FC<TarotCardListProps> = ({type}) => {
  const {loading, cards, getFilteredTarotCards} = useTarotDetailContext();
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
            <Image
              source={{uri: card.frontImageSource}}
              style={[styles.cardImage]}
            />
            <Typography>{card.name}</Typography>
          </Pressable>
        ))
      )}
    </View>
  );
};

export default Card;
