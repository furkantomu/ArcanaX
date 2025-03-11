import {View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getStyles} from '../styles';

import {AxiosResponse} from 'axios';
import {apiService} from '@/services/APIService';
import {useNumerologyHistoryContext} from '../NumerologyHistoryContext';
import {Typography} from '@/components';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

interface ResponseData {
  id: string;
  auspiciousMonths: string;
  career: string;
  description: string;
  planet: string;
  relationships: string;
}

const StaticInfo = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const styles = getStyles();
  const [loading, setLoading] = useState(false);
  const [karmicNumberDetails, setKarmicNumberDetails] = useState({
    id: '',
    description: '',
    label: '',
    value: '',
  });
  const [rulingPlanet, setRulingPlanet] = useState({
    planet: '',
    description: '',
    career: '',
    relationships: '',
    auspiciousMonths: '',
  });
  const {numerologyDetail} = useNumerologyHistoryContext();

  useEffect(() => {
    if (numerologyDetail.checkSpecificNumber) {
      const getKarmicNumber = async () => {
        try {
          const response: AxiosResponse<{
            id: string;
            value: string;
            label: string;
            description: string;
          }> = await apiService.get(
            `numerology/karmicNumber/${
              numerologyDetail.birthDate.split('-')[0]
            }`,
          );
          setKarmicNumberDetails({
            id: response.data.id,
            value: response.data.value,
            description: response.data.description,
            label: response.data.label,
          });
        } catch (error) {
          console.log(error);
        }
      };
      getKarmicNumber();
    }
  }, [numerologyDetail.birthDate, numerologyDetail.checkSpecificNumber]);
  useEffect(() => {
    const getRulingPlanets = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<ResponseData> = await apiService.get(
          `numerology/rulingPlanets/${numerologyDetail.rulingPlanet}`,
        );
        setRulingPlanet({
          auspiciousMonths: response.data.auspiciousMonths,
          career: response.data.career,
          description: response.data.description,
          planet: response.data.planet,
          relationships: response.data.relationships,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (numerologyDetail.rulingPlanet !== 0) {
      getRulingPlanets();
    }
  }, [numerologyDetail.rulingPlanet]);
  return (
    <View style={styles.planetSection}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View>
            <Typography size="heading" style={styles.planetSectionTitle}>
             {i18n.t('NUMEROLOGY_PREMIUM_SCREEN.RULING_PLANET', {locale:localeValue})}:
              <Typography size="heading" style={styles.planetSectionResult}>
                {' '}
                {rulingPlanet.planet}
              </Typography>
            </Typography>

            <Typography size="medium">{rulingPlanet.description}</Typography>
          </View>

          <View>
            <Typography size="heading" style={styles.planetSectionTitle}>
            {i18n.t('NUMEROLOGY_PREMIUM_SCREEN.CAREER', {locale:localeValue})}
            </Typography>
            <Typography>{rulingPlanet.career}</Typography>
          </View>
          <View>
            <Typography size="heading" style={styles.planetSectionTitle}>
            {i18n.t('NUMEROLOGY_PREMIUM_SCREEN.RELATIONSHIPS', {locale:localeValue})}
            </Typography>
            <Typography>{rulingPlanet.relationships}</Typography>
          </View>
          <View>
            <Typography size="heading" style={styles.planetSectionTitle}>
            {i18n.t('NUMEROLOGY_PREMIUM_SCREEN.SPECIAL_MONTHS', {locale:localeValue})}
            </Typography>
            <Typography>{rulingPlanet.auspiciousMonths}</Typography>
          </View>
        </>
      )}
      {numerologyDetail.checkSpecificNumber && (
        <View>
          <Typography size="heading" style={styles.planetSectionTitle}>
            {karmicNumberDetails.value}
          </Typography>
          <Typography size="large" style={styles.karmicNumberLabel}>
            '{karmicNumberDetails.label}'
          </Typography>
          <Typography>{karmicNumberDetails.description}</Typography>
        </View>
      )}
    </View>
  );
};

export default StaticInfo;
