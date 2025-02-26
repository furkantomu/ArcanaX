import React from 'react';
import {ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Wrapper from './Wrapper';

import {COLORS} from '@/styles/theme';
import {AppProvider} from './NumerologyHistoryContext';
import {useRefsContext} from '@/context';
import {SafeAreaView} from 'react-native-safe-area-context';
import { CustomHeader } from '@/components';

const NumerologyHistoryScreen = () => {
  const {lifePathAccordionScrollViewRef} = useRefsContext();
  return (
    <AppProvider>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <LinearGradient colors={[COLORS.black, '#3F2305']} style={{flex: 1}}>
        <ScrollView
          ref={lifePathAccordionScrollViewRef}
          showsVerticalScrollIndicator={false}>
          <SafeAreaView>
          <CustomHeader leftIcon={true} title={true} rightIcon={false} />
            <Wrapper />
          </SafeAreaView>
        </ScrollView>
      </LinearGradient>
    </AppProvider>
  );
};

export default NumerologyHistoryScreen;
