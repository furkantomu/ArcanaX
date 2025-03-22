import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {AnimatedTextField, Button, Typography} from '@/components';
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
  email: string;
}

const initialFieldValues: FormValues = {
  email: '',
};

const Email = () => {
  const navigation = useNavigation();

  const {localeValue} = useAppSelector(state => state.settings);
  const {setEmail, setContextErrors} = useOnboardingContext();

  const validation = (fieldValues: Partial<FormValues>): ValidationErrors => {
    let temp: ValidationErrors = {...errors};
    if ('email' in fieldValues) {
      temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fieldValues.email))
        ? ''
        : i18n.t('LOGIN.EMAIL_REQUIRED', {locale: localeValue});
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
    if (errors.email) {
      setContextErrors(true);
    } else {
      setContextErrors(false);
    }
    setEmail(values.email);
  }, [errors.email, setContextErrors, setEmail, values.email]);
  return (
    <View>
      <Typography size="large" style={styles.email}>
        {i18n.t('LOGIN.EMAIL_PLACEHOLDER', {locale: localeValue})}:
      </Typography>
      <AnimatedTextField
        style={styles.textField}
        label={i18n.t('LOGIN.EMAIL', {locale: localeValue})}
        value={values.email}
        errorText={errors.email}
        onChangeText={text => handleInputChange('email', text)}
      />
      <Pressable
        style={{zIndex: 99}}
        onPress={() => {console.log('asd'); navigation.navigate('Login')}}>
        <Typography size="large" style={styles.account}>
          {i18n.t('ONBOARDING.HAVE_ACCOUNT', {locale: localeValue})}
        </Typography>
      </Pressable>
    </View>
  );
};

export default Email;

const styles = StyleSheet.create({
  textField: {
    zIndex: 10,
    marginHorizontal: 20,
  },
  email: {
    marginHorizontal: 20,
    marginBottom: 20,
    color: COLORS.darkBlue,
    fontWeight: 600,
    fontFamily: 'bold',
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
