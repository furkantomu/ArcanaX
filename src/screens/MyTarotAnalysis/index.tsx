import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppProvider} from './MyTarotAnalysisContext';

import {CustomHeader} from '@/components';

import {COLORS} from '@/styles/theme';
import {getStyles} from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import Wrapper from './Wrapper';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

type MyTarotAnalysisRouteParams = {
  selectedCards: [
    {
      id: string;
      name: string;
      category: 'swords' | 'wands' | 'cups' | 'pentacles' | 'major';
      engName: string;
      frontImageSource: string;
    },
  ];
};

type MyTarotAnalysisRouteProp = RouteProp<
  {MyTarotAnalysis: MyTarotAnalysisRouteParams},
  'MyTarotAnalysis'
>;

const MyTarotAnalysis = () => {
  const styles = getStyles();
  const route = useRoute<MyTarotAnalysisRouteProp>();
  const {selectedCards} = route.params;

  return (
    <AppProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
          colors={[COLORS.darkGray, '#3F2305', COLORS.darkGray]}
          style={{flex: 1}}>
          <SafeAreaView style={styles.container}>
            <CustomHeader leftIcon={true} title={false} rightIcon={false} />
            <Wrapper cards={selectedCards} />
          </SafeAreaView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </AppProvider>
  );
};

export default MyTarotAnalysis;
