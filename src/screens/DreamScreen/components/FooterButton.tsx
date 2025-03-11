import {View} from 'react-native';
import React from 'react';
import { getStyles } from '../styles';
import { IconButton } from '@/components';
import { useNavigation } from '@react-navigation/native';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const FooterButton = () => {
    const styles = getStyles();
    const navigation = useNavigation();
    const {localeValue} = useAppSelector(state => state.settings);
    const handlePress = () => {
       navigation.navigate('DreamPremiumScreen');
    }
  return (
    <View style={styles.footerWrapper}>
     <IconButton
          iconName={'diamond'}
          iconSize={40}
          text={i18n.t('DREAM_SCREEN.BUTTON_TEXT', {locale: localeValue})}
          buttonStyle={styles.footerButton}
          handlePress={handlePress}
        />
    </View>
  );
};

export default FooterButton;
