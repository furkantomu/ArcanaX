import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLORS, SIZES} from '@/styles/theme';
import {CustomHeader, Typography} from '@/components';
import {apiService} from '@/services/APIService';
import {showToast} from '@/utils/showToast';
import i18n from '@/i18n';
import dayjs from 'dayjs';
import {useAppSelector} from '@/hooks';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import Markdown, {MarkdownIt} from 'react-native-markdown-display';

type SaveDetail = {
  createdAt: string;
  id: string;
  userId: string;
  messages: [{role: string; content: string}];
};

type MyTarotAnalysisSaveDetailRouteParams = {
  saveDetail: {
    createdAt: string;
    id: string;
    saveName: string;
    userId: string;
  };
};

type DMyTarotAnalysisSaveDetailRouteProp = RouteProp<
  {MyTarotAnalysisDetail: MyTarotAnalysisSaveDetailRouteParams},
  'MyTarotAnalysisDetail'
>;
const markdownStyles = {
  body: {color: COLORS.cream, fontSize: 15, fontFamily: 'NotoSerif-Regular'},
  strong: {color: COLORS.gold},
};
const MyTarotAnalysisSaveDetail = () => {
  const route = useRoute<DMyTarotAnalysisSaveDetailRouteProp>();
  const {saveDetail} = route.params;
  const {localeValue} = useAppSelector(state => state.settings);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const [detail, setDetail] = useState<SaveDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getSaveDetail = async () => {
    try {
      setLoading(true);
      const {data} = await apiService.get<SaveDetail>(
        `tarot/save-detail/${saveDetail.id}`,
      );
      setDetail(data);
      opacity.value = withDelay(
        300,
        withSpring(1, {damping: 12, stiffness: 100}),
      );
      scale.value = withDelay(300, withSpring(1, {damping: 12, stiffness: 50}));
    } catch (error) {
      showToast({
        message: 'Sunucuya baplanırken bir hata oluştu.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSaveDetail();
  }, []);

  const animatedBadgeStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });
  return (
    <LinearGradient
      colors={[COLORS.darkGray, '#3F2305', COLORS.darkGray]}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader leftIcon={true} title={true} rightIcon={true} />
        <ScrollView>
          {loading ? (
            <ActivityIndicator />
          ) : (
            detail?.messages.map((item, idx) => (
              <Animated.View
                style={[styles.resultContainer, animatedBadgeStyle]}
                key={idx}>
                <View
                  style={[
                    styles.result,
                    item.role === 'user'
                      ? styles.selfMessage
                      : styles.otherMessage,
                  ]}>
                  <Markdown
                    markdownit={MarkdownIt({
                      typographer: true,
                      linkify: true,
                      breaks: true,
                    }).disable(['blockquote', 'list', 'code'])}
                    style={markdownStyles}>
                    {item.content}
                  </Markdown>
                </View>
              </Animated.View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MyTarotAnalysisSaveDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  result: {
    backgroundColor: COLORS.blackOpacity1,
    borderWidth: 0.5,
    borderColor: COLORS.cream,
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  resultText: {
    color: COLORS.cream,
    fontSize: SIZES.body4,
  },
  selfMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.darkGray,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.blackOpacity,
  },
});
