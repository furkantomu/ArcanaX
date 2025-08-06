import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Typography} from '@/components';
import {COLORS, SIZES} from '@/styles/theme';
import {SPACING} from '@/constants';

interface FormFieldProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  style?: object;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  children,
  required = false,
  style,
}) => {
  return (
    <View style={[styles.fieldContainer, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <Typography size="medium" weight="bold" style={styles.label}>
            {label}
            {required && <Typography style={styles.required}> *</Typography>}
          </Typography>
        </View>
      )}
      <View style={styles.inputContainer}>
        {children}
      </View>
      {error && (
        <Typography size="small" style={styles.error}>
          {error}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: SPACING.MD,
  },
  labelContainer: {
    marginBottom: SPACING.XS,
  },
  label: {
    color: COLORS.cream,
  },
  required: {
    color: COLORS.red,
  },
  inputContainer: {
    // Input specific styling can be added here
  },
  error: {
    color: COLORS.red,
    marginTop: SPACING.XS,
  },
});

export default FormField;