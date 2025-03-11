import {View} from 'react-native';
import React, {useEffect} from 'react';
import {getStyles} from './styles';
import {Form, useForm} from '@/hooks/useForm';
import {Button, Typography} from '@/components';
import TextField from '@/components/TextField/TextField';
import {COLORS} from '@/styles/theme';

import {useAppDispatch, useAppSelector} from '@/hooks';
import dayjs from 'dayjs';
import {authActions} from '@/store/auth/authActions';
import i18n from '@/i18n';

interface ValidationErrors {
  [key: string]: string | '';
}

export interface FormValues {
  fullName: string
  day: string;
  month: string;
  year: string;
}
const initialFieldValues: FormValues = {
  fullName: '',
  day: '',
  month: '',
  year: '',
};

const EditUserForm = () => {
  const styles = getStyles();
  const dispatch = useAppDispatch();
  const {user, uiFlags} = useAppSelector(state => state.auth);
  const {localeValue} = useAppSelector(state => state.settings);
  const validation = (fieldValues: Partial<FormValues>): ValidationErrors => {
    let temp: ValidationErrors = {...errors};

    if ('fullName' in fieldValues) {
      temp.fullName = fieldValues.fullName ? '' : i18n.t('LOGIN.REQUIRED', {locale:localeValue});
    }
    // if ('email' in fieldValues) {
    //   temp.email = fieldValues.email ? '' : 'Bu Alan Zorunludur';
    // }
    if ('day' in fieldValues) {
      if (!fieldValues.day) {
        temp.day = i18n.t('LOGIN.REQUIRED', {locale:localeValue});
      } else {
        const dayValue = parseInt(fieldValues.day, 10);
        if (dayValue >= 1 && dayValue <= 31) {
          temp.day = '';
        } else {
          temp.day = i18n.t('LOGIN.INCORRET', {locale:localeValue});
        }
      }
    }
    if ('month' in fieldValues) {
      if (!fieldValues.month) {
        temp.month = i18n.t('LOGIN.REQUIRED', {locale:localeValue});
      } else {
        const monthValue = parseInt(fieldValues.month, 10);
        if (monthValue >= 1 && monthValue <= 12) {
          temp.month = '';
        } else {
          temp.month = i18n.t('LOGIN.INCORRET', {locale:localeValue});
        }
      }
    }
    if ('year' in fieldValues) {
      if (!fieldValues.year) {
        temp.year = i18n.t('LOGIN.REQUIRED', {locale:localeValue});
      } else {
        const yearValue = parseInt(fieldValues.year, 10);
        if (yearValue >= 1940 && yearValue <= new Date().getFullYear()) {
          temp.year = '';
        } else {
          temp.year = i18n.t('LOGIN.INCORRET', {locale:localeValue});
        }
      }
    }

    setErrors({...temp});

    return temp;
  };
  const {values, handleInputChange, setErrors, setValues, errors} = useForm(
    initialFieldValues,
    true,
    validation,
  );

  useEffect(() => {
    if (user !== null) {
      const day = dayjs(user.birthDate).format('DD');
      const month = dayjs(user.birthDate).format('MM');
      const year = dayjs(user.birthDate).format('YYYY');
      setValues({
        fullName: user.name,
        day,
        month,
        year,
      });
    }
  }, [setValues, user]);

  const handlePress = () => {
    const birthDate = `${values.day}-${values.month}-${values.year}`;
    const data = {
      userId: user ? user?.id : '',
      birthDate,
      email: user ? user?.email : '',
      name: values.fullName,
    };
    dispatch(authActions.update(data));
  };
  return (
    <Form style={styles.form}>
      <Typography style={styles.title}>{i18n.t('PROFILE_SCREEN.USER_INFO', {locale:localeValue})}</Typography>
      <TextField
        inputName="fullName"
        placeholder={i18n.t('LOGIN.FULL_NAME_PLACEHOLDER', {locale:localeValue})}
        placeholderTextColor={COLORS.silverGray}
        style={{
          ...styles.textField,
          borderColor: errors.fullName ? COLORS.red : COLORS.silverGray,
        }}
        onChangeText={handleInputChange}
        value={values.fullName}
        errorMessage={errors.fullName}
      />
      {/* <TextField
        inputName="email"
        placeholder="Email Adresi Giriniz"
        placeholderTextColor={COLORS.silverGray}
        style={{
          ...styles.textField,
          borderColor: errors.email ? COLORS.red : COLORS.silverGray,
        }}
        onChangeText={handleInputChange}
        value={values.email}
        errorMessage={errors.email}
      /> */}
      <View style={styles.dateContainer}>
        <TextField
          inputName="day"
          placeholder={i18n.t('LOGIN.DAY_PLACEHOLDER', {locale:localeValue})}
          placeholderTextColor={COLORS.silverGray}
          style={{
            ...styles.textField,
            ...styles.day,
            borderColor: errors.day ? COLORS.red : COLORS.silverGray,
          }}
          onChangeText={handleInputChange}
          value={String(values.day)}
          errorMessage={errors.day}
          keyboardType={'number-pad'}
          maxLength={2}
        />
        <TextField
          inputName="month"
          placeholder={i18n.t('LOGIN.MONTH_PLACEHOLDER', {locale:localeValue})}
          placeholderTextColor={COLORS.silverGray}
          style={{
            ...styles.textField,
            ...styles.month,
            borderColor: errors.month ? COLORS.red : COLORS.silverGray,
          }}
          onChangeText={handleInputChange}
          value={String(values.month)}
          errorMessage={errors.month}
          keyboardType={'number-pad'}
          maxLength={2}
        />
        <TextField
          inputName="year"
          placeholder={i18n.t('LOGIN.YEAR_PLACEHOLDER', {locale:localeValue})}
          placeholderTextColor={COLORS.silverGray}
          style={{
            ...styles.textField,
            ...styles.year,
            borderColor: errors.year ? COLORS.red : COLORS.silverGray,
          }}
          onChangeText={handleInputChange}
          value={String(values.year)}
          errorMessage={errors.year}
          keyboardType={'number-pad'}
          maxLength={4}
        />
      </View>
      <Button
        disabled={!Object.values(errors).every(x => x === '') || uiFlags.isLoggingIn}
        variant="secondary"
        text={i18n.t('PROFILE_SCREEN.BUTTON_TEXT', {locale:localeValue})}
        handlePress={handlePress}
      />
    </Form>
  );
};

export default EditUserForm;
