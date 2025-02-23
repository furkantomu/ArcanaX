import React from 'react';
import {View, Image, Text, ScrollView} from 'react-native';

import {useTarotContext} from '../TarotContext';

import {getStyles} from '../style';
import {
  getImageForCardElement,
  getImageForCardNumber,
  getImageForCardZodiac,
} from '@/utils/getImageForNumber';

const CardDetail = () => {
  const {isSelectedCard} = useTarotContext();
  const styles = getStyles();
  const planet = require('../../../../assets/card/planet/galaxy.png');
  const back = require('../../../../assets/card/back.webp');

  return (
    <>
      <Image
        source={{uri: isSelectedCard?.frontImageSource || back}}
        style={styles.cardDetailModalBg}
        resizeMode={'cover'}
        blurRadius={5}
      />
      {/* <View style={styles.cardDetailModalCardTitleVertical}>
        <Text style={styles.cardDetailModalCardTitle}>
          Ters "High Priestess", sezgi ve içsel bilgilere erişimde zorluk
          yaşanması, kafa karışıklığı veya gizli şeylerin ortaya çıkması
          anlamına gelir.
        </Text>
      </View> */}

      <View style={styles.cardDetailModalWrapper}>
        <View style={styles.cardDetailModalCardWrapper}>
          <View style={styles.cardDetailModalCardLeftWrapper} />
          <Image
            source={{uri: isSelectedCard?.frontImageSource || back}}
            style={styles.cardDetailModalCard}
            resizeMode={'cover'}
          />
          <View style={styles.cardDetailModalCardRightWrapper}>
            <View style={styles.cardDetailModalCardRightWrapperItem}>
              <Image
                source={getImageForCardNumber(
                  String(isSelectedCard?.details.number),
                )}
                style={styles.cardDetailModalCardNumber}
              />
              <Text style={styles.cardDetailModalCardRightWrapperItemText}>
                {isSelectedCard?.details?.number}
              </Text>
            </View>
            <View style={styles.cardDetailModalCardRightWrapperItem}>
              <Image
                source={getImageForCardZodiac(
                  String(isSelectedCard?.details.zodiac),
                )}
                style={styles.cardDetailModalCardNumber}
                resizeMode={'contain'}
              />
              <Text style={styles.cardDetailModalCardRightWrapperItemText}>
                {isSelectedCard?.details?.zodiac}
              </Text>
            </View>
            <View style={styles.cardDetailModalCardRightWrapperItem}>
              <Image
                source={getImageForCardElement(
                  String(isSelectedCard?.details.element),
                )}
                style={styles.cardDetailModalCardNumber}
                resizeMode={'contain'}
              />
              <Text style={styles.cardDetailModalCardRightWrapperItemText}>
                {isSelectedCard?.details?.element}
              </Text>
            </View>
            <View style={[styles.cardDetailModalCardRightWrapperItem]}>
              <Image
                source={planet}
                style={styles.cardDetailModalCardNumber}
                resizeMode={'contain'}
              />
              <Text style={styles.cardDetailModalCardRightWrapperItemText}>
                AY
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cardDetailModalCardLeftTitleVertical}>
          <Text style={styles.cardDetailModalCardLeftTitle}>
            "{isSelectedCard?.details?.title}"
          </Text>
        </View>
      </View>

      <View style={styles.cardDetailModalContainer}>
        <View style={styles.cardDetailModalContent}>
          <View style={styles.cardDetailModalDescription}>
            <ScrollView>
              <Text style={styles.cardDetailModalDescriptionText}>
                {isSelectedCard?.details?.description}
              </Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </>
  );
};

export default CardDetail;
