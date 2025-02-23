import React from 'react';
import {View} from 'react-native';

import DreamEntry from './components/DreamEntry';
import Header from './components/Header';
import FooterButton from './components/FooterButton';
import Content from './components/Content';

import {getStyles} from './styles';
import {useDreamContext} from './DreamScreenContext';
import SaveModal from './components/SaveModal';

const DreamWrapper = () => {
  const styles = getStyles();
  const {messages} = useDreamContext();
  return (
    <View style={styles.container}>
      <View>
      <Header />
      {messages.length === 0 && (<DreamEntry />)}
      </View>
      <Content />
      <FooterButton />
      <SaveModal/>
    </View>
  );
};

export default DreamWrapper;
