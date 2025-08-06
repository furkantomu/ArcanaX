import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';

import TextField from '@/components/TextField/TextField';

import {Button, Icon, Typography} from '@/components';

import { useAppSelector} from '@/hooks';
import {Form, useForm} from '@/hooks/useForm';
import {useLoginContext} from './LoginContext';


import {COLORS, FONTS} from '@/styles/theme';

import i18n from '@/i18n';

import {apiService} from '@/services/APIService';
import {showToast} from '@/utils/showToast';
import {logger} from '@/utils';

interface ValidationErrors {
  [key: string]: string | '';
}

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
}

const initialFieldValues: FormValues = {
  email: '',
  password: '',
  confirmPassword: '',
  code: '',
};

const ForgotPassword = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const {setLoginType} = useLoginContext();
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState({
    password: true,
    confirmPassword: true,
  });
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const validation = (fieldValues: Partial<FormValues>): ValidationErrors => {
    let temp: ValidationErrors = {...errors};

    if ('email' in fieldValues) {
      temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fieldValues.email))
        ? ''
        : i18n.t('LOGIN.EMAIL_REQUIRED', {locale: localeValue});
    }
    if ('password' in fieldValues) {
      temp.password = fieldValues.password
        ? ''
        : i18n.t('LOGIN.REQUIRED', {locale: localeValue});
    }
    if ('confirmPassword' in fieldValues) {
      temp.confirmPassword =
        fieldValues.password === fieldValues.confirmPassword
          ? ''
          : i18n.t('LOGIN.ERROR.REGISTER_ERROR_PASSWORD', {
              locale: localeValue,
            });
    }
    if ('code' in fieldValues) {
      temp.code = fieldValues.code
        ? ''
        : i18n.t('LOGIN.REQUIRED', {locale: localeValue});
    }

    setErrors({...temp});

    return temp;
  };
  const {values, handleInputChange, errors, setErrors} = useForm(
    initialFieldValues,
    validateOnChange,
    validation,
  );

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      const response = await apiService.post<{message: string}>(
        'auth/forgot-password',
        {email},
      );
      showToast({message: response.data.message, type: 'success'});
      setStep(1);
      return response.data;
    } catch (e: any) {
      showToast({message: e.response.data.message, type: 'error'});
      logger.error('Forgot password request failed', e, {response: e.response?.data});
      setStep(0);
    } finally {
      setLoading(false);
    }
  };

  const verifyPassword = async (email: string, code: string) => {
    try {
      setLoading(true);
      const response = await apiService.post<{message: string}>(
        'auth/verify-code',
        {email, code},
      );
      showToast({message: response.data.message, type: 'success'});
      setStep(2);
      return response.data;
    } catch (e: any) {
      showToast({message: e.response.data.message, type: 'error'});
      console.error('Forgot password request failed:', e.response.data.message);
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await apiService.post<{message: string}>(
        'auth/forgot/reset-password',
        {email, password},
      );
      showToast({message: response.data.message, type: 'success'});
      setLoginType('login');
      return response.data;
    } catch (e: any) {
      showToast({message: e.response.data.message, type: 'error'});
      console.error('Forgot password request failed:', e.response.data.message);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = async () => {
    const validationErrors = validation(values);
    console.log('validationErrors', validationErrors);
    Keyboard.dismiss();
    const {email, code, password} = values;
    if (step === 0) {
      if (validationErrors.email === '') {
        try {
          await forgotPassword(email);
        } catch (e: any) {
          console.error('Hata oluştu:', e.message);
        }
        return;
      }
      setValidateOnChange(true);
    }
    if (step === 1) {
      if (validationErrors.code === '') {
        try {
          await verifyPassword(email, code);
        } catch (e: any) {
          console.error('Hata oluştu:', e.message);
        }
        return;
      }
      setValidateOnChange(true);
    }
    if (step === 2) {
      if (
        validationErrors.password === '' &&
        validationErrors.confirmPassword === ''
      ) {
        try {
          await resetPassword(email, password);
        } catch (e: any) {
          console.error('Hata oluştu:', e.message);
        }
        return;
      }
      setValidateOnChange(true);
    }
  };
  return (
    <View style={styles.container}>
      <Form style={styles.form}>
        {step === 0 && (
          <>
            <Typography style={styles.label}>
              {i18n.t('LOGIN.EMAIL', {locale: localeValue})}
            </Typography>
            <TextField
              inputName="email"
              placeholder={i18n.t('LOGIN.EMAIL_PLACEHOLDER', {
                locale: localeValue,
              })}
              style={{
                ...styles.textField,
                borderColor: errors.email ? COLORS.red : COLORS.darkGray,
              }}
              onChangeText={handleInputChange}
              value={values.email}
              errorMessage={errors.email}
            />
          </>
        )}

        {step === 1 && (
          <>
            <Typography style={styles.label}>
              {i18n.t('LOGIN.VERIFY_CODE', {locale: localeValue})}
            </Typography>
            <TextField
              inputName="code"
              placeholder={i18n.t('LOGIN.VERIFY_CODE_PLACEHOLDER', {
                locale: localeValue,
              })}
              style={{
                ...styles.textField,
                borderColor: errors.email ? COLORS.red : COLORS.darkGray,
              }}
              onChangeText={handleInputChange}
              value={values.code}
              errorMessage={errors.code}
            />
            <Pressable onPress={() => forgotPassword(values.email)}>
              <Typography style={styles.label}>
                {i18n.t('LOGIN.AGAIN_FORGOT_PASSWORD_BUTTON', {
                  locale: localeValue,
                })}
              </Typography>
            </Pressable>
          </>
        )}
        {step === 2 && (
          <>
            <Typography style={styles.label}>
              {i18n.t('LOGIN.PASSWORD', {locale: localeValue})}
            </Typography>
            <View style={styles.securePassword}>
              <Pressable
                onPress={() =>
                  setRegisterPasswordVisible({
                    password: !registerPasswordVisible.password,
                    confirmPassword: registerPasswordVisible.confirmPassword,
                  })
                }
                style={styles.passwordVisible}>
                <View>
                  <Icon
                    name={registerPasswordVisible.password ? 'hide' : 'show'}
                  />
                </View>
              </Pressable>
              <TextField
                inputName="password"
                placeholder={i18n.t('LOGIN.PASSWORD_PLACEHOLDER', {
                  locale: localeValue,
                })}
                style={{
                  ...styles.textField,
                  borderColor: errors.year ? COLORS.red : COLORS.darkGray,
                }}
                onChangeText={handleInputChange}
                value={String(values.password)}
                errorMessage={errors.password}
                secureTextEntry={registerPasswordVisible.password}
              />
            </View>

            <Typography style={styles.label}>
              {i18n.t('LOGIN.CONFIRM_PASSWORD', {locale: localeValue})}
            </Typography>
            <View style={styles.securePassword}>
              <Pressable
                onPress={() =>
                  setRegisterPasswordVisible({
                    password: registerPasswordVisible.password,
                    confirmPassword: !registerPasswordVisible.confirmPassword,
                  })
                }
                style={styles.passwordVisible}>
                <View>
                  <Icon
                    name={
                      registerPasswordVisible.confirmPassword ? 'hide' : 'show'
                    }
                  />
                </View>
              </Pressable>
              <TextField
                inputName="confirmPassword"
                placeholder={i18n.t('LOGIN.PASSWORD_PLACEHOLDER', {
                  locale: localeValue,
                })}
                style={{
                  ...styles.textField,
                  borderColor: errors.year ? COLORS.red : COLORS.darkGray,
                }}
                onChangeText={handleInputChange}
                value={String(values.confirmPassword)}
                errorMessage={errors.confirmPassword}
                secureTextEntry={registerPasswordVisible.confirmPassword}
              />
            </View>
          </>
        )}
      </Form>
      <View style={styles.buttonContainer}>
        <Button
          disabled={loading}
          text={
            step === 0
              ? i18n.t('LOGIN.FORGOT_PASSWORD_BUTTON', { locale: localeValue })
              : step === 1
              ? i18n.t('LOGIN.VERIFY_BUTTON', { locale: localeValue })
              : i18n.t('LOGIN.RESET_PASSWORD_BUTTON', { locale: localeValue })
          }
          handlePress={handlePress}
        />

        <TouchableOpacity onPress={() => setLoginType('login')}>
          <Typography style={styles.newAccount}>
            {i18n.t('LOGIN.LOGIN_BUTTON', {locale: localeValue})}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;

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
