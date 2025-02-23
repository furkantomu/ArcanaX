import {View} from 'react-native';
import React from 'react';
import CollapsibleMenu from './components/CollapsibleMenu';
import { getStyles } from './styles';

const HistoryWrapper = () => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <CollapsibleMenu />
    </View>
  );
};

export default HistoryWrapper;
