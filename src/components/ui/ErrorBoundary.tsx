import React, {Component, ErrorInfo, ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import {Typography, Button} from '@/components';
import {COLORS, SIZES} from '@/styles/theme';
import {SPACING} from '@/constants';
import {logger} from '@/utils';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Error Boundary caught an error', error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });
  }

  handleResetError = () => {
    this.setState({hasError: false, error: undefined});
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Typography size="large" weight="bold" style={styles.title}>
              Bir hata oluştu
            </Typography>
            <Typography size="regular" style={styles.message}>
              Beklenmeyen bir hata oluştu. Lütfen uygulamayı yeniden başlatın.
            </Typography>
            {__DEV__ && this.state.error && (
              <Typography size="small" style={styles.errorDetail}>
                {this.state.error.message}
              </Typography>
            )}
            <Button
              text="Tekrar Dene"
              handlePress={this.handleResetError}
              variant="primary"
            />
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.XL,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    color: COLORS.cream,
    textAlign: 'center',
    marginBottom: SPACING.LG,
  },
  message: {
    color: COLORS.cream,
    textAlign: 'center',
    marginBottom: SPACING.XL,
    opacity: 0.8,
  },
  errorDetail: {
    color: COLORS.red,
    textAlign: 'center',
    marginBottom: SPACING.LG,
    fontFamily: 'monospace',
  },
});

export default ErrorBoundary;