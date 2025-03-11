import {View, Pressable, ActivityIndicator, Image} from 'react-native';
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
import Markdown, {MarkdownIt} from 'react-native-markdown-display';
import {COLORS} from '@/styles/theme';
import {Typography} from '@/components';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const arrow = require('../../../../../assets/icon/downArrow.png');
const markdownStyles = {
  body: {color: COLORS.cream, fontSize: 15, fontFamily: 'NotoSerif-Regular'},
  strong: {color: COLORS.gold},
};
const ExpressionNumber = () => {
  const styles = getStyles();
  const {localeValue} = useAppSelector(state => state.settings);
  const {setHeight, animatedheightStyle, animatedref, handleLayout, isOpened} =
    useAccordion();
  const {numerologyDetail} = useNumerologyHistoryContext();
  const itemRefs = useRef();
  const {lifePathAccordionScrollViewRef} = useRefsContext();
  const rotation = useSharedValue(0);
  const [expressionNumber, setExpressionNumber] = useState({
    number: 0,
    expressionNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);

  const animatedRotateStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  useEffect(() => {
    const getExpressionNumber = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(
          `numerology/expressionNumber/${numerologyDetail.expression}`,
        );
        setExpressionNumber({
          number: response.data.number,
          expressionNumber: response.data.expressionNumber,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (numerologyDetail.expression !== '') {
      getExpressionNumber();
    }
  }, [numerologyDetail.expression]);
  useEffect(() => {
    if (numerologyDetail) {
      const uri = getImageForNumber(expressionNumber.number);
      setImage(uri);
    }
  }, [expressionNumber.number, numerologyDetail]);
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
              {i18n.t('NUMEROLOGY_TYPE.1.LABEL', {locale:localeValue})}
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
              //rules={rules}
              style={markdownStyles}>
              {expressionNumber.expressionNumber}
            </Markdown>
            {/* <Text style={styles.description}>{expressionNumber.expressionNumber}</Text> */}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default ExpressionNumber;
