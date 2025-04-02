import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import {AnimatedTextField, Button, Typography} from '@/components';

import {useOnboardingContext} from '../OnboardingContext';

import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';

import {COLORS, SIZES} from '@/styles/theme';
import {useForm} from '@/hooks/useForm';

interface ValidationErrors {
  [key: string]: string | '';
}

interface FormValues {
  day: string;
  month: string;
  year: string;
  gender: string;
}

const initialFieldValues: FormValues = {
  day: '',
  month: '',
  year: '',
  gender: '',
};

const Birthdate = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const {setBirthdate, setContextErrors} = useOnboardingContext();

  const validation = (fieldValues: Partial<FormValues>): ValidationErrors => {
    let temp: ValidationErrors = {...errors};

    if ('gender' in fieldValues) {
      temp.gender = fieldValues.gender
        ? ''
        : i18n.t('LOGIN.REQUIRED', {locale: localeValue});
    }
    if ('day' in fieldValues) {
      if (!fieldValues.day) {
        temp.day = i18n.t('LOGIN.REQUIRED', {locale: localeValue});
      } else {
        const dayValue = parseInt(fieldValues.day, 10);
        if (dayValue >= 1 && dayValue <= 31) {
          temp.day = '';
        } else {
          temp.day = i18n.t('LOGIN.INCORRET', {locale: localeValue});
        }
      }
    }
    if ('month' in fieldValues) {
      if (!fieldValues.month) {
        temp.month = i18n.t('LOGIN.REQUIRED', {locale: localeValue});
      } else {
        const monthValue = parseInt(fieldValues.month, 10);
        if (monthValue >= 1 && monthValue <= 12) {
          temp.month = '';
        } else {
          temp.month = i18n.t('LOGIN.INCORRET', {locale: localeValue});
        }
      }
    }
    if ('year' in fieldValues) {
      if (!fieldValues.year) {
        temp.year = i18n.t('LOGIN.REQUIRED', {locale: localeValue});
      } else {
        const yearValue = parseInt(fieldValues.year, 10);
        if (yearValue >= 1940 && yearValue <= new Date().getFullYear()) {
          temp.year = '';
        } else {
          temp.year = i18n.t('LOGIN.INCORRET', {locale: localeValue});
        }
      }
    }
    setErrors({
      ...temp,
    });

    return temp;
  };

  const {values, setValues, handleInputChange, errors, setErrors} = useForm(
    initialFieldValues,
    true,
    validation,
  );

  const handleGenderSelection = (gender: string) => {
    setErrors({...errors, gender: ''});
    setValues({...values, gender});
  };
  console.log(
    'Object.values(errors).includes()',
    Object.values(errors).some(x => x !== ''),
  );
  useEffect(() => {
    if (Object.values(errors).some(x => x !== '')) {
      setContextErrors(true);
    } else {
      setContextErrors(false);
    }
    setBirthdate({
      day: values.day,
      month: values.month,
      year: values.year,
      gender: values.gender,
    });
  }, [
    errors,
    setBirthdate,
    setContextErrors,
    values.day,
    values.gender,
    values.month,
    values.year,
  ]);
  return (
    <View style={styles.container}>
      <Typography size="large" style={styles.birthdate}>
        {i18n.t('LOGIN.BIRTHDATE', {locale: localeValue})}:
      </Typography>
      <View style={styles.dateNumberWrapper}>
        <AnimatedTextField
          style={[styles.textField, styles.day]}
          value={String(values.day)}
          errorText={errors.day}
          label={i18n.t('NUMEROLOGY_SCREEN.DAY', {locale: localeValue})}
          onChangeText={text => handleInputChange('day', text)}
          keyboardType={'number-pad'}
          maxLength={2}
        />
        <AnimatedTextField
          style={[styles.textField, styles.month]}
          value={String(values.month)}
          label={i18n.t('NUMEROLOGY_SCREEN.MONTH', {locale: localeValue})}
          errorText={errors.month}
          onChangeText={text => handleInputChange('month', text)}
          keyboardType={'number-pad'}
          maxLength={2}
        />
        <AnimatedTextField
          style={[styles.textField, styles.year]}
          value={String(values.year)}
          label={i18n.t('NUMEROLOGY_SCREEN.YEAR', {locale: localeValue})}
          errorText={errors.year}
          onChangeText={text => handleInputChange('year', text)}
          keyboardType={'number-pad'}
          maxLength={4}
        />
      </View>

      <Typography size="large" style={styles.gender}>
        {i18n.t('LOGIN.GENDER.TITLE', {locale: localeValue})}:
      </Typography>
      <View
        style={[
          styles.genderButtonWrapper,

          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderColor: errors.gender ? 'red' : 'black',
          },
        ]}>
        <Button
          buttonStyle={[
            styles.genderButton,
            styles.genderButtonLeft,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor:
                values.gender === 'male' ? '#c0c0c0cd' : COLORS.blackOpacity1,
            },
          ]}
          text={i18n.t('LOGIN.GENDER.MALE', {locale: localeValue})}
          handlePress={() => handleGenderSelection('male')}
        />
        <Button
          buttonStyle={[
            styles.genderButton,
            styles.genderButtonRight,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor:
                values.gender === 'female' ? '#c0c0c0cd' : COLORS.blackOpacity1,
            },
          ]}
          text={i18n.t('LOGIN.GENDER.FEMALE', {locale: localeValue})}
          handlePress={() => handleGenderSelection('female')}
        />
      </View>
    </View>
  );
};

export default Birthdate;

const styles = StyleSheet.create({
  container: {
  },
  textField: {
    zIndex: 10,
  },
  dateNumberWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  day: {
    width: SIZES.width * 0.25,
  },
  month: {
    width: SIZES.width * 0.25,
  },
  year: {
    width: SIZES.width * 0.35,
  },
  birthdate: {
    marginHorizontal: 20,
    marginBottom: 20,
    color: COLORS.darkBlue,
    fontWeight: 600,
    fontFamily: 'bold',
  },
  gender: {
    marginTop: 20,
    marginHorizontal: 20,
    color: COLORS.darkBlue,
    fontWeight: 600,
    fontFamily: 'bold',
  },
  genderButtonWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 21,
    marginHorizontal: 20,
    width: 210,
    zIndex: 10,
  },
  genderButton: {
    width: 104,
    borderRadius: 0,
    padding: 24,
  },
  genderButtonLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  genderButtonRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
