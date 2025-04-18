import React, {useEffect} from 'react';
import {getStyles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppProvider} from './MyTarotReadingContext';
import {BottomSheet, Card, CustomHeader} from '@/components';
import Header from './components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '@/styles/theme';
import InfoCardsScreen from './components/CarouselInfo';
import {useNavigation} from '@react-navigation/native';
import {useRefsContext} from '@/context';
import MyCardSelect from './components/MyCardSelect';

const MyTarotReading = () => {
  const styles = getStyles();
  const navigation = useNavigation();
  const {myTarotSheetRef} = useRefsContext();

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
        colors={[COLORS.darkGray, '#3F2305', COLORS.darkGray]}
        style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <CustomHeader leftIcon={true} title={false} rightIcon={false} />
          <Header />
          <InfoCardsScreen />
        </SafeAreaView>
        <BottomSheet ref={myTarotSheetRef}>
          <MyCardSelect />
        </BottomSheet>
      </LinearGradient>
    </AppProvider>
  );
};

export default MyTarotReading;
