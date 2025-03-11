import React, {useEffect} from 'react';
import {View} from 'react-native';

import {Typography} from '@/components';

import {useTarotContext} from '../TarotContext';

import {getStyles} from '../style';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const SheetHeader = ({route}: any) => {
  const {setReadingType} = useTarotContext();
  const {localeValue} = useAppSelector(state => state.settings);
  const styles = getStyles();

  useEffect(() => {
    setReadingType(route.params.type);
  }, [route.params.type, setReadingType]);

  return (
    <View style={styles.bottomSheetHeader}>
      <Typography size={'heading'}>
        {route.params.type} {i18n.t('TAROT_READ_START.CARD_SELECTION', {locale: localeValue})}
      </Typography>
      <Typography
        size="heading"
        weight="NotoSerifCondensedThin"
        style={{textAlign: 'center'}}>
        '{i18n.t('TAROT_READ_START.SELECT_MODAL_TITLE', {locale: localeValue})}'
      </Typography>
    </View>
  );
};

export default SheetHeader;
