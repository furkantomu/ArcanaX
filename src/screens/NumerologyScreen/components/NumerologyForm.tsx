import React, {useEffect, useState} from 'react';
import { View, Keyboard} from 'react-native';

import {useNumerologyContext} from '../NumerologyContext';

import {calculateNumerology} from '@/utils/calculateNumerology';

import {getStyles} from '../styles';
import {AnimatedTextField, Button} from '@/components';
import {useAppSelector} from '@/hooks';
import dayjs from 'dayjs';

const NumerologyForm = () => {
  const {user} = useAppSelector(state => state.auth);
  const {setCalculate, setNumerologyDetail} = useNumerologyContext();

  const [formData, setFormData] = useState({
    fullName: '',
    day: '',
    month: '',
    year: '',
  });

  useEffect(() => {
    if (user !== null) {
      const day = dayjs(user.birthDate).format('DD');
      const month = dayjs(user.birthDate).format('MM');
      const year = dayjs(user.birthDate).format('YYYY');
      setFormData({
        fullName: user.name,
        day,
        month,
        year,
      });
    }
  }, [user]);
  const styles = getStyles();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handlePress = () => {
    Keyboard.dismiss();
    const name = formData.fullName;
    const birthDate = `${formData.day}-${formData.month}-${formData.year}`;

    const numerologyResults = calculateNumerology(name, birthDate);
    setNumerologyDetail({
      name,
      birthDate,
      ...numerologyResults,
    });

    setCalculate(true);
  };

  return (
    <View style={styles.bottomWrapper}>
      <AnimatedTextField
        style={styles.textField}
        value={formData.fullName}
        label="Lütfen Tam Adınızı ve Soyadınızı Girin"
        //errorText={error}
        onChangeText={text => handleInputChange('fullName', text)}
      />
      <View style={styles.dateNumberWrapper}>
        <AnimatedTextField
          style={[styles.textField, styles.day]}
          value={formData.day}
          label="GG"
          //errorText={error}
          onChangeText={text => handleInputChange('day', text)}
          keyboardType={'number-pad'}
          maxLength={2}
        />
        <AnimatedTextField
          style={[styles.textField, styles.month]}
          value={formData.month}
          label="AA"
          //errorText={error}
          onChangeText={text => handleInputChange('month', text)}
          keyboardType={'number-pad'}
          maxLength={2}
        />
        <AnimatedTextField
          style={[styles.textField, styles.year]}
          value={formData.year}
          label="YYYY"
          //errorText={error}
          onChangeText={text => handleInputChange('year', text)}
          keyboardType={'number-pad'}
          maxLength={4}
        />
      </View>
      <Button
        text="Hesapla"
        handlePress={handlePress}
        variant={'secondary'}
        disabled={!Object.values(formData).every(x => x !== '')}
      />
    </View>
  );
};

export default NumerologyForm;
