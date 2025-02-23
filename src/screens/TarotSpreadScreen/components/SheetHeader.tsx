import React, {useEffect} from 'react';
import {View} from 'react-native';

import {Typography} from '@/components';

import {useTarotContext} from '../TarotContext';

import {getStyles} from '../style';

const SheetHeader = ({route}: any) => {
  const {setReadingType} = useTarotContext();

  const styles = getStyles();


  useEffect(() => {
    setReadingType(route.params.type);
  }, [route.params.type, setReadingType]);

  return (
    <View style={styles.bottomSheetHeader}>
      <Typography size={'heading'}>{route.params.type} Kart Seçin</Typography>
      <Typography size="heading" weight="NotoSerifCondensedThin" >
        'Sezgilerine güven, doğru kart seni bekliyor.'
      </Typography>
    </View>
  );
};

export default SheetHeader;
