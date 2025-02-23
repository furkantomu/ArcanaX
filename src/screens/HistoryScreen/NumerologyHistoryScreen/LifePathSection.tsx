import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {AxiosResponse} from 'axios';

import {getStyles} from './styles';
import {apiService} from '@/services/APIService';
import LifePathSectionAccordion from './components/LifePathSectionAccordion';
import {useNumerologyHistoryContext} from './NumerologyHistoryContext';

const SUB_TITLE = ['İlk Dönem', 'İkinci Dönem', 'Üçüncü Dönem'];

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

  const [pinnacleNumber, setPinnacleNumber] = useState<PinnacleNumber | null>(
    null,
  );
  const [section, setSection] = useState<string[]>(['0 - 28 Yaş', '', '']);

  const {numerologyDetail} = useNumerologyHistoryContext();

  const updateAgeSections = (startAge: number) => {
    const secondPeriodEnd = startAge + 9;
    const thirdPeriodEnd = startAge + 18; // Mantıklı bir yaş sınırı belirlenmeli
    setSection([
      `(0 - ${startAge}) Yaş`,
      `(${startAge + 1} - ${secondPeriodEnd}) Yaş`,
      `(${secondPeriodEnd + 1} - ${thirdPeriodEnd}) Yaş`,
    ]);
  };

  useEffect(() => {
    const getPinnacleNumber = async () => {
      if (!numerologyDetail.pinnacleNumber) {return;}
      try {
        setLoading(true);
        const response: AxiosResponse<PinnacleNumber> = await apiService.get(
          `numerology/pinnacleNumber/${String(
            numerologyDetail.pinnacleNumber,
          )}`,
        );
        setPinnacleNumber(response.data);
        updateAgeSections(Number(response.data.age));
      } catch (error) {
        console.error('PinnacleNumber API hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    getPinnacleNumber();
  }, [numerologyDetail.pinnacleNumber]);

  return (
    <View style={styles.lifePathSection}>
      <Text style={styles.lifePathSectionTitle}>Zirve Dönemler</Text>
      <View style={styles.lifePathSectionWrapper}>
        {['first', 'second', 'third'].map((item, idx) => (
          <LifePathSectionAccordion
            key={idx}
            title={SUB_TITLE[idx]}
            description={section[idx]}
            content={
              pinnacleNumber
                ? String(pinnacleNumber[item as keyof PinnacleNumber])
                : '-'
            }
            loading={loading}
          />
        ))}
      </View>
    </View>
  );
};

export default LifePathSection;
