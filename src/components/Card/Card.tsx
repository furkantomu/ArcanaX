import {COLORS} from '@/styles/theme';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Typography from '../Typography/Typography';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

interface CardProps {
  imageSource: any;
  width?: number;
  height?: number;
  onPress: () => void;
  index: number;
  scrollX: SharedValue<number>;
}

// const imageWidth = SIZES.width * 0.7;
// const imageHeight = imageWidth * 1.63;

const Card: React.FC<CardProps> = React.memo(({
  imageSource,
  onPress,
  index,
  scrollX,
  width,
  height,
}) => {
  const {localeValue} = useAppSelector(state => state.settings);
  const rnAnimatedImageStyle = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    return {
      transform: [
        {
          scale: interpolate(scrollX.value, inputRange, [1.6, 1, 1.6]),
        },
        {
          rotate: `${interpolate(scrollX.value, inputRange, [5, 0, -5])}deg`,
        },
      ],
    };
  });
  const rnAnimatedViewStyle = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    return {
      transform: [
        {
          translateY: interpolate(scrollX.value, inputRange, [0, -50, 0]),
        },
      ],
    };
  });
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Animated.View
        style={[
          styles.card,
          rnAnimatedViewStyle,
          {width: width, height: height},
        ]}>
        <Animated.Image
          source={imageSource}
          resizeMode={'cover'}
          style={[styles.image, rnAnimatedImageStyle]}
        />
        <LinearGradient
          colors={[COLORS.blackOpacity, COLORS.black]}
          style={{width: width, height: height}}>
          <View style={styles.cardContent}>
            <Typography
              size={'large'}
              weight={'NotoSerifCondensedThin'}
              style={styles.title}>
              {i18n.t(`HOME_SCREEN.ITEM.${[index]}.cardTitle`, {locale: localeValue})}
            </Typography>
            <Typography weight={'NotoSerifCondensedBoldItalic'}>
              {i18n.t(`HOME_SCREEN.ITEM.${[index]}.cardDescription`, {locale: localeValue})}
            </Typography>
            <View style={styles.cardButtonContainer}>
              <Typography
                size={'heading'}
                lineHeightType={'large'}
                weight={'NotoSerifThin'}>
                {i18n.t(`HOME_SCREEN.ITEM.${[index]}.cardButtonText`, {locale: localeValue})}
              </Typography>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardButtonContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'flex-end',
  },
  title: {
    marginBottom: 10,
  },
});

export default Card;
