import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {AxiosResponse} from 'axios';

import {getStyles} from './styles';
import {apiService} from '@/services/APIService';
import LifePathSectionAccordion from './components/LifePathSectionAccordion';
import {useNumerologyHistoryContext} from './NumerologyHistoryContext';
import {Typography} from '@/components';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';

interface PinnacleNumber {
  id: string;
  first: string;
  second: string;
  third: string;
  age: number; // Yaş bir sayı olarak kullanılmalı
}

const LifePathSection = () => {
  const [loading, setLoading] = useState(false);
  const styles = getStyles();
  const {localeValue} = useAppSelector(state => state.settings);

  const [pinnacleNumber, setPinnacleNumber] = useState({
    first: '',
    second: '',
    third: '',
  });
  const [section, setSection] = useState<string[]>(['0 - 28 Yaş', '', '']);

  const {numerologyDetail} = useNumerologyHistoryContext();

  const updateAgeSections = (startAge: number) => {
    const secondPeriodEnd = startAge + 9;
    const thirdPeriodEnd = startAge + 18; // Mantıklı bir yaş sınırı belirlenmeli
    setSection([
      `(0 - ${startAge}) ${i18n.t('NUMEROLOGY_PREMIUM_SCREEN.PEAK.AGE', {
        locale: localeValue,
      })}`,
      `(${startAge + 1} - ${secondPeriodEnd}) ${i18n.t(
        'NUMEROLOGY_PREMIUM_SCREEN.PEAK.AGE',
        {locale: localeValue},
      )}`,
      `(${secondPeriodEnd + 1} - ${thirdPeriodEnd}) ${i18n.t(
        'NUMEROLOGY_PREMIUM_SCREEN.PEAK.AGE',
        {locale: localeValue},
      )}`,
    ]);
  };

  useEffect(() => {
    const getPinnacleNumber = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<PinnacleNumber> = await apiService.get(
          `numerology/pinnacleNumber/${numerologyDetail.pinnacleNumber}`,
        );
        setPinnacleNumber({
          first: response.data.first,
          second: response.data.second,
          third: response.data.third,
        });
        updateAgeSections(Number(response.data.age));
      } catch (error) {
        console.error('PinnacleNumber API hatası:', error);
      } finally {
        setLoading(false);
      }
    };
    if (numerologyDetail.pinnacleNumber !== '') {
      getPinnacleNumber();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numerologyDetail, numerologyDetail.pinnacleNumber]);

  return (
    <View style={styles.lifePathSection}>
      <Typography size="title" style={styles.lifePathSectionTitle}>
        {i18n.t('NUMEROLOGY_PREMIUM_SCREEN.PEAK.TITLE', {locale: localeValue})}
      </Typography>
      <View style={styles.lifePathSectionWrapper}>
        {['first', 'second', 'third'].map((item, idx) => (
          <LifePathSectionAccordion
            key={idx}
            title={item}
            description={section[idx]}
            content={pinnacleNumber[item as keyof typeof pinnacleNumber]}
            loading={loading}
          />
        ))}
      </View>
    </View>
  );
};

export default LifePathSection;
