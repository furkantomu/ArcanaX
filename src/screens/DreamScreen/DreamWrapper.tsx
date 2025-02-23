import React from 'react';
import {View} from 'react-native';

import Header from './components/Header';
import Content from './components/Content';
import AnimatedContent from './components/AnimatedContent';
import FooterButton from './components/FooterButton';

import {getStyles} from './styles';

const DreamWrapper = () => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Header/>
      <Content/>
      <AnimatedContent/>
      <FooterButton/>
    </View>
  );
};

export default DreamWrapper;
