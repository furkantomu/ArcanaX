import {useRoute} from '@react-navigation/native';

import React from 'react';
import {View, Text} from 'react-native';
import {getStyles} from '../styles';



const Header = () => {
  const route = useRoute();
  const {numerologyDetail} = route.params;
  const styles = getStyles();

  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.headerTitle}>Numeroloji Raporunuz</Text>
      <View style={styles.headerNameInfo}>
        <Text style={styles.headerNameInfoText}>{numerologyDetail.name}</Text>
        <Text style={styles.headerNameInfoText}>
          {numerologyDetail.birthDate}
        </Text>
      </View>
    </View>
  );
};

export default Header;
