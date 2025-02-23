import React, {useEffect} from 'react';
import Content from './components/Content';
import LifePathSection from './LifePathSection';
import Footer from './components/Footer';
import {useNumerologyPremiumContext} from './NumerologyPremiumContext';
import {useRoute} from '@react-navigation/native';

const Wrapper = () => {
  const route = useRoute();
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
