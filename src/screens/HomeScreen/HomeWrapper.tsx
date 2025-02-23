import React from 'react';
import {CustomHeader} from '@/components';
import Slider from './components/Slider';

const HomeWrapper = () => {


  return (
    <>
      <CustomHeader leftIcon={false} title={true} rightIcon={true} />
      <Slider />
    </>
  );
};

export default HomeWrapper;
