import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';

import TextField from '@/components/TextField/TextField';
import {Button, Icon, Typography} from '@/components';

import {Form, useForm} from '@/hooks/useForm';

import {useLoginContext} from './LoginContext';

import {COLORS, FONTS, SIZES} from '@/styles/theme';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {authActions} from '@/store/auth/authActions';
import {useSelector} from 'react-redux';
import i18n from '@/i18n';
import {setOnboardingCompleted} from '@/store/settings/settingsSlice';

interface ValidationErrors {
  [key: string]: string | '';
}

interface FormValues {
  fullName: string;
  email: string;
  day: string;
  month: string;
  year: string;
  confirmPassword: string;
  password: string;
  gender: string;
}

const initialFieldValues: FormValues = {
  email: '',
  fullName: '',
  day: '',
  month: '',
  year: '',
  confirmPassword: '',
  password: '',
  gender: '',
};

const Register = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const {setLoginType, setRegisterPasswordVisible, registerPasswordVisible} =
    useLoginContext();
  const dispatch = useAppDispatch();
  const scrollViewRef = useRef();
  const [validateOnChange, setValidateOnChange] = useState(false);

  const {error, uiFlags} = useSelector((state: any) => state.auth);

  const validation = (fieldValues: Partial<FormValues>): ValidationErrors => {
    let temp: ValidationErrors = {...errors};
    if ('email' in fieldValues) {
      temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fieldValues.email))
        ? ''
        : i18n.t('LOGIN.EMAIL_REQUIRED', {locale: localeValue});
    }
    if ('fullName' in fieldValues) {
      temp.fullName = fieldValues.fullName
        ? ''
        : i18n.t('LOGIN.REQUIRED', {locale: localeValue});
    }
    // if ('gender' in fieldValues) {
    //   temp.gender = fieldValues.gender
    //     ? ''
    //     : i18n.t('LOGIN.REQUIRED', {locale: localeValue});
    // }
    // if ('day' in fieldValues) {
    //   if (!fieldValues.day) {
    //     temp.day = i18n.t('LOGIN.REQUIRED', {locale: localeValue});
    //   } else {
    //     const dayValue = parseInt(fieldValues.day, 10);
    //     if (dayValue >= 1 && dayValue <= 31) {
    //       temp.day = '';
    //     } else {
    //       temp.day = i18n.t('LOGIN.INCORRET', {locale: localeValue});
    //     }
    //   }
    // }
    // if ('month' in fieldValues) {
    //   if (!fieldValues.month) {
    //     temp.month = i18n.t('LOGIN.REQUIRED', {locale: localeValue});
    //   } else {
    //     const monthValue = parseInt(fieldValues.month, 10);
    //     if (monthValue >= 1 && monthValue <= 12) {
    //       temp.month = '';
    //     } else {
    //       temp.month = i18n.t('LOGIN.INCORRET', {locale: localeValue});
    //     }
    //   }
    // }
    // if ('year' in fieldValues) {
    //   if (!fieldValues.year) {
    //     temp.year = i18n.t('LOGIN.REQUIRED', {locale: localeValue});
    //   } else {
    //     const yearValue = parseInt(fieldValues.year, 10);
    //     if (yearValue >= 1940 && yearValue <= new Date().getFullYear()) {
    //       temp.year = '';
    //     } else {
    //       temp.year = i18n.t('LOGIN.INCORRET', {locale: localeValue});
    //     }
    //   }
    // }
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

    setErrors({
      ...temp,
    });

    return temp;
  };

  const {values, setValues, handleInputChange, errors, setErrors} = useForm(
    initialFieldValues,
    validateOnChange,
    validation,
  );
  const handlePress = () => {
    const validationErrors = validation(values);
    let temp: ValidationErrors = {...validationErrors};
    setErrors({...temp});
    if (Object.values(validationErrors).some(x => x !== '')) {
      setValidateOnChange(true);
      return;
    }
    const data = {
      name: values.fullName,
      email: values.email.toLowerCase(),
      // birthDate: `${values.day || '11'}-${values.month || '11'}-${
      //   values.year || '2011'
      // }`,
      birthDate: "11-11-2011",
      password: values.password,
      gender: '',
    };
    dispatch(setOnboardingCompleted());
    dispatch(authActions.register(data));
  };

  const handleGenderSelection = (gender: string) => {
    setErrors({...errors, gender: ''});
    setValues({...values, gender});
  };
  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <>
          <Form style={styles.form}>
            <Typography style={styles.label}>
              {i18n.t('LOGIN.FULL_NAME', {locale: localeValue})}
            </Typography>
            <TextField
              inputName="fullName"
              placeholder={i18n.t('LOGIN.FULL_NAME_PLACEHOLDER', {
                locale: localeValue,
              })}
              style={{
                ...styles.textField,
                borderColor: errors.fullName ? COLORS.red : COLORS.darkGray,
              }}
              onChangeText={handleInputChange}
              value={values.fullName}
              errorMessage={errors.fullName}
            />
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
            {/* <View style={styles.dateContainer}>
              <View>
                <Typography style={styles.label}>
                  {i18n.t('LOGIN.DAY', {locale: localeValue})}
                </Typography>
                <TextField
                  inputName="day"
                  placeholder={i18n.t('LOGIN.DAY_PLACEHOLDER', {
                    locale: localeValue,
                  })}
                  style={{
                    ...styles.textField,
                    ...styles.day,
                    borderColor: errors.day ? COLORS.red : COLORS.darkGray,
                  }}
                  onChangeText={handleInputChange}
                  value={String(values.day)}
                  errorMessage={errors.day}
                  keyboardType={'number-pad'}
                  maxLength={2}
                />
              </View>
              <View>
                <Typography style={styles.label}>
                  {i18n.t('LOGIN.MONTH', {locale: localeValue})}
                </Typography>
                <TextField
                  inputName="month"
                  placeholder={i18n.t('LOGIN.MONTH_PLACEHOLDER', {
                    locale: localeValue,
                  })}
                  style={{
                    ...styles.textField,
                    ...styles.month,
                    borderColor: errors.month ? COLORS.red : COLORS.darkGray,
                  }}
                  onChangeText={handleInputChange}
                  value={String(values.month)}
                  errorMessage={errors.month}
                  keyboardType={'number-pad'}
                  maxLength={2}
                />
              </View>
              <View>
                <Typography style={styles.label}>
                  {i18n.t('LOGIN.YEAR', {locale: localeValue})}
                </Typography>
                <TextField
                  inputName="year"
                  placeholder={i18n.t('LOGIN.YEAR_PLACEHOLDER', {
                    locale: localeValue,
                  })}
                  style={{
                    ...styles.textField,
                    ...styles.year,
                    borderColor: errors.year ? COLORS.red : COLORS.darkGray,
                  }}
                  onChangeText={handleInputChange}
                  value={String(values.year)}
                  errorMessage={errors.year}
                  keyboardType={'number-pad'}
                  maxLength={4}
                />
              </View>
            </View>
            <Typography style={styles.label}>
              {i18n.t('LOGIN.GENDER.TITLE', {locale: localeValue})}
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
                variant={values.gender === 'male' ? 'primary' : 'secondary'}
                buttonStyle={[styles.genderButton, styles.genderButtonLeft]}
                text={i18n.t('LOGIN.GENDER.MALE', {locale: localeValue})}
                handlePress={() => handleGenderSelection('male')}
              />
              <Button
                variant={values.gender === 'female' ? 'primary' : 'secondary'}
                buttonStyle={[styles.genderButton, styles.genderButtonRight]}
                text={i18n.t('LOGIN.GENDER.FEMALE', {locale: localeValue})}
                handlePress={() => handleGenderSelection('female')}
              />
            </View> */}
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
                onFocus={() =>
                  scrollViewRef.current.scrollToEnd({animated: true})
                }
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
                onFocus={() =>
                  scrollViewRef.current.scrollToEnd({animated: true})
                }
                secureTextEntry={registerPasswordVisible.confirmPassword}
              />
            </View>
          </Form>
          <View style={styles.buttonContainer}>
            <Typography style={styles.errorMessage}>{error}</Typography>
            <Button
              disabled={uiFlags.isLoggingIn}
              handlePress={handlePress}
              text={i18n.t('LOGIN.REGISTER_BUTTON', {locale: localeValue})}
            />
            <TouchableOpacity onPress={() => setLoginType('login')}>
              <Typography style={styles.newAccount}>
                {i18n.t('LOGIN.LOGIN_BUTTON', {locale: localeValue})}
              </Typography>
            </TouchableOpacity>
          </View>
        </>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 16,
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  form: {
    marginTop: 20,
    gap: 5,
  },
  buttonContainer: {
    gap: 20,
  },
  newAccount: {
    textAlign: 'center',
    color: COLORS.black,
    padding: 5,
  },
  textField: {
    height: 45,
  },
  dateContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  day: {
    width: SIZES.width / 5,
  },
  month: {
    width: SIZES.width / 5,
  },
  year: {
    width: SIZES.width / 3,
  },
  label: {
    color: COLORS.black,
    marginBottom: -5,
    fontFamily: FONTS.NotoSerifBold,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  errorMessage: {
    color: COLORS.red,
    textAlign: 'center',
  },
  genderButtonWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 11,

    width: 202,
  },
  genderButton: {
    width: 100,
    borderRadius: 0,
  },
  genderButtonLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  genderButtonRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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
});
