import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {COLORS} from '@/styles/theme';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useRefsContext} from '@/context';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomSheet, CustomHeader} from '@/components';
import Wrapper from './Wrapper';
import {getStyles} from './styles';
import {AppProvider} from './MyTarotAnalysisDetailContext';
import SaveModal from './components/SaveModal';

type MyTarotAnalysisDetailRouteParams = {
  card: {
    cardName: string;
    cardId: string;
    image: string;
  };
};

type DMyTarotAnalysisDetailRouteProp = RouteProp<
  {MyTarotAnalysisDetail: MyTarotAnalysisDetailRouteParams},
  'MyTarotAnalysisDetail'
>;

const MyTarotAnalysisDetail = () => {
  const route = useRoute<DMyTarotAnalysisDetailRouteProp>();
  const {tarotAnalysisScrollViewRef, saveTarotAnalysisSheetRef} = useRefsContext();
  const {card} = route.params;
  const styles = getStyles();
  return (
    <AppProvider>
      <LinearGradient
        colors={[COLORS.darkGray, '#3F2305', COLORS.darkGray]}
        style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.container]}>
          <ScrollView ref={tarotAnalysisScrollViewRef} showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <SafeAreaView style={styles.container}>
                <CustomHeader leftIcon={true} title={false} rightIcon={true} />
                <Wrapper card={card} />
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
        <BottomSheet ref={saveTarotAnalysisSheetRef}>
          <SaveModal/>
        </BottomSheet>
      </LinearGradient>
    </AppProvider>
  );
};

export default MyTarotAnalysisDetail;
