import React, { useState } from 'react';

import Header from './Header';
import AnimatedLoading from './AnimatedLoading';
import NumerologyForm from './NumerologyForm';

const Content = () => {
  return (
    <>
      <Header />
      <NumerologyForm />
      <AnimatedLoading />
    </>
  );
};

export default Content;
