import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {Icon, Typography} from '@/components';
import {useHistoryContext} from '../HistoryScreenContext';
import Animated from 'react-native-reanimated';
import {getStyles} from '../styles';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';

interface ButtonTypeProps {
  type: string;
}

const ButtonType: React.FC<ButtonTypeProps> = ({type}) => {
  const styles = getStyles();
  const navigation = useNavigation();
  const {saveType, getSaveDetail, getSave, loading} = useHistoryContext();

  useEffect(() => {
    getSave(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePress = (params: string, id: string) => {
    //getSaveDetail(params, id);

    if (params === 'tarot') {
      navigation.navigate('TarotHistoryScreen', {type: params, id});
    }
    if (params === 'numerology') {
      navigation.navigate('NumerologyHistoryScreen', {type: params, id});
    }
    if (params === 'dream') {
      navigation.navigate('DreamHistoryScreen', {id});
    }
  };
  return (
    <View style={styles.settingsMenuItem}>
      {loading ? (
        <ActivityIndicator />
      ) : saveType.length === 0 ? (
        <Typography>Geçmiş Kayıt Bulunamadı.</Typography>
      ) : (
        saveType.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.8}
            onPress={() => handlePress(type, item.id)}>
            <Animated.View style={styles.menuItem}>
              <View style={styles.rightWrapper}>
                <Typography size="large">
                  {item.saveName
                    ? item.saveName
                    : `${dayjs(item.createdAt).format(
                        'DD MMMM YYYY HH:mm',
                      )} Tarihli Analiz`}
                </Typography>
                <Icon name="rightChevron" size={20} style={styles.rightIcon} />
              </View>
            </Animated.View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

export default ButtonType;
