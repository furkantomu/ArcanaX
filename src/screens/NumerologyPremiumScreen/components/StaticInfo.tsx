import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getStyles} from '../styles';

import {useRoute} from '@react-navigation/native';
import {useNumerologyPremiumContext} from '../NumerologyPremiumContext';
import {AxiosResponse} from 'axios';
import {apiService} from '@/services/APIService';
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
  const styles = getStyles();
  const {localeValue} = useAppSelector(state => state.settings);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const {numerologyDetail} = route.params;
  const {
    rulingPlanet,
    karmicNumberDetails,
    setKarmicNumberDetails,
    setRulingPlanet,
  } = useNumerologyPremiumContext();

  useEffect(() => {
    if (numerologyDetail.checkSpecificNumber) {
      const getKarmicNumber = async () => {
        try {
          const response: AxiosResponse<{
            value: string;
            label: string;
            description: string;
          }> = await apiService.get(
            `numerology/karmicNumber/${
              numerologyDetail.birthDate.split('-')[0]
            }`,
          );
          setKarmicNumberDetails({
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const getRulingPlanets = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<ResponseData> = await apiService.get(
          `numerology/rulingPlanets/${numerologyDetail.radicalNumber}`,
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
    getRulingPlanets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.planetSection}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View>
            <Typography style={styles.planetSectionTitle}>
              {i18n.t('NUMEROLOGY_PREMIUM_SCREEN.RULING_PLANET', {locale:localeValue})}:
              <Text style={styles.planetSectionTResult}>
                {rulingPlanet.planet}
              </Text>
            </Typography>

            <Typography size="medium">{rulingPlanet.description}</Typography>
          </View>

          <View>
            <Typography style={styles.planetSectionTitle}>{i18n.t('NUMEROLOGY_PREMIUM_SCREEN.CAREER', {locale:localeValue})}</Typography>
            <Typography size="medium">{rulingPlanet.career}</Typography>
          </View>
          <View>
            <Typography style={styles.planetSectionTitle}>{i18n.t('NUMEROLOGY_PREMIUM_SCREEN.RELATIONSHIPS', {locale:localeValue})}</Typography>
            <Typography size="medium">{rulingPlanet.relationships}</Typography>
          </View>
          <View>
            <Typography style={styles.planetSectionTitle}>
            {i18n.t('NUMEROLOGY_PREMIUM_SCREEN.SPECIAL_MONTHS', {locale:localeValue})}
            </Typography>
            <Typography size="medium">
              {rulingPlanet.auspiciousMonths}
            </Typography>
          </View>
        </>
      )}
      {numerologyDetail.checkSpecificNumber && (
        <View>
           <Typography style={styles.planetSectionTitle}>
            {karmicNumberDetails.value}
          </Typography>
          <Typography style={styles.karmicNumberLabel}>
            '{karmicNumberDetails.label}'
          </Typography>
          <Typography size="medium" >
            {karmicNumberDetails.description}
          </Typography>
        </View>
      )}
    </View>
  );
};

export default StaticInfo;
