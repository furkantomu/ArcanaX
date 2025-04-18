import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '@/styles/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getStyles} from './styles';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import {CustomHeader, Icon, Typography} from '@/components';
import {useNavigation} from '@react-navigation/native';
import Animated, {FadeInDown, useAnimatedStyle} from 'react-native-reanimated';
import {apiService} from '@/services/APIService';
import {useAppSelector} from '@/hooks';
import {showToast} from '@/utils/showToast';
import dayjs from 'dayjs';
// onPress={() =>
//     navigation.navigate('MyTarotAnalysisSaveDetail', {saveDetail: item})
//   }



const MyTarotAnalysisSave = () => {
  const styles = getStyles();
  const navigation = useNavigation();
  const {user} = useAppSelector(state => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveData, setSaveData] = useState<
    | [
        {
          id: string;
          saveName: string;
          userId: string;
          createdAt: string;
        },
      ]
    | null
  >(null);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });

    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: '#f5f5dc4f',
          position: 'absolute',
          marginHorizontal: 30,
          marginBottom: 20,
          borderTopWidth: 0,
          height: 50,
          borderBottomWidth: 0,
          borderRadius: 50,
          elevation: 0,
        },
      });
  }, [navigation]);

  const getSave = async () => {
    try {
      setLoading(true);
      const result = await apiService.get<
        [
          {
            id: string;
            saveName: string;
            userId: string;
            createdAt: string;
          },
        ]
      >(`tarot/save/${user?.id}`);
      setSaveData(result.data);
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
    getSave();
  }, []);

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <Pressable
      onPress={() =>
        navigation.navigate('MyTarotAnalysisSaveDetail', {saveDetail: item})
      }>
      <Animated.View
        entering={FadeInDown.delay(index * 100).springify()}
        style={{
          backgroundColor: COLORS.cream,
          marginVertical: 8,
          padding: 16,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 3,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Typography
            size="large"
            weight="bold"
            style={{fontWeight: 'bold', color: COLORS.black}}>
            {item.saveName}
          </Typography>
          <Typography style={{color: '#666', marginTop: 4}}>
            {dayjs(item.createdAt).format('DD-MM-YYYY HH:mm')}
          </Typography>
        </View>
        <Icon name="rightArrow" size={32} />
      </Animated.View>
    </Pressable>
  );
  return (
    <LinearGradient
      colors={[COLORS.darkGray, '#3F2305', COLORS.darkGray]}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <CustomHeader leftIcon={true} title={true} rightIcon={true} />
        <View>
          <FlatList
            data={saveData}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{padding: 20}}
            ListFooterComponent={
              loading ? <ActivityIndicator size="small" /> : null
            }
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MyTarotAnalysisSave;
