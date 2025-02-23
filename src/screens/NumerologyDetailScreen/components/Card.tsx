import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

import {getStyles} from '../styles';
import {getImageForNumber} from '@/utils/getImageForNumber';

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
          <Text style={styles.cardText}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default Card;
