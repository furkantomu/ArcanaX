import {Icon, Typography} from '@/components';
import {useAppSelector} from '@/hooks';
import {COLORS, SIZES} from '@/styles/theme';
import {useScaleAnimation} from '@/utils';
import { responsiveSize } from '@/utils/responsiveSize';
import {showToast} from '@/utils/showToast';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, FlatList, StyleSheet, Pressable} from 'react-native';
import Animated, {FadeInUp} from 'react-native-reanimated';

type MenuItem = {
  id: string;
  title: string;
  engTitle: string;
  description: string;
  engDescription: string;
  icon: string;
  navigate?: string;
};

const menuItems: MenuItem[] = [
  {
    id: '1',
    title: 'Kendi Kart Yorumu Yap',
    description: "Kart çek, sezgisel olarak yorumla ve AI'den rehberlik al.",
    engTitle: 'Do Your Own Card Reading',
    engDescription:
      'Draw a card, interpret it intuitively, and get guidance from AI.',
    icon: 'yoga',
    navigate: 'MyTarotReading',
  },
  {
    id: '2',
    title: '3 Kart Açılımı ile Pratik',
    description: 'Geçmiş - Şimdi - Gelecek açılımı yap ve yorumlamaya çalış.',
    engTitle: 'Practice with 3-Card Spread',
    engDescription:
      'Do a Past - Present - Future spread and try to interpret it.',
    icon: 'crystalBall',
    navigate: '',
  },
  {
    id: '3',
    title: 'Kartların Anlamlarını Öğren',
    description: 'Her gün bir kartın anlamını keşfet ve içgörü kazan.',
    engTitle: 'Learn the Meanings of the Cards',
    engDescription: 'Discover the meaning of a card each day and gain insight.',
    icon: 'book',
    navigate: 'TarotCardDetail',
  },
  {
    id: '4',
    title: 'Yorumlarını Günlükte Takip Et',
    description: 'Geçmiş yorumlarını sakla, gelişimini izle.',
    engTitle: 'Track Your Interpretations in a Journal',
    engDescription: 'Save your past readings and observe your growth.',
    icon: 'notepad',
    navigate: 'MyTarotAnalysisSave',
  },
];

const List = ({item, index, navigation, localeValue}) => {
  const {handlers, animatedStyle} = useScaleAnimation();
  return (
    <Pressable
      onPress={() => {
        if (item.navigate === '') {
          showToast({
            message: localeValue === 'tr' ? 'Çok Yakında...' : 'Coming Soon...',
          });
          return;
        }
        navigation.navigate(item.navigate);
      }}
      {...handlers}>
      <Animated.View
        entering={FadeInUp.delay(index * 150).duration(600)}
        style={[styles.card, animatedStyle]}>
        <View style={styles.iconContainer}>
          <Icon name={item.icon} size={28} />
        </View>
        <View style={styles.textContainer}>
          <Typography  weight="bold" style={styles.title}>
            {localeValue === 'tr' ? item.title : item.engTitle}
          </Typography>
          <Typography style={styles.description}>
            {localeValue === 'tr' ? item.description : item.engDescription}
          </Typography>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const AnimatedMenu = () => {
  const navigation = useNavigation();
  const {localeValue} = useAppSelector(state => state.settings);
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <FlatList
      data={menuItems}
      keyExtractor={item => item.id}
      contentContainerStyle={{
        paddingBottom: tabBarHeight,
      }}
      renderItem={({item, index}) => (
        <List
          item={item}
          index={index}
          navigation={navigation}
          localeValue={localeValue}
        />
      )}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.cream,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
    height: SIZES.height * 0.12, // örnek sabit yükseklik
  },
  iconContainer: {
    backgroundColor: '#E1DEFC',
    borderRadius: 12,
    padding: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#2D2A5A',
    fontWeight: 'bold',
    fontSize: responsiveSize(22),
  },
  description: {
    color: '#6F6B8C',
    
    fontSize: responsiveSize(17),
  },
});

export default AnimatedMenu;
