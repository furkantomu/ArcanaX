import React from 'react';
import {View, StyleSheet, ImageSourcePropType} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {DUMMY} from '@/utils/dummy';
import {SIZES} from '@/styles/theme';
import {getStyles} from '../styles';
import {Card} from '@/components';

import {RootStackParamList} from '@/utils/navigationUtils';
import {StackNavigationProp} from '@react-navigation/stack';
import Tarot from './Tarot';

const imageWidth = SIZES.width * 0.7;
const imageHeight = imageWidth * 1.63;

interface BackDropProps {
  image: ImageSourcePropType;
  index: number;
  scrollX: SharedValue<number>;
}

const BackDrop: React.FC<BackDropProps> = ({image, index, scrollX}) => {
  const backDropStyle = {
    width: SIZES.width,
    height: SIZES.height * 4,
  };
  const rnAnimatedImageStyle = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    return {
      opacity: interpolate(scrollX.value, inputRange, [0, 1, 0]),
    };
  });
  return (
    <Animated.Image
      source={image}
      style={[
        StyleSheet.absoluteFillObject,
        rnAnimatedImageStyle,
        backDropStyle,
      ]}
      resizeMode={'cover'}
      blurRadius={30}
    />
  );
};

type NavigationProps = StackNavigationProp<RootStackParamList>;
const Slider = () => {
  const styles = getStyles();

  const navigation = useNavigation<NavigationProps>();
  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e: any) => {
      scrollX.value = e.contentOffset.x / (SIZES.width * 0.7 + 12);
    },
  });
  return (
    <View style={styles.flex}>
      {DUMMY.map((item, index) => (
        <BackDrop
          key={index}
          image={item.imageSource}
          index={index}
          scrollX={scrollX}
        />
      ))}
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
            cardTitle={item.cardTitle}
            cardDescription={item.cardDescription}
            cardButtonText={item.cardButtonText}
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
      {DUMMY.map((item, index) => {
        if (item.navigation === 'TarotScreen') {
          return <Tarot key={index} index={index} scrollX={scrollX} />;
        }
      })}
    </View>
  );
};

export default Slider;
