import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import {COLORS} from '@/styles/theme';

import {getStyles} from '../style';
import {Typography} from '@/components';

const Header = ({route}) => {
  const styles = getStyles();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      200,
      withSpring(1, {damping: 12, stiffness: 100}),
    );
    scale.value = withDelay(300, withSpring(1, {damping: 12, stiffness: 100}));
  }, [opacity, scale]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });
  return (
    <View style={styles.backgroundContent}>
      <Typography
        size={'title'}
        weight={'NotoSerifCondensedThin'}
        style={styles.title}>
        {route.params.name}
      </Typography>
      <Animated.View style={[styles.info, animatedTextStyle]}>
        <Typography size={'medium'} style={styles.infoTitle}>
          Bir soru belirleyin ve kartlarınızı seçin:
        </Typography>
        <Typography
          size={'heading'}
          weight={'NotoSerifCondensedItalic'}
          style={{...styles.infoTitle, color: COLORS.gold}}>
          'Kariyerimle ilgili nasıl bir yol izlemeliyim?'
        </Typography>
        <Typography size={'medium'} style={styles.infoTitle}>
          Seçtiğiniz kartları inceleyin ve mesajlarını keşfedin.
        </Typography>
      </Animated.View>
    </View>
  );
};

export default Header;
