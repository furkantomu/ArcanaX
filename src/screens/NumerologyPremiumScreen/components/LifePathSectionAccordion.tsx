import {View, Text, ActivityIndicator, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getStyles} from '../styles';
import {useAccordion} from 'hooks/useAccordion';
import Animated, {
  runOnUI,
  withTiming,
  Easing,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Pressable} from 'react-native-gesture-handler';
import {useRefsContext} from '@/context';
import {getImageForNumber} from '@/utils/getImageForNumber';
import Markdown, {MarkdownIt} from 'react-native-markdown-display';
import {COLORS} from '@/styles/theme';
import {Typography} from '@/components';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';

const arrow = require('../../../../assets/icon/downArrow.png');
const markdownStyles = {
  body: {color: COLORS.cream, fontSize: 15, fontFamily: 'NotoSerif-Regular'},
  strong: {color: COLORS.gold},
};
interface LifePathSectionAccordionProps {
  title: string;
  description: string;
  content: string;
  loading: boolean;
  number: number;
}

const LifePathSectionAccordion: React.FC<LifePathSectionAccordionProps> = ({
  title,
  description,
  content,
  loading,
  number,
}) => {
  const styles = getStyles();
  const {setHeight, animatedheightStyle, animatedref, handleLayout, isOpened} =
    useAccordion();
  const {localeValue} = useAppSelector(state => state.settings);
  const {lifePathAccordionScrollViewRef} = useRefsContext();
  const itemRefs = useRef();
  const rotation = useSharedValue(0);

  const [image, setImage] = useState();

  const animatedRotateStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  const handlePress = () => {
    runOnUI(setHeight)();
    rotation.value = withTiming(isOpened.value ? 0 : 180, {
      duration: 200,
      easing: Easing.ease,
    });
    // if(!isOpened.value){
    //   itemRefs.current?.measure((height: number, pageY: number) => {
    //     lifePathAccordionScrollViewRef.current?.scrollTo({
    //       y: SIZES.height + pageY,
    //       animated: true,
    //     });
    //   });
    // }
  };

  useEffect(() => {
    const uri = getImageForNumber(number);
    setImage(uri);
  }, [number]);

  return (
    <View style={styles.lifePathSectionAccordion} ref={itemRefs}>
      <Pressable onPress={handlePress} disabled={loading}>
        <View style={styles.lifePathSectionItem}>
          <View style={styles.lifePathSectionItemLeft}>
            <View>
              <Typography size="heading">
                {i18n.t(`NUMEROLOGY_PREMIUM_SCREEN.PEAK.${title}`, {
                  locale: localeValue,
                })}
              </Typography>
              <Typography style={styles.lifePathSectionItemDescription}>
                {description}
              </Typography>
            </View>
            <Image source={image} style={styles.lifePathSectionItemImage} />
          </View>

          <View style={styles.lifePathSectionItemRight}>
            {loading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <Animated.Image
                source={arrow}
                style={[
                  styles.lifePathSectionItemRightIcon,
                  animatedRotateStyle,
                ]}
              />
            )}
          </View>
        </View>
      </Pressable>
      <Animated.View style={animatedheightStyle}>
        <View style={styles.lifePathSectionAccordionWrapper}>
          <View onLayout={handleLayout} ref={animatedref} collapsable={false}>
            <Markdown
              markdownit={MarkdownIt({
                typographer: true,
                linkify: true,
                breaks: true,
              }).disable(['blockquote', 'list', 'code'])}
              //rules={rules}
              style={markdownStyles}>
              {content}
            </Markdown>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default LifePathSectionAccordion;
