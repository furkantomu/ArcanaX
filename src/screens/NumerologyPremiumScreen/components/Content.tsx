import React from 'react';
import {View} from 'react-native';

import {getStyles} from '../styles';
import LifePathNumber from '../numerology/LifePathNumber';
import ExpressionNumber from '../numerology/ExpressionNumber';
import RadicalNumber from '../numerology/RadicalNumber';
import PersonalYearNumber from '../numerology/PersonalYearNumber';
import { useRoute } from '@react-navigation/native';


const Content = () => {
  const styles = getStyles();
  const route = useRoute();
  const {numerologyDetail} = route.params;

  return (
    <View style={styles.content}>
      <LifePathNumber numerologyDetail={numerologyDetail}/>
      <ExpressionNumber numerologyDetail={numerologyDetail}/>
      <RadicalNumber numerologyDetail={numerologyDetail} />
      <PersonalYearNumber numerologyDetail={numerologyDetail}/>
    </View>
  );
};

export default Content;
