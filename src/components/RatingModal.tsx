import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {Typography, Button} from '@/components';
import {COLORS, SIZES} from '@/styles/theme';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';
import {apiService} from '@/services/APIService';
import {showToast} from '@/utils/showToast';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({visible, onClose}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {localeValue} = useAppSelector(state => state.settings);
  
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withSpring(1, {damping: 15, stiffness: 150});
      opacity.value = withTiming(1, {duration: 300});
    } else {
      scale.value = withSpring(0, {damping: 15, stiffness: 150});
      opacity.value = withTiming(0, {duration: 200});
    }
  }, [visible, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
    // Haptic feedback
    ReactNativeHapticFeedback.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert(
        i18n.t('RATING_MODAL.ALERT_TITLE', {locale: localeValue}),
        i18n.t('RATING_MODAL.PLEASE_RATE', {locale: localeValue}),
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Rating'i API'ye gönder
      await apiService.post('/rating', {
        rating,
        comment,
        platform: Platform.OS,
      });

      showToast({
        message: i18n.t('RATING.MESSAGE', {locale: localeValue}),
        type: 'success',
      });

      if (rating >= 4) {
        // 4-5 yıldız veren kullanıcıları mağazaya yönlendir
        try {
          if (Platform.OS === 'android') {
            const packageName = 'com.arcanax';
            const url = `market://details?id=${packageName}`;
            const canOpen = await Linking.canOpenURL(url);
            
            if (canOpen) {
              await Linking.openURL(url);
            } else {
              // Google Play Store web linki
              await Linking.openURL(`https://play.google.com/store/apps/details?id=${packageName}`);
            }
          }
        } catch (error) {
          console.log('Mağaza açılamadı:', error);
        }
      }
    } catch (error) {
      console.log('Rating gönderilemedi:', error);
      showToast({
        message: i18n.t('TOAST.ERROR', {locale: localeValue}),
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
    
    // State'leri sıfırla
    setRating(0);
    setComment('');
    
    // Modal'ı kapat
    onClose();
  };

  const handleSkip = () => {
    // Haptic feedback
    ReactNativeHapticFeedback.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    
    // State'leri sıfırla
    setRating(0);
    setComment('');
    
    // Modal'ı kapat
    onClose();
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starScale = useSharedValue(1);
      
      const starAnimatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{scale: starScale.value}],
        };
      });

      const handleStarPress = () => {
        starScale.value = withSpring(1.2, {damping: 10, stiffness: 200});
        setTimeout(() => {
          starScale.value = withSpring(1, {damping: 10, stiffness: 200});
        }, 100);
        handleRating(i);
      };

      stars.push(
        <Animated.View key={i} style={starAnimatedStyle}>
          <TouchableOpacity
            onPress={handleStarPress}
            style={{
              marginHorizontal: 5,
            }}>
            <Typography
              size="title"
              style={{
                color: i <= rating ? COLORS.gold : COLORS.cream,
              }}>
              ★
            </Typography>
          </TouchableOpacity>
        </Animated.View>,
      );
    }
    return stars;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
              <Animated.View
          style={[
            {
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            },
            {opacity: opacity.value},
          ]}
          onTouchEnd={onClose}>
                  <Animated.View
            style={[
              {
                backgroundColor: COLORS.black,
                borderRadius: 20,
                padding: 20,
                width: '100%',
                maxWidth: 350,
                borderWidth: 1,
                borderColor: COLORS.gold,
              },
              animatedStyle,
            ]}
            onTouchEnd={(e) => e.stopPropagation()}>
          <Typography
            weight="NotoSerifCondensedBoldItalic"
            size="title"
            style={{
              textAlign: 'center',
              marginBottom: 20,
              color: COLORS.gold,
            }}>
            {i18n.t('RATING_MODAL.TITLE', {locale: localeValue})}
          </Typography>

          <Typography
            size="medium"
            style={{
              textAlign: 'center',
              marginBottom: 20,
              color: COLORS.cream,
            }}>
            {i18n.t('RATING_MODAL.DESCRIPTION', {locale: localeValue})}
          </Typography>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            {renderStars()}
          </View>
          
          {rating > 0 && (
            <Typography
              size="small"
              style={{
                textAlign: 'center',
                marginBottom: 20,
                color: COLORS.gold,
              }}>
              {rating === 1 && i18n.t('RATING_MODAL.RATING_1', {locale: localeValue})}
              {rating === 2 && i18n.t('RATING_MODAL.RATING_2', {locale: localeValue})}
              {rating === 3 && i18n.t('RATING_MODAL.RATING_3', {locale: localeValue})}
              {rating === 4 && i18n.t('RATING_MODAL.RATING_4', {locale: localeValue})}
              {rating === 5 && i18n.t('RATING_MODAL.RATING_5', {locale: localeValue})}
            </Typography>
          )}

          <TextInput
            style={{
              backgroundColor: COLORS.blackOpacity,
              borderRadius: 10,
              padding: 15,
              marginBottom: 5,
              color: COLORS.cream,
              borderWidth: 1,
              borderColor: COLORS.gold,
              minHeight: 80,
              textAlignVertical: 'top',
            }}
            placeholder={i18n.t('RATING_MODAL.COMMENT_PLACEHOLDER', {
              locale: localeValue,
            })}
            placeholderTextColor={COLORS.blackOpacity1}
            value={comment}
            onChangeText={setComment}
            multiline
            maxLength={200}
          />
          <Typography
            size="small"
            style={{
              textAlign: 'right',
              marginBottom: 20,
              color: COLORS.blackOpacity1,
            }}>
            {comment.length}/200
          </Typography>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              text={i18n.t('RATING_MODAL.SKIP', {locale: localeValue})}
              variant="secondary"
              handlePress={handleSkip}
              buttonStyle={{
                flex: 0.48,
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: COLORS.cream,
              }}
            />
            <Button
              text={
                isSubmitting
                  ? i18n.t('RATING_MODAL.SUBMITTING', {locale: localeValue})
                  : i18n.t('RATING_MODAL.SUBMIT', {locale: localeValue})
              }
              handlePress={handleSubmit}
              disabled={isSubmitting}
              buttonStyle={{
                flex: 0.48,
              }}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default RatingModal;