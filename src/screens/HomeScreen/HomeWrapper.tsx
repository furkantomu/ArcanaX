import React from 'react';
import {View} from 'react-native';
import {CustomHeader} from '@/components';
import Slider from './components/Slider';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getStyles} from './styles';
import { DUMMY } from '@/utils/dummy';
import BackDrop from './components/BackDrop';
import { useSharedValue } from 'react-native-reanimated';

const HomeWrapper = () => {
  const styles = getStyles();
  const scrollX = useSharedValue(0);
  return (
    <View style={styles.flex}>
      {DUMMY.map((item, index) => (
        <BackDrop
          key={index}
          image={item.imageSource}
          index={index}
          scrollX={scrollX}
        />
      ))}
      <SafeAreaView>
        <CustomHeader leftIcon={false} title={true} rightIcon={true} />
        <Slider scrollX={scrollX}/>
      </SafeAreaView>
    </View>
  );
};

export default HomeWrapper;
