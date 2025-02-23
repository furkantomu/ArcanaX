import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import {COLORS} from '@/styles/theme';

import {getStyles} from '../style';
import { Typography} from '@/components';

const Header = ({route}) => {
  const styles = getStyles();

  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const tarotSpreadBG = require('../../../../assets/background/tarotspread.webp');

  useEffect(() => {
    opacity.value = withDelay(
      500,
      withSpring(1, {damping: 12, stiffness: 100}),
    );
    scale.value = withDelay(600, withSpring(1, {damping: 12, stiffness: 100}));
  }, [opacity, scale]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });
  return (
    <View style={styles.backgroundContent}>
      <LinearGradient
        colors={[COLORS.black, COLORS.blackOpacity, COLORS.black]}
        style={styles.linearGradient}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        locations={[0.05, 0.5, 0.95]}
      />
      <Typography
        size={'title'}
        weight={'NotoSerifCondensedThin'}
        style={styles.title}>
        {route.params.name}
      </Typography>
      <Animated.View style={[styles.info, animatedTextStyle]}>
        <Typography
          size={'large'}
          weight={'NotoSerifCondensedBoldItalic'}
          style={styles.infoTitle}>
          Bir soru belirleyin ve kartlarınızı seçin:
        </Typography>
        <Typography
          size={'heading'}
          weight={'NotoSerifCondensedThin'}
          style={{...styles.infoTitle, color: COLORS.gold}}>
          'Kariyerimle ilgili nasıl bir yol izlemeliyim?'
        </Typography>
        <Typography
          size={'large'}
          weight={'NotoSerifCondensedBoldItalic'}
          style={styles.infoTitle}>
          Seçtiğiniz kartları inceleyin ve mesajlarını keşfedin.
        </Typography>
      </Animated.View>
      <Image
        source={tarotSpreadBG}
        style={styles.tarotSpreadBG}
        resizeMode={'cover'}
      />
    </View>
  );
};

export default Header;
