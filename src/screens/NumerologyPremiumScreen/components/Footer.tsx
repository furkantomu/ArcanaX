import React, {useEffect} from 'react';
import {View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getStyles} from '../styles';
import {Button} from '@/components';
import {useNumerologyPremiumContext} from '../NumerologyPremiumContext';
import {useRefsContext} from '@/context';
import {SIZES} from '@/styles/theme';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const Footer = () => {
  const styles = getStyles();
  const navigation = useNavigation();
  const {saveNumerologySheetRef} = useRefsContext();
  const {localeValue} = useAppSelector(state => state.settings);
  const {completed} = useNumerologyPremiumContext();

  const handlePress = () => {
    saveNumerologySheetRef.current?.scrollTo(-SIZES.height / 2);
  };

  useEffect(() => {
    if (!completed) {
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        Alert.alert(
          i18n.t('ALERT.TITLE', {locale:localeValue}),
          i18n.t('ALERT.DESCRIPTION', {locale:localeValue}),
          [
            {text:  i18n.t('ALERT.NO', {locale:localeValue}), style: 'cancel'},
            {
              text:  i18n.t('ALERT.YES', {locale:localeValue}),
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
        text={i18n.t('NUMEROLOGY_PREMIUM_SCREEN.BUTTON_TEXT', {locale:localeValue})}
        handlePress={handlePress}
        variant={'secondary'}
        buttonStyle={styles.saveButton}
      />
    </View>
  );
};

export default Footer;
