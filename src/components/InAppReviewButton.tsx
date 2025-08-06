import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useInAppReview } from '../hooks/useInAppReview';

interface InAppReviewButtonProps {
  title?: string;
  onPress?: () => void;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
  showLoading?: boolean;
}

export const InAppReviewButton: React.FC<InAppReviewButtonProps> = ({
  title = 'Rate App',
  onPress,
  style,
  textStyle,
  disabled = false,
  showLoading = true,
}) => {
  const {
    isAvailable,
    isLoading,
    requestReviewAfterPositiveAction,
    checkAvailability,
  } = useInAppReview();

  useEffect(() => {
    // Check availability when component mounts
    checkAvailability();
  }, [checkAvailability]);

  const handlePress = async () => {
    if (disabled || !isAvailable) {
      onPress?.();
      return;
    }

    try {
      const success = await requestReviewAfterPositiveAction();
      if (success) {
        console.log('Review request was successful');
      } else {
        console.log('Review request was not successful');
      }
      onPress?.();
    } catch (error) {
      console.error('Error requesting review:', error);
      onPress?.();
    }
  };

  const isButtonDisabled = disabled || !isAvailable || (showLoading && isLoading);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        isButtonDisabled && styles.buttonDisabled,
      ]}
      onPress={handlePress}
      disabled={isButtonDisabled}
    >
      {showLoading && isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>
          {isAvailable ? title : 'Rate App (Not Available)'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InAppReviewButton;