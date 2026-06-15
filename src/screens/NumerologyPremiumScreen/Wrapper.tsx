import React, {useEffect} from 'react';
import Content from './components/Content';
import LifePathSection from './LifePathSection';
import Footer from './components/Footer';
import {useNumerologyPremiumContext} from './NumerologyPremiumContext';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/types/navigation/navigation';

const Wrapper = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, 'NumerologyPremiumScreen'>>();
  const {numerologyDetail} = route.params;
  const {setNumerologyDetail} = useNumerologyPremiumContext();

  useEffect(() => {
    setNumerologyDetail(numerologyDetail);
  }, [numerologyDetail, setNumerologyDetail]);
  return (
    <>
      <Content />
      <LifePathSection />
      <Footer />
    </>
  );
};

export default Wrapper;
