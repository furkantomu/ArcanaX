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
import {COLORS, SIZES} from '@/styles/theme';
import Markdown, {MarkdownIt} from 'react-native-markdown-display';
import {Typography} from '@/components';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const arrow = require('../../../../../assets/icon/downArrow.png');
const markdownStyles = {
  body: {color: COLORS.cream, fontSize: SIZES.body2, fontFamily: 'NotoSerif-Regular'},
  strong: {color: COLORS.gold},
};
const PersonalYearNumber = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const styles = getStyles();
  const {setHeight, animatedheightStyle, animatedref, handleLayout, isOpened} =
    useAccordion();
  const {numerologyDetail} = useNumerologyHistoryContext();
  const itemRefs = useRef();
  const {lifePathAccordionScrollViewRef} = useRefsContext();
  const rotation = useSharedValue(0);
  const [personalYear, setPersonalYearNumber] = useState({
    number: 0,
    personalYear: '',
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);

  const animatedRotateStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  useEffect(() => {
    const getPersonalYear = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(
          `numerology/personalYear/${numerologyDetail.personalYear}`,
        );
        setPersonalYearNumber({
          number: response.data.number,
          personalYear: response.data.personalYear,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (numerologyDetail.personalYear !== '') {
      getPersonalYear();
    }
  }, [numerologyDetail.personalYear]);
  useEffect(() => {
    if (numerologyDetail) {
      const uri = getImageForNumber(personalYear.number);
      setImage(uri);
    }
  }, [personalYear.number, numerologyDetail]);
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
              {i18n.t('NUMEROLOGY_TYPE.3.LABEL', {locale:localeValue})}
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
              {personalYear.personalYear}
            </Markdown>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default PersonalYearNumber;
