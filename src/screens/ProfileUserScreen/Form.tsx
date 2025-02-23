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
  const validation = (fieldValues: Partial<FormValues>): ValidationErrors => {
    let temp: ValidationErrors = {...errors};

    if ('fullName' in fieldValues) {
      temp.fullName = fieldValues.fullName ? '' : 'Bu Alan Zorunludur';
    }
    // if ('email' in fieldValues) {
    //   temp.email = fieldValues.email ? '' : 'Bu Alan Zorunludur';
    // }
    if ('day' in fieldValues) {
      if (!fieldValues.day) {
        temp.day = 'Bu Alan Zorunludur';
      } else {
        const dayValue = parseInt(fieldValues.day, 10);
        if (dayValue >= 1 && dayValue <= 31) {
          temp.day = '';
        } else {
          temp.day = 'Geçersiz Gün';
        }
      }
    }
    if ('month' in fieldValues) {
      if (!fieldValues.month) {
        temp.month = 'Bu Alan Zorunludur';
      } else {
        const monthValue = parseInt(fieldValues.month, 10);
        if (monthValue >= 1 && monthValue <= 12) {
          temp.month = '';
        } else {
          temp.month = 'Geçersiz Ay';
        }
      }
    }
    if ('year' in fieldValues) {
      if (!fieldValues.year) {
        temp.year = 'Bu Alan Zorunludur';
      } else {
        const yearValue = parseInt(fieldValues.year, 10);
        if (yearValue >= 1940 && yearValue <= new Date().getFullYear()) {
          temp.year = '';
        } else {
          temp.year = 'Geçersiz Yıl';
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
      <Typography style={styles.title}>Kullanıcı Bilgileri</Typography>
      <TextField
        inputName="fullName"
        placeholder="İsim ve Soyisim Giriniz"
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
          placeholder="GG"
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
          placeholder="AA"
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
          placeholder="YYYY"
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
        text="Kaydet"
        handlePress={handlePress}
      />
    </Form>
  );
};

export default EditUserForm;
