import React, { useEffect } from 'react';
import {View} from 'react-native';

import CollapsibleMenu from './components/CollapsibleMenu';

import {getStyles} from './styles';
import { useTarotDetailContext } from './TarotDetailScreenContext';

const TarotDetailWrapper = () => {
  const {fetchTarotCards} = useTarotDetailContext();
  const styles = getStyles();

  useEffect(() => {
    fetchTarotCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.wrapper}>
      <CollapsibleMenu />
    </View>
  );
};

export default TarotDetailWrapper;
