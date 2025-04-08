import {View} from 'react-native';
import React from 'react';
import TextField from '@/components/TextField/TextField';
import {getStyles} from '../styles';
import {useForm} from '@/hooks/useForm';
import {useDreamContext} from '../DreamScreenContext';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';
import {Typography} from '@/components';

interface ValidationErrors {
  [key: string]: string | '';
}

interface FormValues {
  dream: string;
}

const initialFieldValues: FormValues = {
  dream: '',
};

const DreamEntry = () => {
  const styles = getStyles();
  const {setDream, dream} = useDreamContext();
  const {localeValue} = useAppSelector(state => state.settings);

  const validation = (fieldValues: Partial<FormValues>): ValidationErrors => {
    let temp: ValidationErrors = {...errors};

    if ('dream' in fieldValues) {
      // Boş kontrolü
      if (!fieldValues.dream) {
        temp.dream = 'Bu Alan Zorunludur';
      }
      // 1500 karakter sınırı
      else if (fieldValues.dream.length > 1500) {
        temp.dream = `${fieldValues.dream.length}/1500`;
      }
      // Eğer her şey doğruysa hatayı temizle
      else {
        temp.dream = '';
      }
    }

    setErrors({...temp});
    setDream(String(fieldValues.dream));

    return temp;
  };

  const {values, handleInputChange, setErrors, errors} = useForm(
    initialFieldValues,
    true,
    validation,
  );

  return (
    <View style={styles.textFieldWrapper}>
      <TextField
        inputName="dream"
        placeholder={i18n.t('DREAM_PREMIUM_SCREEN.DESCRIPTION', {
          locale: localeValue,
        })}
        style={{
          ...styles.textField,
        }}
        value={values.dream}
        onChangeText={handleInputChange}
        multiline={true}
        numberOfLines={10}
        errorMessage={errors.dream}
      />
    </View>
  );
};

export default DreamEntry;
