import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

import LifePathSectionAccordion from './components/LifePathSectionAccordion';
import {getStyles} from './styles';
import StaticInfo from './components/StaticInfo';
import {AxiosResponse} from 'axios';
import {apiService} from '@/services/APIService';
import {calculatePinnacleNumber} from '@/utils/calculateNumerology';
import {useNumerologyPremiumContext} from './NumerologyPremiumContext';
import { Typography } from '@/components';

const SUB_TITLE = ['İlk Dönem', 'İkinci Dönem', 'Üçüncü Dönem'];

interface Message {
  userId: string;
  first: string;
  second: string;
  third: string;
  age: string;
}

const LifePathSection = () => {
  const [loading, setLoading] = useState(false);
  const styles = getStyles();
  const route = useRoute();
  const {setPinnacleNumber, pinnacleNumber} = useNumerologyPremiumContext();
  const {numerologyDetail} = route.params;
  const [pinnacleNumberValue, setPinnacleNumberValue] = useState([0, 0, 0]);

  const [section, setSection] = useState(['0 - 28 Yaş', '', '']);

  const updateAgeSections = (startAge: number) => {
    const ageRanges = [
      `(0 - ${startAge}) Yaş`,
      `(${startAge + 1} - ${startAge + 9}) Yaş`,
      `(${startAge + 10} - *) Yaş`,
    ];
    setSection(ageRanges);
  };

  useEffect(() => {
    const calculate = calculatePinnacleNumber(numerologyDetail.birthDate);
    const numbers = [
      calculate.pinnacleNumberOneValue,
      calculate.pinnacleNumberTwoValue,
      calculate.pinnacleNumberThirdValue,
    ];
    setPinnacleNumberValue(numbers);
    const getPinnacleNumber = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<ResponseData> = await apiService.post(
          'numerology/pinnacleNumber',
          {
            name: numerologyDetail.name,
            lifePath: numerologyDetail.lifePath,
            firstNumber: numbers[0],
            secondNumber: numbers[1],
            thirdNumber: numbers[2],
          },
        );
        setPinnacleNumber({
          message: response.data.message,
          id: response.data.id,
        });
        updateAgeSections(Number(response.data.message.age));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPinnacleNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.lifePathSection}>
      <StaticInfo />
      <Typography style={styles.lifePathSectionTitle}>Zirve Dönemler</Typography>
      <View style={styles.lifePathSectionWrapper}>
        {(['first', 'second', 'third'] as (keyof Message)[]).map(
          (item, idx) => (
            <LifePathSectionAccordion
              key={idx}
              title={SUB_TITLE[idx]}
              description={section[idx]}
              content={String(pinnacleNumber?.message[item])}
              loading={loading}
              number={pinnacleNumberValue[idx]}
            />
          ),
        )}
      </View>
    </View>
  );
};

export default LifePathSection;
