import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import {DUMMY} from '@/utils/dummy';
import {SIZES} from '@/styles/theme';
import {getStyles} from '../styles';
import {Card} from '@/components';

import {RootStackParamList} from '@/utils/navigationUtils';
import {StackNavigationProp} from '@react-navigation/stack';

const imageWidth = SIZES.width * 0.7;
const imageHeight = imageWidth * 1.63;

type NavigationProps = StackNavigationProp<RootStackParamList>;

interface SliderProps {
  scrollX: SharedValue<number>;
}
const Slider: React.FC<SliderProps> = ({scrollX}) => {
  const styles = getStyles();


  const navigation = useNavigation<NavigationProps>();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e: any) => {
      scrollX.value = e.contentOffset.x / (SIZES.width * 0.7 + 12);
    },
  });
  return (
    <View style={styles.flex}>
      <Animated.FlatList
        data={DUMMY}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler}
        snapToInterval={SIZES.width * 0.7 + 12}
        decelerationRate={'fast'}
        scrollEventThrottle={1000 / 60}
        bounces={false}
        contentContainerStyle={styles.flatList}
        renderItem={({item, index}) => (
          <Card
            key={index}
            imageSource={item.imageSource}
            index={index}
            onPress={() => {
              navigation.navigate(item.navigation);
            }}
            scrollX={scrollX}
            width={imageWidth}
            height={imageHeight}
          />
        )}
      />
    </View>
  );
};

export default Slider;
