/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Animated, View, StyleSheet, Pressable, FlatList} from 'react-native';

import {COLORS, SIZES} from '@/styles/theme';
import {Icon, Typography} from '@/components';

export const CardView = ({products, selectedProduct, setSelectedProduct}) => {
  const pan = React.useRef(new Animated.ValueXY()).current;

  const [scrollViewWidth, setScrollViewWidth] = React.useState(0);

  const boxWidth = scrollViewWidth * 0.5;

  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
      <FlatList
  horizontal
  data={products}
  style={styles.flatList}
  contentContainerStyle={styles.flatListContainer}
  contentInsetAdjustmentBehavior="never"
  snapToAlignment="center"
  decelerationRate="fast"
  automaticallyAdjustContentInsets={false}
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}
  scrollEventThrottle={16}
  onLayout={e => setScrollViewWidth(e.nativeEvent.layout.width)}
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { x: pan.x } } }],
    { useNativeDriver: false }
  )}
  keyExtractor={(item, index) => `${index}-${item.productId}`}
  renderItem={({ item }) => {
    const isSelected = selectedProduct?.productId === item.productId;

    return (
      <Pressable onPress={() => setSelectedProduct(item)}>
        <Animated.View
          style={[
            styles.box,
            {
              width: boxWidth,
              borderColor: isSelected ? COLORS.cream : 'transparent',
            },
          ]}
        >
          <Icon name="token" style={styles.productListItemIcon} />
          <Typography size="large" style={styles.titleText}>
            {item.title}
          </Typography>
          <Typography size="small" style={styles.boxText}>
            {item.description}
          </Typography>
          <Typography size="heading" style={styles.priceText}>
            {item.localizedPrice}
          </Typography>
        </Animated.View>
      </Pressable>
    );
  }}
/>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
  },
  titleText: {
    textAlign: 'center',
    marginBottom: 3,
    color: COLORS.gold,
  },
  boxText: {
    color: COLORS.silverGray,
    height: SIZES.width * 0.08,
    textAlign: 'center',
  },
  box: {
    width: SIZES.width * 0.52,
    height: SIZES.width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: COLORS.blackOpacity1,
    paddingHorizontal: 2,
    borderWidth: 1,
  },
  priceText: {
    marginTop: 8,
  },
  productListItemIcon: {
    resizeMode: 'cover',
    width: 50,
    height: 50,
  },
  flatList: {height: 200,},
  flatListContainer: {
    paddingVertical: 16,
    backgroundColor: 'transparent',
    gap: 12,
  },
});
