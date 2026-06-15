import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useInAppReview } from '../hooks/useInAppReview';
import { useAppReviewTracker } from '../hooks/useAppReviewTracker';
import InAppReviewButton from '../components/InAppReviewButton';
import { ReviewConfigs } from '../utils/reviewTriggers';
import InAppReviewService from '../services/InAppReviewService';

/**
 * Comprehensive examples of how to use in-app review functionality
 * This file demonstrates all the different approaches and use cases
 */
const InAppReviewExamples: React.FC = () => {
  const {
    isAvailable,
    isLoading,
    requestReview,
    requestReviewAfterPositiveAction,
    requestReviewAfterMilestone,
    checkAvailability,
    stats,
  } = useInAppReview();

  const { trackPositiveAction, getStats } = useAppReviewTracker({
    trackAppOpens: true,
    trackPositiveActions: true,
    autoTriggerReviews: false, // We'll trigger manually in examples
  });

  useEffect(() => {
    // Check availability when component mounts
    checkAvailability();
  }, [checkAvailability]);

  // Example 1: Basic review request
  const handleBasicReview = async () => {
    const success = await requestReviewAfterPositiveAction();
    console.log('Basic review result:', success);
  };

  // Example 2: Custom configuration
  const handleCustomReview = async () => {
    const success = await requestReview({
      maxRequestCount: 5,
      minDaysBetweenRequests: 7,
      showReviewDialog: true,
    });
    console.log('Custom review result:', success);
  };

  // Example 3: Milestone-based review
  const handleMilestoneReview = async () => {
    const success = await requestReviewAfterMilestone('level_completed');
    console.log('Milestone review result:', success);
  };

  // Example 4: Service-based approach
  const handleServiceReview = async () => {
    const service = InAppReviewService.getInstance();
    const success = await service.requestReviewAfterPositiveAction();
    console.log('Service review result:', success);
  };

  // Example 5: Track positive action
  const handlePositiveAction = async () => {
    const success = await trackPositiveAction();
    console.log('Positive action tracking result:', success);
  };

  // Example 6: Check availability
  const handleCheckAvailability = async () => {
    await checkAvailability();
    console.log('Availability checked');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>In-App Review Examples</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Available: {isAvailable ? '✅ Yes' : '❌ No'}
        </Text>
        <Text style={styles.statusText}>
          Loading: {isLoading ? '🔄 Yes' : '✅ No'}
        </Text>
        <Text style={styles.statusText}>
          Request Count: {stats.requestCount}
        </Text>
        <Text style={styles.statusText}>
          Last Request: {stats.lastRequestDate ? stats.lastRequestDate.toLocaleDateString() : 'Never'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Basic Review Request</Text>
        <TouchableOpacity style={styles.button} onPress={handleBasicReview}>
          <Text style={styles.buttonText}>Request Basic Review</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Custom Configuration</Text>
        <TouchableOpacity style={styles.button} onPress={handleCustomReview}>
          <Text style={styles.buttonText}>Request Custom Review</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Milestone Review</Text>
        <TouchableOpacity style={styles.button} onPress={handleMilestoneReview}>
          <Text style={styles.buttonText}>Request Milestone Review</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Service-based Approach</Text>
        <TouchableOpacity style={styles.button} onPress={handleServiceReview}>
          <Text style={styles.buttonText}>Service Review</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Track Positive Action</Text>
        <TouchableOpacity style={styles.button} onPress={handlePositiveAction}>
          <Text style={styles.buttonText}>Track Positive Action</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Check Availability</Text>
        <TouchableOpacity style={styles.button} onPress={handleCheckAvailability}>
          <Text style={styles.buttonText}>Check Availability</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Pre-built Button Component</Text>
        <InAppReviewButton 
          title="⭐ Rate Our App"
          onPress={() => console.log('Review button pressed')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Review Statistics</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            const stats = getStats();
            console.log('Review tracking stats:', stats);
          }}
        >
          <Text style={styles.buttonText}>Get Tracking Stats</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration Examples</Text>
        <Text style={styles.configText}>
          Early Engagement: {JSON.stringify(ReviewConfigs.earlyEngagement, null, 2)}
        </Text>
        <Text style={styles.configText}>
          Established User: {JSON.stringify(ReviewConfigs.establishedUser, null, 2)}
        </Text>
        <Text style={styles.configText}>
          Power User: {JSON.stringify(ReviewConfigs.powerUser, null, 2)}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  configText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    fontFamily: 'monospace',
  },
});

export default InAppReviewExamples;