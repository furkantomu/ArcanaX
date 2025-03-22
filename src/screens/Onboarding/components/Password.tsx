/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AnimatedTextField, Icon, Typography} from '@/components';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';
import {useOnboardingContext} from '../OnboardingContext';
import {COLORS} from '@/styles/theme';
import {useForm} from '@/hooks/useForm';
import {useNavigation} from '@react-navigation/native';

interface ValidationErrors {
  [key: string]: string | '';
}

interface FormValues {
  password: string;
}

const initialFieldValues: FormValues = {
  password: '',
};

const Password = () => {
  const navigation = useNavigation();
  const {localeValue} = useAppSelector(state => state.settings);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const {setPassword, setContextErrors} = useOnboardingContext();

  const validation = (fieldValues: Partial<FormValues>): ValidationErrors => {
    let temp: ValidationErrors = {...errors};

    if ('password' in fieldValues) {
      temp.password = fieldValues.password
        ? ''
        : i18n.t('LOGIN.REQUIRED', {locale: localeValue});
    }

    setErrors({
      ...temp,
    });

    return temp;
  };
  const {values, handleInputChange, errors, setErrors} = useForm(
    initialFieldValues,
    true,
    validation,
  );

  useEffect(() => {
    if (errors.password) {
      setContextErrors(true);
    } else {
      setContextErrors(false);
    }
    setPassword(values.password);
  }, [errors.password, setContextErrors, setPassword, values.password]);
  return (
    <View>
      <Typography size="large" style={styles.password}>
        {i18n.t('LOGIN.PASSWORD_PLACEHOLDER', {locale: localeValue})}:
      </Typography>
      <View style={styles.securePassword}>
        <Pressable
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.passwordVisible}>
          <View>
            <Icon
              style={styles.passwordVisibleIcon}
              name={passwordVisible ? 'hide' : 'show'}
            />
          </View>
        </Pressable>
        <AnimatedTextField
          style={styles.textField}
          label={i18n.t('LOGIN.PASSWORD', {locale: localeValue})}
          value={values.password}
          errorText={errors.password}
          onChangeText={text => handleInputChange('password', text)}
          secureTextEntry={passwordVisible}
        />
      </View>
      <Pressable style={{zIndex: 10}} onPress={() => navigation.navigate('Login')}>
        <Typography size="large" style={styles.account}>
          {i18n.t('ONBOARDING.HAVE_ACCOUNT', {locale: localeValue})}
        </Typography>
      </Pressable>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  password: {
    marginBottom: 20,
    marginHorizontal: 20,
    color: COLORS.darkBlue,
    fontWeight: 600,
    fontFamily: 'bold',
  },
  textField: {
    zIndex: 10,
    marginHorizontal: 20,
  },
  securePassword: {},
  passwordVisible: {
    height: 45,
    width: 60,
    position: 'absolute',
    top: 10,
    right: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 20,
    paddingRight: 20,
  },
  passwordVisibleIcon: {
    tintColor: COLORS.cream,
  },
  account: {
    marginTop: 50,
    marginHorizontal: 20,
    color: COLORS.darkBlue,
    fontWeight: 600,
    fontFamily: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    zIndex: 10,
  },
});
