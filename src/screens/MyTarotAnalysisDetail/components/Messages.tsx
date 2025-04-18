import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import Markdown, {MarkdownIt} from 'react-native-markdown-display';

import {useMyTarotAnalysisDetailContext} from '../MyTarotAnalysisDetailContext';

import {getStyles} from '../styles';
import {COLORS} from '@/styles/theme';
import {Loading} from '@/components';

const markdownStyles = {
  body: {color: COLORS.cream, fontSize: 15, fontFamily: 'NotoSerif-Regular'},
  strong: {color: COLORS.gold},
};

const Messages = () => {
  const styles = getStyles();
  const {messages, isWritingLoading, opacity, scale} =
    useMyTarotAnalysisDetailContext();

  const animatedBadgeStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });
  return (
    <View>
      {messages.map((item, idx) => (
        <Animated.View
          style={[styles.resultContainer, animatedBadgeStyle]}
          key={idx}>
          <View
            style={[
              styles.result,
              item.role === 'user' ? styles.selfMessage : styles.otherMessage,
            ]}>
            <Markdown
              markdownit={MarkdownIt({
                typographer: true,
                linkify: true,
                breaks: true,
              }).disable(['blockquote', 'list', 'code'])}
              //rules={rules}
              style={markdownStyles}>
              {item.content}
            </Markdown>
          </View>
        </Animated.View>
      ))}
      {isWritingLoading && (
        <View style={styles.writingLoading}>
          <Loading />
        </View>
      )}
    </View>
  );
};

export default Messages;
