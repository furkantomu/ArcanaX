import {View} from 'react-native';
import React from 'react';
import { getStyles } from '../styles';
import { IconButton } from '@/components';
import { useNavigation } from '@react-navigation/native';

const FooterButton = () => {
    const styles = getStyles();
    const navigation = useNavigation();
    const handlePress = () => {
       navigation.navigate('DreamPremiumScreen');
    }
  return (
    <View style={styles.footerWrapper}>
     <IconButton
          iconName={'diamond'}
          iconSize={40}
          text="Hemen Başlayın!"
          buttonStyle={styles.footerButton}
          handlePress={handlePress}
        />
    </View>
  );
};

export default FooterButton;
