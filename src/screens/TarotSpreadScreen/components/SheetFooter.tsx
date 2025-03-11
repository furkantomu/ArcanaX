import React from 'react';
import {View} from 'react-native';

import {Button, Typography} from '@/components';

import {useTarotContext} from '../TarotContext';

import {getStyles} from '../style';
import {useRefsContext} from '@/context';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';

const SheetFooter = () => {
  const {readingType, selectedCards, setReadingStarted} = useTarotContext();
  const {localeValue} = useAppSelector(state => state.settings);
  const {selectCardSheetRef} = useRefsContext();

  const styles = getStyles();

  const hideModal = () => {
    selectCardSheetRef.current?.scrollTo(0);
  };
  const handlePress = () => {
    hideModal();
    setReadingStarted(true);
  };
  return (
    <View style={styles.buttonContainer}>
      <Typography size={'large'} style={styles.bottomSheetText}>
        {readingType}/{selectedCards.length}{' '}
        {i18n.t('TAROT_READ_START.CARD_SELECTED', {locale: localeValue})}
      </Typography>
      <Button
        text={i18n.t('TAROT_READ_START.SELECT_MODAL_BUTTON', {
          locale: localeValue,
        })}
        variant="secondary"
        textStyle={styles.bottomSheetButtonText}
        disabled={selectedCards.length !== readingType}
        handlePress={handlePress}
      />
    </View>
  );
};

export default SheetFooter;
