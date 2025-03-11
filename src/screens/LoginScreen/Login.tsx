import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';

import TextField from '@/components/TextField/TextField';

import {Button, Icon, Typography} from '@/components';

import {useAppDispatch, useAppSelector} from '@/hooks';
import {Form, useForm} from '@/hooks/useForm';
import {useLoginContext} from './LoginContext';

import {authActions} from '@/store/auth/authActions';

import {COLORS, FONTS, SIZES} from '@/styles/theme';
import {useSelector} from 'react-redux';
import i18n from '@/i18n';
import { useRefsContext } from '@/context';

interface ValidationErrors {
  [key: string]: string | '';
}

interface FormValues {
  email: string;
  password: string;
}

const initialFieldValues: FormValues = {
  email: '',
  password: '',
};

const Login = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const {setLoginType, setPasswordVisible, passwordVisible} = useLoginContext();
  const {languageChangeSheetRef} = useRefsContext();
  const [validateOnChange, setValidateOnChange] = useState(false);
  const dispatch = useAppDispatch();
  const {error, uiFlags} = useSelector((state: any) => state.auth);
  const validation = (fieldValues: Partial<FormValues>): ValidationErrors => {
    let temp: ValidationErrors = {...errors};

    if ('email' in fieldValues) {
      temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fieldValues.email))
        ? ''
        : i18n.t('LOGIN.EMAIL_REQUIRED', {locale:localeValue});
    }
    if ('password' in fieldValues) {
      temp.password = fieldValues.password ? '' : i18n.t('LOGIN.REQUIRED', {locale:localeValue});
    }

    setErrors({...temp});

    return temp;
  };
  const {values, handleInputChange, errors, setErrors} = useForm(
    initialFieldValues,
    validateOnChange,
    validation,
  );

  const handlePress = async () => {
    const validationErrors = validation(values);
    let temp: ValidationErrors = {...validationErrors};
    setErrors({...temp});
    if (Object.values(validationErrors).some(x => x !== '')) {
      setValidateOnChange(true);
      return;
    }
    const {email, password} = values;
    dispatch(authActions.login({email, password}));
  };
  return (
    <View style={styles.container}>
      <Form style={styles.form}>
        <Typography style={styles.label}>{i18n.t('LOGIN.EMAIL', {locale:localeValue})}</Typography>
        <TextField
          inputName="email"
          placeholder={i18n.t('LOGIN.EMAIL_PLACEHOLDER', {locale:localeValue})}
          style={{
            ...styles.textField,
            borderColor: errors.email ? COLORS.red : COLORS.darkGray,
          }}
          onChangeText={handleInputChange}
          value={values.email}
          errorMessage={errors.email}
        />
        <Typography style={styles.label}>{i18n.t('LOGIN.PASSWORD', {locale:localeValue})}</Typography>
        <View style={styles.securePassword}>
          <Pressable
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.passwordVisible}>
            <View>
              <Icon name={passwordVisible ? 'hide' : 'show'} />
            </View>
          </Pressable>

          <TextField
            inputName="password"
            placeholder={i18n.t('LOGIN.PASSWORD_PLACEHOLDER', {locale:localeValue})}
            secureTextEntry={passwordVisible}
            style={{
              ...styles.textField,
              borderColor: errors.password ? COLORS.red : COLORS.darkGray,
            }}
            onChangeText={handleInputChange}
            value={values.password}
            errorMessage={errors.password}
          />
        </View>

        <TouchableOpacity>
          <Typography style={styles.passwordChangeText}>
            {i18n.t('LOGIN.FORGOT_PASSWORD', {locale:localeValue})}
          </Typography>
        </TouchableOpacity>
      </Form>
      <View style={styles.buttonContainer}>
        {error && <Typography style={styles.errorMessage}>{error}</Typography>}
        <Button
          disabled={uiFlags.isLoggingIn}
          text={i18n.t('LOGIN.LOGIN_BUTTON', {locale:localeValue})}
          handlePress={handlePress}
        />
        <TouchableOpacity onPress={() => setLoginType('register')}>
          <Typography style={styles.newAccount}>
            {i18n.t('LOGIN.NEW_ACCOUNT', {locale:localeValue})}
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            languageChangeSheetRef.current?.scrollTo(-SIZES.height / 1.2)
          }>
          <Typography style={styles.newAccount}>
            {i18n.t('CHANGE_LANGUAGE', {locale:localeValue})}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    padding: 16,
  },
  form: {
    marginTop: 20,
  },
  passwordChangeContainer: {
    alignItems: 'flex-end',
  },
  passwordChangeText: {
    color: COLORS.black,
    padding: 5,
  },
  buttonContainer: {
    gap: 20,
  },
  errorMessage: {
    color: COLORS.red,
    textAlign: 'center',
  },
  newAccount: {
    textAlign: 'center',
    color: COLORS.black,
    padding: 5,
  },
  textField: {
    height: 45,
  },
  securePassword: {},
  passwordVisible: {
    height: 45,
    width: 60,
    position: 'absolute',
    top: 10,
    right: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 10,
    paddingRight: 20,
  },
  label: {
    color: COLORS.black,
    marginBottom: -5,
    fontFamily: FONTS.NotoSerifBold,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
