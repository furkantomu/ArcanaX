import React, { memo } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import { getStyles } from '../style';
import { useTarotContext } from '../TarotContext';
import { useHaptic } from '@/utils';

interface TarotCard {
  id: number;
  name: string;
  engName: string;
  category: 'swords' | 'wands' | 'cups' | 'pentacles' | 'major';
  frontImageSource: string;
  backImageSource: any;
}

interface CardProps {
  backImageSource: any;
  item: TarotCard;
}

const Card = ({ backImageSource, item }: CardProps) => {
  const { selectedCards, addCard, removeCard, readingType } = useTarotContext();
  const styles = getStyles();
  const isFlipped = useSharedValue(false);
  const translateY = useSharedValue(0);
  const haptic = useHaptic('soft');

  // Check if this card is currently selected
  const isCardSelected = selectedCards.some(card => card.id === item.id);

  const handlePress = () => {
    // Toggle the flip state
    isFlipped.value = !isFlipped.value;

    if (isFlipped.value) {
      // Card is being flipped (selected)
      if (selectedCards.length < readingType && !isCardSelected) {
        translateY.value = withDelay(
          200,
          withSpring(-50, { damping: 12, stiffness: 100 }),
        );
        addCard(item);
      } else if (selectedCards.length >= readingType && !isCardSelected) {
        // Can't select more cards, flip back
        isFlipped.value = false;
      }
    } else {
      // Card is being unflipped (deselected)
      translateY.value = withDelay(
        200,
        withSpring(0, { damping: 12, stiffness: 100 }),
      );
      removeCard(item);
    }
    
    haptic?.();
  };

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.cardContainer]}>
      <Animated.View style={[regularCardAnimatedStyle]}>
        <TouchableOpacity 
          onPress={handlePress} 
          activeOpacity={1}
          disabled={selectedCards.length >= readingType && !isCardSelected}
        >
          <Image source={backImageSource} style={styles.card} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default memo(Card);
