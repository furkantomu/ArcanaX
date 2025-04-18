import {COLORS} from '@/styles/theme';
import {StyleSheet, View} from 'react-native';
import Wrapper from './Wrapper';
import {AppProvider} from './TarotDetailScreenContext';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {CustomHeader} from '@/components';

const TarotCardDetail = () => {
  const navigation = useNavigation();

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
  return (
    <AppProvider>
      <LinearGradient
        colors={['#3F2305', COLORS.darkGray, '#3F2305']}
        style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <CustomHeader leftIcon={true} title={false} rightIcon={false} />
          <Wrapper />
        </SafeAreaView>
      </LinearGradient>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TarotCardDetail;
