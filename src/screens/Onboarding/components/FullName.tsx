import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AnimatedTextField, Typography} from '@/components';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';
import {useOnboardingContext} from '../OnboardingContext';
import {COLORS} from '@/styles/theme';

const FullName = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const {fullName, setFullName} = useOnboardingContext();

  return (
    <View>
      <Typography size="large" style={styles.fullname}>
        {i18n.t('NUMEROLOGY_SCREEN.FULL_NAME', {locale: localeValue})}:
      </Typography>
      <AnimatedTextField
        style={styles.textField}
        label={i18n.t('LOGIN.FULL_NAME', {locale: localeValue})}
        value={fullName}
        //errorText={error}
        onChangeText={text => setFullName(text)}
      />
    </View>
  );
};

export default FullName;

const styles = StyleSheet.create({
  fullname: {
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
});
