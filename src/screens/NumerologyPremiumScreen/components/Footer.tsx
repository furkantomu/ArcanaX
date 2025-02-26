import React, {useEffect} from 'react';
import {View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getStyles} from '../styles';
import {Button} from '@/components';
import {useNumerologyPremiumContext} from '../NumerologyPremiumContext';
import {useRefsContext} from '@/context';
import {SIZES} from '@/styles/theme';

const Footer = () => {
  const styles = getStyles();
  const navigation = useNavigation();
  const {saveNumerologySheetRef} = useRefsContext();

  const {completed} = useNumerologyPremiumContext();

  const handlePress = () => {
    saveNumerologySheetRef.current?.scrollTo(-SIZES.height / 2);
  };

  useEffect(() => {
    if (!completed) {
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        Alert.alert(
          'Numeroloji Analizi',
          'Bu sayfadan çıkmak istediğinize emin misiniz?',
          [
            {text: 'Hayır', style: 'cancel'},
            {
              text: 'Evet',
              onPress: () => {
                saveNumerologySheetRef.current?.scrollTo(-SIZES.height / 2);
              },
            },
          ],
        );
      });
      return unsubscribe;
    }
  }, [completed, navigation, saveNumerologySheetRef]);

  return (
    <View style={styles.footer}>
      <Button
        text="Kaydet ve Anasayfaya Dön"
        handlePress={handlePress}
        variant={'secondary'}
        buttonStyle={styles.saveButton}
      />
    </View>
  );
};

export default Footer;
