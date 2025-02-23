import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Pressable, ActivityIndicator, Image} from 'react-native';
import Animated, {
  Easing,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {useAccordion} from '@/hooks/useAccordion';
import {useRefsContext} from '@/context';

import {getStyles} from '../styles';
import {getImageForNumber} from '@/utils/getImageForNumber';
import {useNumerologyPremiumContext} from '../NumerologyPremiumContext';
import {AxiosResponse} from 'axios';
import {apiService} from '@/services/APIService';
import {Typography} from '@/components';
import Markdown, {MarkdownIt} from 'react-native-markdown-display';
import {COLORS} from '@/styles/theme';

const arrow = require('../../../../assets/icon/downArrow.png');
const markdownStyles = {
  body: {color: COLORS.cream, fontSize: 15, fontFamily: 'NotoSerif-Regular'},
  strong: {color: COLORS.gold},
};

const RadicalNumber = ({numerologyDetail}) => {
  const styles = getStyles();
  const {setHeight, animatedheightStyle, animatedref, handleLayout, isOpened} =
    useAccordion();
  const {radicalNumber, setRadicalNumber} = useNumerologyPremiumContext();
  const itemRefs = useRef();
  const {lifePathAccordionScrollViewRef} = useRefsContext();
  const rotation = useSharedValue(0);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);

  const animatedRotateStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  useEffect(() => {
    const getRadicalNumber = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<{message: string; id: string}> =
          await apiService.post('numerology/radicalNumber', {
            name: numerologyDetail.name,
            radicalNumber: String(numerologyDetail.radicalNumber),
          });
        setRadicalNumber({
          message: response.data.message,
          id: response.data.id,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getRadicalNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (numerologyDetail) {
      const uri = getImageForNumber(numerologyDetail.radicalNumber);
      setImage(uri);
    }
  }, [numerologyDetail]);

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
              //rules={rules}
              style={markdownStyles}>
              {radicalNumber.message}
            </Markdown>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default RadicalNumber;
