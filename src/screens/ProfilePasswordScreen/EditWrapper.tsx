import React from 'react';
import {View, Pressable} from 'react-native';
import {Form, useForm} from '@/hooks/useForm';
import TextField from '@/components/TextField/TextField';
import {COLORS} from '@/styles/theme';
import {getStyles} from './styles';
import {Button, Icon, Typography} from '@/components';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {usePasswordContext} from './ProfilePasswordScreenContext';
import {authActions} from '@/store/auth/authActions';

interface ValidationErrors {
  [key: string]: string | '';
}

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const initialFieldValues: FormValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const EditWrapper = () => {
  const styles = getStyles();
  const {user, uiFlags, error} = useAppSelector(state => state.auth);
  const {updatePasswordVisible, passwordVisible} = usePasswordContext();
  const dispatch = useAppDispatch();
  const validation = (fieldValues: Partial<FormValues>): ValidationErrors => {
    let temp: ValidationErrors = {...errors};

    if ('currentPassword' in fieldValues) {
      temp.currentPassword = fieldValues.currentPassword
        ? ''
        : 'Bu Alan Zorunludur';
    }
    if ('newPassword' in fieldValues) {
      temp.newPassword = fieldValues.newPassword ? '' : 'Bu Alan Zorunludur';
    }
    if ('confirmNewPassword' in fieldValues) {
      if (!fieldValues.confirmNewPassword) {
        temp.confirmNewPassword = 'Bu Alan Zorunludur';
      } else if (fieldValues.newPassword !== fieldValues.confirmNewPassword) {
        temp.confirmNewPassword = 'Şifreler Eşleşmiyor';
      } else {
        temp.confirmNewPassword = '';
      }
    }

    setErrors({...temp});

    return temp;
  };

  const {values, handleInputChange, setErrors, errors} = useForm(
    initialFieldValues,
    true,
    validation,
  );
  const handlePress = () => {
    if (
      values.currentPassword &&
      values.newPassword &&
      values.confirmNewPassword
    ) {
      const data = {
        userId: user?.id,
        email: user?.email,
        oldPassword: values.currentPassword,
        password: values.newPassword,
      };
      dispatch(authActions.resetPassword(data));
    }
  };
  return (
    <Form style={styles.form}>
      <Typography style={styles.title}>Şifre İşlemleri</Typography>
      <View style={styles.securePassword}>
        <Pressable
          onPress={() =>
            updatePasswordVisible(
              'currentPassword',
              !passwordVisible.currentPassword,
            )
          }
          style={styles.passwordVisible}>
          <View>
            <Icon
              name={passwordVisible.currentPassword ? 'hide' : 'show'}
              style={styles.visibleIcon}
            />
          </View>
        </Pressable>
        <TextField
          inputName="currentPassword"
          placeholder="Mevcut Şifrenizi Giriniz"
          placeholderTextColor={COLORS.silverGray}
          style={{
            ...styles.textField,
            borderColor: errors.currentPassword
              ? COLORS.red
              : COLORS.silverGray,
          }}
          onChangeText={handleInputChange}
          value={values.currentPassword}
          errorMessage={errors.currentPassword}
          secureTextEntry={passwordVisible.currentPassword}
        />
      </View>
      <View style={styles.securePassword}>
        <Pressable
          onPress={() =>
            updatePasswordVisible('newPassword', !passwordVisible.newPassword)
          }
          style={styles.passwordVisible}>
          <View>
            <Icon
              name={passwordVisible.newPassword ? 'hide' : 'show'}
              style={styles.visibleIcon}
            />
          </View>
        </Pressable>
        <TextField
          inputName="newPassword"
          placeholder="Yeni Şifrenizi Giriniz"
          placeholderTextColor={COLORS.silverGray}
          style={{
            ...styles.textField,
            borderColor: errors.newPassword ? COLORS.red : COLORS.silverGray,
          }}
          onChangeText={handleInputChange}
          value={values.newPassword}
          errorMessage={errors.newPassword}
          secureTextEntry={passwordVisible.newPassword}
        />
      </View>
      <View style={styles.securePassword}>
        <Pressable
          onPress={() =>
            updatePasswordVisible(
              'confirmNewPassword',
              !passwordVisible.confirmNewPassword,
            )
          }
          style={styles.passwordVisible}>
          <View>
            <Icon
              name={passwordVisible.confirmNewPassword ? 'hide' : 'show'}
              style={styles.visibleIcon}
            />
          </View>
        </Pressable>
        <TextField
          inputName="confirmNewPassword"
          placeholder="Yeni Şifrenizi Doğrulayınız"
          placeholderTextColor={COLORS.silverGray}
          style={{
            ...styles.textField,
            borderColor: errors.confirmNewPassword
              ? COLORS.red
              : COLORS.silverGray,
          }}
          onChangeText={handleInputChange}
          value={values.confirmNewPassword}
          errorMessage={errors.confirmNewPassword}
          secureTextEntry={passwordVisible.confirmNewPassword}
        />
      </View>
      <Button
        variant="secondary"
        text="Kaydet"
        handlePress={handlePress}
        disabled={
          !Object.values(errors).every(x => x === '') || uiFlags.isLoggingIn
        }
      />
    </Form>
  );
};

export default EditWrapper;
