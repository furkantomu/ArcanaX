import React, {useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {getStyles} from './styles';
import {Button, Icon, Typography} from '@/components';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';
import Footer from './components/Footer';
import {useMyTarotAnalysisDetailContext} from './MyTarotAnalysisDetailContext';
import Header from './components/Header';
import Messages from './components/Messages';

type CardType = {
  cardName: string;
  cardId: string;
  image: string;
};

type WrapperProps = {
  card: CardType;
};

const Wrapper = ({card}: WrapperProps) => {
  const styles = getStyles();
  const {localeValue} = useAppSelector(state => state.settings);
  const {setTarotCards, startReading} = useMyTarotAnalysisDetailContext();
  useEffect(() => {
    setTarotCards(card);
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <Messages/>
      {startReading && <Footer />}
    </View>
  );
};

export default Wrapper;
