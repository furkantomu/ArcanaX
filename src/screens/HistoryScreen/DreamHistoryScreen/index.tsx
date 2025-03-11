import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES} from '@/styles/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader, Typography} from '@/components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {apiService} from '@/services/APIService';
import {showToast} from '@/utils/showToast';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import dayjs from 'dayjs';
import {DreamDetailResponse} from '@/types/service';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';
import i18n from '@/i18n';

type DreamHistoryRouteParams = {
  id: string;
};

type DreamHistoryRouteProp = RouteProp<
  {DreamHistoryScreen: DreamHistoryRouteParams},
  'DreamHistoryScreen'
>;

const markdownStyles = {
  body: {color: COLORS.cream, fontSize: 15, fontFamily: 'NotoSerif-Regular'},
  strong: {color: COLORS.gold},
};
const DreamHistoryScreen = () => {
  const route = useRoute<DreamHistoryRouteProp>();
  const {id} = route.params;
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const [messages, setMessages] = useState<DreamDetailResponse>({
    createdAt: '',
    messages: [],
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    opacity.value = withDelay(
      300,
      withSpring(1, {damping: 12, stiffness: 100}),
    );
    scale.value = withDelay(300, withSpring(1, {damping: 12, stiffness: 50}));
  }, [opacity, scale]);
  useEffect(() => {
    const getSaveDetail = async () => {
      try {
        setLoading(true);
        const result = await apiService.get<DreamDetailResponse>(
          `dream/save-detail/${id}`,
        );
        setMessages({
          createdAt: result.data.createdAt,
          messages: result.data.messages,
        });
      } catch (error) {
        showToast({
          message: 'Sunucuya bağlanırken bir hata oluştu.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
    getSaveDetail();
  }, [id]);

  const animatedBadgeStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <LinearGradient colors={[COLORS.black, '#3F2305']} style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
        <CustomHeader leftIcon={true} title={true} rightIcon={false} />
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Typography style={{textAlign: 'center'}}>
           {i18n.t('SAVE_HISTORY.TRANSACTION_DATE')}: {dayjs(messages.createdAt).format('DD MMMM YYYY')}
          </Typography>
          {loading ? (
            <ActivityIndicator />
          ) : (
            messages.messages.map((item, idx) => (
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
                //rules={rules}
                style={markdownStyles}>
                {item.content}
              </Markdown>
                </View>
              </Animated.View>
            ))
          )}
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default DreamHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 5,
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
