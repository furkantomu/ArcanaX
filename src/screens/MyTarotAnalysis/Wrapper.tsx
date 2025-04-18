import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useMyTarotAnalysisContext} from './MyTarotAnalysisContext';
import {getStyles} from './styles';
import Header from './components/Header';
import AnimatedCard from './components/AnimatedCard';

import Footer from './components/Footer';

const Wrapper = ({cards}: any) => {
  const {setTarotCards} = useMyTarotAnalysisContext();
  const styles = getStyles();
  useEffect(() => {
    setTarotCards(cards);
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <AnimatedCard />
      <Footer />
    </View>
  );
};

export default Wrapper;
