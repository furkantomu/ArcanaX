import {IconButton, Typography} from '@/components';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {getStyles} from '../styles';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

type NumerologyDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'NumerologyDetailScreen'
>;

const Footer = () => {
  const route = useRoute<NumerologyDetailScreenRouteProp>();
  const {localeValue} = useAppSelector(state => state.settings);
  const {numerologyDetail} = route.params;
  const styles = getStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <View style={styles.footerWrapper}>
        <Typography size="large" style={styles.description}>
          <Typography
            size="large"
            weight="NotoSerifCondensedBoldItalic"
            style={styles.description}>
            {numerologyDetail.name}:{' '}
          </Typography>{' '}
          {i18n.t('NUMEROLOGY_DETAIL_SCREEN.DESCRIPTION', {locale:localeValue})}
        </Typography>
        <Typography style={styles.description}>
          {i18n.t(`LIFE_PATH_DETAIL.${[numerologyDetail.lifePath]}`, {locale:localeValue})}
        </Typography>
        <IconButton
          text={i18n.t('NUMEROLOGY_DETAIL_SCREEN.BUTTON_TEXT', {locale:localeValue})}
          iconName="diamond"
          iconSize={50}
          variant={'primary'}
          handlePress={() =>
            navigation.navigate('NumerologyPremiumScreen', {numerologyDetail})
          }
        />
      </View>
    </View>
  );
};

export default Footer;
