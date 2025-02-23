import {View} from 'react-native';
import React, {useEffect} from 'react';
import {getStyles} from './styles';
import {useNumerologyHistoryContext} from './NumerologyHistoryContext';
import LifePathNumber from './numerology/LifePathNumber';
import RadicalNumber from './numerology/RadicalNumber';
import ExpressionNumber from './numerology/ExpressionNumber';
import PersonalYearNumber from './numerology/PersonalYearNumber';
import LifePathSection from './LifePathSection';
import StaticInfo from './components/StaticInfo';
import {Typography} from '@/components';

const Wrapper = () => {
  const styles = getStyles();
  const {getSaveDetail, numerologyDetail} = useNumerologyHistoryContext();

  useEffect(() => {
    getSaveDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Typography weight="NotoSerifCondensedBoldItalic" size="large">
          {numerologyDetail.name}
        </Typography>
        <Typography weight="NotoSerifCondensedBoldItalic" size="large">
          {numerologyDetail.birthDate}
        </Typography>
      </View>
      <LifePathNumber />
      <RadicalNumber />
      <ExpressionNumber />
      <PersonalYearNumber />
      <StaticInfo />
      <LifePathSection />
    </View>
  );
};

export default Wrapper;
