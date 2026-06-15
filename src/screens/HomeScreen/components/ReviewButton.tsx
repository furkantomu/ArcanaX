import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useInAppReview } from '../../../hooks/useInAppReview';

interface ReviewButtonProps {
  style?: any;
  textStyle?: any;
  showAfterDelay?: number; // milliseconds
}

const ReviewButton: React.FC<ReviewButtonProps> = ({
  style,
  textStyle,
  showAfterDelay = 3000, // Show after 3 seconds
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
    if (!isAvailable) {
      console.log('In-app review is not available on this device');
      return;
    }

    try {
      const success = await requestReviewAfterPositiveAction();
      if (success) {
        console.log('Review request was successful');
      } else {
        console.log('Review request was not successful');
      }
    } catch (error) {
      console.error('Error requesting review:', error);
    }
  };

  // Don't show the button if in-app review is not available
  if (!isAvailable) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {isLoading ? 'Loading...' : '⭐ Rate Our App'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ReviewButton;