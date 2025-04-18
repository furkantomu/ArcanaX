import {View, StyleSheet} from 'react-native';
import React from 'react';

import {COLORS} from '@/styles/theme';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Wrapper from './Wrapper';
import { getStyles } from './styles';

const GuidanceHome = () => {
  const styles = getStyles();
  return (
    <LinearGradient
      colors={[COLORS.darkGray, '#3F2305', COLORS.darkGray]}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <Wrapper />
      </SafeAreaView>
    </LinearGradient>
  );
};



export default GuidanceHome;
