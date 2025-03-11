import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {Typography} from '@/components';

import {getStyles} from '../styles';
import {getImageForNumber} from '@/utils/getImageForNumber';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const numerologyHeader = [
  {
    label: 'Yaşam Yolu Sayısı',
  },
  {
    label: 'İsim Sayısı',
  },
  {
    label: 'Kök Sayı',
  },
  {
    label: 'Kişisel Yıl',
  },
];

const Card = () => {
  const [numerology] = useState(numerologyHeader);
  const [image, setImage] = useState<string[]>([]);
  const {localeValue} = useAppSelector(state => state.settings);
  const route = useRoute();
  const {numerologyDetail} = route.params;
  const styles = getStyles();

  useEffect(() => {
    if (numerologyDetail) {
      const imageUris = [
        getImageForNumber(numerologyDetail.lifePath),
        getImageForNumber(numerologyDetail.expression),
        getImageForNumber(numerologyDetail.radicalNumber),
        getImageForNumber(numerologyDetail.personalYear),
      ];
      setImage(imageUris);
    }
  }, [numerologyDetail]);
  return (
    <View style={styles.cardContainer}>
      {numerology.map((item, idx) => (
        <View style={styles.card} key={idx}>
          <View style={styles.cardImage}>
            <Image
              source={image[idx]}
              resizeMode={'cover'}
              style={styles.image}
            />
          </View>
          <Typography size="medium" style={styles.cardText}>
            {i18n.t(`NUMEROLOGY_TYPE.${[idx]}.LABEL`, {locale:localeValue})}
          </Typography>
        </View>
      ))}
    </View>
  );
};

export default Card;
