import React, {useEffect} from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {getStyles} from '../styles';

interface AnimatedContentProps {
  name: string;
  engName: string;
  aim?: string;
  usageArea?: string;
  feature?: string;
  index: number;
  onPress: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  name,
  engName,
  aim,
  usageArea,
  feature,
  index,
  onPress,
}) => {
  const styles = getStyles();
  const card = require('../../../../assets/card/back.webp');
  const rightArrows = require('../../../../assets/icon/rightArrows.png');

  // Shared values for opacity and translateY (vertical movement)
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50); // Kartlar başlangıçta 50px aşağıda
  const scale = useSharedValue(0); // Kartlar başlangıçta 50px aşağıda

  useEffect(() => {
    opacity.value = withDelay(
      index * 200, // Her kart için gecikme
      withTiming(1, {duration: 800}), // Opaklık değişimi
    );
    translateY.value = withDelay(
      index * 200, // Her kart için gecikme
      withSpring(0, {damping: 12, stiffness: 100}), // Yukarı kaydırma
    );
    scale.value = withDelay(
      index * 200, // Her kart için gecikme
      withSpring(1, {damping: 10, stiffness: 100}), // Yukarı kaydırma
    );
  }, [index, opacity, scale, translateY]);

  // Animated style for opacity and translateY
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {translateY: translateY.value},
        {scale: scale.value}, // Scale animasyonunu ekledik
      ],
    };
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.card}>
      <Animated.View style={[animatedStyle]}>
        <View>
          <View style={styles.cardContainer}>
            <View style={styles.row}>
              <Image source={card} style={styles.cardImage} />
              <View>
                <Text style={styles.cardTitle}>{name}</Text>
                <Text style={styles.cardSubtitle}>{engName}</Text>
              </View>
            </View>
            <Image source={rightArrows} style={styles.rightArrows} />
          </View>
          <Text style={styles.cardDescription}>
            <Text style={styles.descriptionTitle}>Amaç:</Text> {aim}
          </Text>
          <Text style={styles.cardDescription}>
            <Text style={styles.descriptionTitle}>Kullanım Alanı:</Text>{' '}
            {usageArea}
          </Text>
          <Text style={styles.cardDescription}>
            <Text style={styles.descriptionTitle}>Özellikleri:</Text> {feature}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
export default AnimatedContent;
