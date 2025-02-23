import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {getStyles} from '../styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Icon, Typography} from '@/components';

const AnimatedContent = () => {
  const styles = getStyles();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      200,
      withTiming(1, {duration: 800}),
    );
    translateY.value = withDelay(
      200,
      withSpring(0, {damping: 12, stiffness: 100}),
    );
    scale.value = withDelay(
      200,
      withSpring(1, {damping: 10, stiffness: 100}),
    );
  }, [opacity, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  });
  return (
    <>
      <View style={styles.card}>
        <Animated.View style={[animatedStyle]}>
          <View>
            <View style={styles.cardContainer}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.cardTitle}>
                    Rüya Analizi İçin İpuçları
                  </Text>
                </View>
              </View>
              <Icon name={'rightArrow'} />
            </View>
            <Text style={styles.cardDescription}>
              <Typography weight="NotoSerifCondensedThin">Açıklama:</Typography>{' '}
              Rüyanızı paylaşırken, daha derin bir analiz yapabilmek için rüyayı
              gördüğünüz dönemdeki duygusal durumlarınızı ve yaşadığınız
              olayları da belirtmeniz faydalı olacaktır. Bu, bilinçaltınızdaki
              mesajları anlamanızı kolaylaştırabilir.
            </Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.card}>
        <Animated.View style={[animatedStyle]}>
          <View>
            <View style={styles.cardContainer}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.cardTitle}>
                  Rüya Analizi İşlem Kuralları!
                  </Text>
                </View>
              </View>
              <Icon name={'rightArrow'} />
            </View>
            <Text style={styles.cardDescription}>
              <Typography weight="NotoSerifCondensedThin">Açıklama:</Typography>{' '}
              "Dikkat: Rüya analizi dışında farklı sorular sormanız durumunda,
              kullanılan jeton iadesi yapılmayacak ve yeni bir soru hakkı
              verilmeyecektir. Lütfen yalnızca bu bilgiler ışığında işlem
              yapın."
            </Text>
          </View>
        </Animated.View>
      </View>
    </>
  );
};

export default AnimatedContent;
