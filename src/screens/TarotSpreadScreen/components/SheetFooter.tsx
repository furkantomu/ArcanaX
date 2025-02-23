import React from 'react';
import {View} from 'react-native';

import {Button, Typography} from '@/components';

import {useTarotContext} from '../TarotContext';

import {getStyles} from '../style';
import {useRefsContext} from '@/context';

const SheetFooter = () => {
  const {readingType, selectedCards, setReadingStarted} = useTarotContext();
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
        {readingType}/{selectedCards.length} Kart Seçildi
      </Typography>
      <Button
        text="Kartları Onayla"
        variant="secondary"
        textStyle={styles.bottomSheetButtonText}
        disabled={selectedCards.length !== readingType}
        handlePress={handlePress}
      />
    </View>
  );
};

export default SheetFooter;
