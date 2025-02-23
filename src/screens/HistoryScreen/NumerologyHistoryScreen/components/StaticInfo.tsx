import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getStyles} from '../styles';

import {useRoute} from '@react-navigation/native';

import {AxiosResponse} from 'axios';
import {apiService} from '@/services/APIService';
import {useNumerologyHistoryContext} from '../NumerologyHistoryContext';

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
   if(numerologyDetail.rulingPlanet !== 0){
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
            <Text style={styles.planetSectionTitle}>
              Yönetici Gezegen:
              <Text style={styles.planetSectionTResult}>
                {' '}
                {rulingPlanet.planet}
              </Text>
            </Text>

            <Text style={styles.planetSectionDescription}>
              {rulingPlanet.description}
            </Text>
          </View>

          <View>
            <Text style={styles.planetSectionTitle}>Kariyer</Text>
            <Text style={styles.planetSectionDescription}>
              {rulingPlanet.career}
            </Text>
          </View>
          <View>
            <Text style={styles.planetSectionTitle}>İlişkiler</Text>
            <Text style={styles.planetSectionDescription}>
              {rulingPlanet.relationships}
            </Text>
          </View>
          <View>
            <Text style={styles.planetSectionTitle}>Özel Aylar</Text>
            <Text style={styles.planetSectionDescription}>
              {rulingPlanet.auspiciousMonths}
            </Text>
          </View>
        </>
      )}
      {numerologyDetail.checkSpecificNumber && (
        <View>
          <Text style={styles.planetSectionTitle}>
            {karmicNumberDetails.value}
          </Text>
          <Text style={styles.karmicNumberLabel}>
            '{karmicNumberDetails.label}'
          </Text>
          <Text style={styles.planetSectionDescription}>
            {karmicNumberDetails.description}
          </Text>
        </View>
      )}
    </View>
  );
};

export default StaticInfo;
