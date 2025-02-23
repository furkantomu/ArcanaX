import {KeyboardTypeOptions} from 'react-native/types';

export interface TextInputPropsTypes {
  label?: string;
  value: string;
  onChangeText: (inputName: string, text: string | number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  handleTextField?: () => void;
  onLayout?: any;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  errorMessage?: string;
  style?: object;
  selected?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  inputName: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  textFieldButton?: boolean;
  textFieldButtonStyle?: object;
  textFieldIconStyle?: object;
  textFieldIconSource?: object;
}
