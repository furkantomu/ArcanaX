import React from 'react';
import {getStyles} from '../styles';
import {Button} from '@/components';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

interface TarotProps {
  index: number;
  scrollX: SharedValue<number>;
}

const Tarot: React.FC<TarotProps> = ({index, scrollX}) => {
  const styles = getStyles();
  const navigation = useNavigation();
  const {localeValue} = useAppSelector(state => state.settings);

  const rnAnimatedImageStyle = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    return {
      opacity: interpolate(scrollX.value, inputRange, [0, 1, 0]),
    };
  });
  return (
    <Animated.View style={[styles.homeContainer, rnAnimatedImageStyle]}>
      <Button
        text={i18n.t('HOME_SCREEN.BUTTON', {locale:localeValue})}
        buttonStyle={styles.tarotButton}
        variant={'secondary'}
        handlePress={() => navigation.navigate('TarotDetail')}
      />
      {/* <CollapsibleMenu /> */}
    </Animated.View>
  );
};

export default Tarot;
