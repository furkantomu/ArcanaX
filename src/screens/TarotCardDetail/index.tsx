import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp, useRoute} from '@react-navigation/native';

import {getStyles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '@/styles/theme';
import {CustomHeader, Icon, Typography} from '@/components';
import {apiService} from '@/services/APIService';
import {
  getImageForCardElement,
  getImageForCardNumber,
  getImageForCardZodiac,
} from '@/utils/getImageForNumber';

type TarotCard = {
  id: string;
  name: string;
  category: 'swords' | 'wands' | 'cups' | 'pentacles' | 'major';
  engName: string;
  frontImageSource: string;
  details: {
    number: string;
    zodiac: string;
    element: string;
    planet: string;
    title: string;
    description: string;
  };
};

const planet = require('../../../assets/card/planet/galaxy.png');

type RootStackParamList = {
  TarotCardDetail: {id: string; category: string};
};

type TarotCardScreenRouteProp = RouteProp<
  RootStackParamList,
  'TarotCardDetail'
>;

const TarotCardDetail = () => {
  const [card, setCard] = useState<TarotCard>();
  const [loading, setLoading] = useState({});
  console.log('card', card?.details.number);
  const {params} = useRoute<TarotCardScreenRouteProp>();
  const {id, category} = params;
  const styles = getStyles();

  useEffect(() => {
    const fetchTarotCards = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(`tarot/cards/${id}`);

        setCard(response.data);
      } catch (error) {
        console.error('Tarot kartları yüklenirken hata oluştu:', error);
        throw new Error('Tarot kartları yüklenemedi!');
      } finally {
        setLoading(false);
      }
    };
    fetchTarotCards();
  }, []);

  return (
    <LinearGradient colors={[COLORS.black, '#3F2305']} style={styles.container}>
      <SafeAreaView style={styles.container}>
      <CustomHeader leftIcon={true} title={false} rightIcon={false} />
        <ScrollView>
          <View style={styles.imageContainer}>
            <Typography size="heading">{card?.name}</Typography>

            {loading ? (
              <ActivityIndicator size={'large'} style={styles.loading} />
            ) : (
              <Image
                source={{uri: card?.frontImageSource}}
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.imageIconContainer}>
            <View style={styles.iconWrapper}>
              <Typography size="large">Sayı</Typography>
              <Image
                source={getImageForCardNumber(String(card?.details.number))}
                style={styles.icon}
              />
              <Typography size="large">{card?.details.number}</Typography>
            </View>
            <View style={styles.iconWrapper}>
              <Typography size="large">Burç</Typography>
              <Image
                source={getImageForCardZodiac(String(card?.details.zodiac))}
                style={styles.icon}
              />
              <Typography size="large">{card?.details.zodiac}</Typography>
            </View>
            <View style={styles.iconWrapper}>
              <Typography size="large">Element</Typography>
              <Image
                source={getImageForCardElement(String(card?.details.element))}
                style={styles.icon}
              />
              <Typography size="large">{card?.details.element}</Typography>
            </View>
            <View style={styles.iconWrapper}>
              <Typography size="large">Gezegen</Typography>
              <Image source={planet} style={styles.icon} />
              <Typography size="large">{card?.details.planet}</Typography>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Typography>{card?.details.description}</Typography>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TarotCardDetail;
