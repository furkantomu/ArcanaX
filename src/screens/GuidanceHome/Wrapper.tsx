import {View, Text} from 'react-native';
import React from 'react';
import {getStyles} from './styles';
import Header from './Components/Header';
import Menu from './Components/Menu';

const Wrapper = () => {
  const styles = getStyles();
  return (
    <View style={styles.wrapper}>
      <Header />
      <Menu />
    </View>
  );
};

export default Wrapper;
