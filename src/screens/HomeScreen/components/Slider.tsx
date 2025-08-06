import React, {useCallback, useMemo} from 'react';
import {View, ListRenderItem} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import {DUMMY} from '@/utils/dummy';
import {SIZES} from '@/styles/theme';
import {getStyles} from '../styles';
import {Card} from '@/components';
import {ITEM_HEIGHTS} from '@/constants';

import {RootStackParamList} from '@/utils/navigationUtils';
import {StackNavigationProp} from '@react-navigation/stack';
import Tarot from './Tarot';

const imageWidth = SIZES.width * 0.7;
const imageHeight = imageWidth * 1.63;

type NavigationProps = StackNavigationProp<RootStackParamList>;

interface SliderProps {
  scrollX: SharedValue<number>;
}
const Slider: React.FC<SliderProps> = ({scrollX}) => {
  const styles = getStyles();
  const navigation = useNavigation<NavigationProps>();

  const itemWidth = useMemo(() => SIZES.width * 0.7 + 12, []);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e: any) => {
      scrollX.value = e.contentOffset.x / itemWidth;
    },
  });

  const keyExtractor = useCallback((item: any, index: number) => `slider-${index}`, []);

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: itemWidth,
      offset: itemWidth * index,
      index,
    }),
    [itemWidth]
  );

  const renderItem: ListRenderItem<any> = useCallback(
    ({item, index}) => (
      <Card
        imageSource={item.imageSource}
        index={index}
        onPress={() => {
          navigation.navigate(item.navigation);
        }}
        scrollX={scrollX}
        width={imageWidth}
        height={imageHeight}
      />
    ),
    [navigation, scrollX]
  );
  return (
    <View style={styles.flex}>
      <Animated.FlatList
        data={DUMMY}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler}
        snapToInterval={itemWidth}
        decelerationRate={'fast'}
        scrollEventThrottle={16}
        bounces={false}
        contentContainerStyle={styles.flatList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={3}
      />
      {DUMMY.map((item, index) => {
        if (item.navigation === 'TarotScreen') {
          return <Tarot key={index} index={index} scrollX={scrollX} />;
        }
      })}
    </View>
  );
};

export default Slider;
