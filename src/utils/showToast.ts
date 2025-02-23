import {COLORS} from '@/styles/theme';
import Snackbar from 'react-native-snackbar';

interface ToastParams {
  message: string;
  type?: string;
}

export const showToast = ({message, type = 'success'}: ToastParams): void => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: type === 'success' ? COLORS.cream : COLORS.darkRed,
    textColor: type === 'success' ? COLORS.black : COLORS.cream,
  });
};
