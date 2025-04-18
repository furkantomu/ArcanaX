import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '@/styles/theme';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {apiService} from '@/services/APIService';
import {useAppSelector} from '@/hooks';
import {Button, Typography} from '@/components';
import i18n from '@/i18n';
import {
  getImageForCardElement,
  getImageForCardNumber,
  getImageForCardZodiac,
} from '@/utils/getImageForNumber';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const planet = require('../../../assets/card/planet/galaxy.png');
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

type TarotCardDetailDescriptionRouteParams = {
  id: string;
};

type TarotCardDetailDescriptionRouteProp = RouteProp<
  {NumerologyHistoryScreen: TarotCardDetailDescriptionRouteParams},
  'NumerologyHistoryScreen'
>;

const imageWidth = SIZES.width * 0.8;
const imageHeight = imageWidth * 1.3;

const TarotCardDesription = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const [card, setCard] = useState<TarotCard>();
  const [loading, setLoading] = useState({});
  const navigation = useNavigation();
  const route = useRoute<TarotCardDetailDescriptionRouteProp>();

  useEffect(() => {
    const fetchTarotCards = async () => {
      try {
        setLoading(true);
        const response = await apiService.get<TarotCard>(
          `tarot/cards/${route?.params?.id}`,
        );

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
    <LinearGradient
      colors={['#3F2305', COLORS.darkGray, '#3F2305']}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Typography size="heading">
              {localeValue === 'tr' ? card?.name : card?.engName}
            </Typography>

            {loading ? (
              <ActivityIndicator size={'large'} style={styles.loading} />
            ) : (
              <FastImage
                style={styles.image}
                source={{
                  uri: card?.frontImageSource,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
          </View>
          <View style={styles.imageIconContainer}>
            <View style={styles.iconWrapper}>
              <Typography size="large">
                {i18n.t('TAROT_DETAIL.NUMBER', {locale: localeValue})}
              </Typography>
              <Image
                source={getImageForCardNumber(String(card?.details.number))}
                style={styles.icon}
              />
              <Typography size="large">{card?.details.number}</Typography>
            </View>
            <View style={styles.iconWrapper}>
              <Typography size="large">
                {i18n.t('TAROT_DETAIL.ZODIAC', {locale: localeValue})}
              </Typography>
              <Image
                source={getImageForCardZodiac(String(card?.details.zodiac))}
                style={styles.icon}
              />
              <Typography size="large">{card?.details.zodiac}</Typography>
            </View>
            <View style={styles.iconWrapper}>
              <Typography size="large">
                {i18n.t('TAROT_DETAIL.ELEMENT', {locale: localeValue})}
              </Typography>
              <Image
                source={getImageForCardElement(String(card?.details.element))}
                style={styles.icon}
              />
              <Typography size="large">{card?.details.element}</Typography>
            </View>
            <View style={styles.iconWrapper}>
              <Typography size="large">
                {' '}
                {i18n.t('TAROT_DETAIL.PLANET', {locale: localeValue})}
              </Typography>
              <Image source={planet} style={styles.icon} />
              <Typography size="large">{card?.details.planet}</Typography>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Typography size="medium">{card?.details.description}</Typography>
          </View>
        </ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <Button
            text={localeValue === 'tr' ? 'Geri Dön' : 'Go Back'}
            variant="secondary"
            handlePress={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TarotCardDesription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  imageIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: COLORS.cream,
    resizeMode: 'cover',
  },
  iconWrapper: {
    alignItems: 'center',
    gap: 10,
  },
  descriptionContainer: {
    marginTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loading: {
    marginVertical: 100,
  },
});
