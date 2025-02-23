import React, {useState} from 'react';
import {View, ViewProps} from 'react-native';

interface FormProps extends ViewProps {
  children: React.ReactNode;
}

interface ValidationErrors {
  [key: string]: string | '';
}

interface UseFormReturn<T> {
  values: T;
  errors: ValidationErrors;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
  handleInputChange: (inputName: string, text: string | number) => void;
  resetForm: () => void;
}

export const useForm = <T extends object>(
  initialFieldValues: T,
  validateOnChange = false,
  validation: (fieldValues: Partial<T>) => ValidationErrors,
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialFieldValues);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (inputName: string, value: string | number) => {
    setValues({
      ...values,
      [inputName]: value,
    });

    if (validateOnChange) {
      const validationResult = validation({...values, [inputName]: value});
      setErrors(validationResult);
    }
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    setErrors({});
  };

  return {
    values,
    errors,
    setValues,
    setErrors,
    handleInputChange,
    resetForm,
  };
};

export const Form: React.FC<FormProps> = ({children, ...rest}) => {
  return <View {...rest}>{children}</View>;
};
