import {View} from 'react-native';
import React, {useRef} from 'react';
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
import {COLORS, SIZES} from '@/styles/theme';
import {Typography} from '@/components';
import Markdown, {MarkdownIt} from 'react-native-markdown-display';

const arrow = require('../../../../assets/icon/downArrow.png');

const markdownStyles = {
  body: {color: COLORS.cream, fontSize: 15, fontFamily: 'NotoSerif-Regular'}, 
  strong: {color: COLORS.silverGray},
};

interface FAQAccordionProps {
  title: string;
  content: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({title, content}) => {
  const styles = getStyles();
  const {setHeight, animatedheightStyle, animatedref, handleLayout, isOpened} =
    useAccordion();
  const {FaqSectionScrollViewRef} = useRefsContext();
  const itemRefs = useRef();
  const rotation = useSharedValue(0);

  const animatedRotateStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  const handlePress = () => {
    runOnUI(setHeight)();
    rotation.value = withTiming(isOpened.value ? 0 : 180, {
      duration: 200,
      easing: Easing.ease,
    });
    if (!isOpened.value) {
      itemRefs.current?.measure((height: number, pageY: number) => {
        FaqSectionScrollViewRef.current?.scrollTo({
          y: SIZES.height + pageY,
          animated: true,
        });
      });
    }
  };

  return (
    <View style={styles.faqAccordion} ref={itemRefs}>
      <Pressable onPress={handlePress}>
        <View style={styles.faqSectionItem}>
          <View style={styles.faqSectionItemLeft}>
            <View>
              <Typography
                weight="NotoSerifCondensedBoldItalic"
                style={styles.faqSectionItemTitle}>
                {title}
              </Typography>
            </View>
          </View>

          <View style={styles.faqSectionItemRight}>
            <Animated.Image
              source={arrow}
              style={[styles.faqSectionItemRightIcon, animatedRotateStyle]}
            />
          </View>
        </View>
      </Pressable>
      <Animated.View style={animatedheightStyle}>
        <View style={styles.faqSectionItemAccordionWrapper}>
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

export default FAQAccordion;
//style={styles.faqSectionAccordionDescription}
