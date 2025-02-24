import {View, Text, Pressable, ActivityIndicator, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getStyles} from '../styles';
import Animated, {
  Easing,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAccordion} from '@/hooks/useAccordion';
import {useRefsContext} from '@/context';

import {getImageForNumber} from '@/utils/getImageForNumber';
import {apiService} from '@/services/APIService';
import {useNumerologyHistoryContext} from '../NumerologyHistoryContext';
import {COLORS} from '@/styles/theme';
import Markdown, {MarkdownIt} from 'react-native-markdown-display';
import {Typography} from '@/components';

const arrow = require('../../../../../assets/icon/downArrow.png');
const markdownStyles = {
  body: {color: COLORS.cream, fontSize: 15, fontFamily: 'NotoSerif-Regular'},
  strong: {color: COLORS.gold},
};

const RadicalNumber = () => {
  const styles = getStyles();
  const {setHeight, animatedheightStyle, animatedref, handleLayout, isOpened} =
    useAccordion();
  const {numerologyDetail} = useNumerologyHistoryContext();
  const itemRefs = useRef();
  const {lifePathAccordionScrollViewRef} = useRefsContext();
  const rotation = useSharedValue(0);
  const [radicalNumber, setRadicalNumber] = useState({
    number: 0,
    radicalNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);

  const animatedRotateStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  useEffect(() => {
    const getRadicalNumber = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(
          `numerology/radicalNumber/${numerologyDetail.radicalNumber}`,
        );
        setRadicalNumber({
          number: response.data.number,
          radicalNumber: response.data.radicalNumber,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (numerologyDetail.radicalNumber !== 0) {
      getRadicalNumber();
    }
  }, [numerologyDetail.radicalNumber]);
  useEffect(() => {
    if (numerologyDetail) {
      const uri = getImageForNumber(radicalNumber.number);
      setImage(uri);
    }
  }, [radicalNumber.number, numerologyDetail]);
  const handlePress = async () => {
    runOnUI(setHeight)();
    rotation.value = withTiming(isOpened.value ? 0 : 180, {
      duration: 200,
      easing: Easing.ease,
    });

    if (!isOpened.value) {
      itemRefs.current?.measure((height: number, pageY: number) => {
        lifePathAccordionScrollViewRef.current?.scrollTo({
          y: pageY,
          animated: true,
        });
      });
    }
  };
  return (
    <View style={styles.card} ref={itemRefs}>
      <Pressable onPress={handlePress} disabled={loading}>
        <View style={styles.cardButton}>
          <View style={[styles.textContainer]}>
            {loading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <Animated.Image
                source={arrow}
                style={[styles.textContainerIcon, animatedRotateStyle]}
              />
            )}

            <Typography
              size="large"
              weight="NotoSerifCondensedBoldItalic"
              style={styles.title}>
              Kök Sayı
            </Typography>
          </View>
          <View style={styles.imageContainer}>
            <Image source={image} resizeMode={'cover'} style={styles.image} />
          </View>
        </View>
      </Pressable>

      <Animated.View style={animatedheightStyle}>
        <View style={styles.accordionWrapper}>
          <View onLayout={handleLayout} ref={animatedref} collapsable={false}>
            <Markdown
              markdownit={MarkdownIt({
                typographer: true,
                linkify: true,
                breaks: true,
              }).disable(['blockquote', 'list', 'code'])}
              style={markdownStyles}>
              {radicalNumber.radicalNumber}
            </Markdown>
            {/* <Text style={styles.description}>{radicalNumber.radicalNumber}</Text> */}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default RadicalNumber;
