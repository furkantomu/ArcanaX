# In-App Review Implementation Guide

Bu rehber, React Native uygulamanızda `react-native-in-app-review` kullanarak in-app review özelliğini nasıl kullanacağınızı açıklar.

## Kurulum

Paket zaten projeye eklenmiştir. Eğer manuel olarak eklemek isterseniz:

```bash
npm install react-native-in-app-review
```

## Özellikler

### 1. InAppReviewService

Ana servis sınıfı. Singleton pattern kullanır ve şu özellikleri sağlar:

- In-app review'in mevcut olup olmadığını kontrol etme
- Review isteği gönderme
- İstek sayısı ve zaman sınırlamaları
- Pozitif kullanıcı aksiyonlarından sonra review isteme

### 2. useInAppReview Hook

React bileşenlerinde kullanım için özel hook:

```typescript
import { useInAppReview } from '../hooks/useInAppReview';

const MyComponent = () => {
  const {
    isAvailable,
    isLoading,
    requestReviewAfterPositiveAction,
    checkAvailability,
  } = useInAppReview();

  // Kullanım örneği
  const handlePositiveAction = async () => {
    const success = await requestReviewAfterPositiveAction();
    if (success) {
      console.log('Review başarıyla istendi');
    }
  };

  return (
    <Button onPress={handlePositiveAction} title="Uygulamayı Değerlendir" />
  );
};
```

### 3. InAppReviewButton Bileşeni

Hazır kullanıma uygun buton bileşeni:

```typescript
import InAppReviewButton from '../components/InAppReviewButton';

const MyScreen = () => {
  return (
    <View>
      <InAppReviewButton 
        title="Uygulamayı Değerlendir"
        onPress={() => console.log('Buton tıklandı')}
      />
    </View>
  );
};
```

### 4. ReviewTriggers Utility

Otomatik review tetikleme için yardımcı sınıf:

```typescript
import { ReviewTriggers, ReviewConfigs } from '../utils/reviewTriggers';

const triggers = ReviewTriggers.getInstance();

// App açılışında
await triggers.trackAppOpen(ReviewConfigs.earlyEngagement);

// Pozitif aksiyon sonrası
await triggers.trackPositiveAction(ReviewConfigs.earlyEngagement);
```

## Kullanım Senaryoları

### 1. Basit Review İsteği

```typescript
import InAppReviewService from '../services/InAppReviewService';

const service = InAppReviewService.getInstance();
const success = await service.requestReviewAfterPositiveAction();
```

### 2. Özel Konfigürasyon ile Review

```typescript
const success = await service.requestReview({
  maxRequestCount: 5,
  minDaysBetweenRequests: 14,
  showReviewDialog: true,
});
```

### 3. Milestone Sonrası Review

```typescript
const success = await service.requestReviewAfterMilestone('level_completed');
```

### 4. Otomatik Tetikleme

```typescript
import { ReviewTriggers, ReviewConfigs } from '../utils/reviewTriggers';

const triggers = ReviewTriggers.getInstance();

// App açılışında kontrol et
useEffect(() => {
  const checkForReview = async () => {
    const shouldTrigger = await triggers.trackAppOpen(ReviewConfigs.establishedUser);
    if (shouldTrigger) {
      await triggers.triggerReview(ReviewConfigs.establishedUser);
    }
  };
  
  checkForReview();
}, []);
```

## Konfigürasyon Seçenekleri

### ReviewConfigs

```typescript
// Erken kullanıcı etkileşimi
earlyEngagement: {
  minAppOpens: 5,
  minPositiveActions: 3,
  maxReviewRequests: 2,
  daysBetweenRequests: 7,
}

// Yerleşik kullanıcı
establishedUser: {
  minAppOpens: 10,
  minDaysSinceInstall: 7,
  minPositiveActions: 5,
  maxReviewRequests: 3,
  daysBetweenRequests: 14,
}

// Güçlü kullanıcı
powerUser: {
  minAppOpens: 20,
  minDaysSinceInstall: 14,
  minPositiveActions: 15,
  maxReviewRequests: 5,
  daysBetweenRequests: 30,
}
```

## En İyi Uygulamalar

### 1. Doğru Zamanlama
- Kullanıcı pozitif bir deneyim yaşadıktan sonra review isteyin
- App açılışında hemen istemeyin
- Kullanıcı meşgulken istemeyin

### 2. Sınırlama
- Çok sık review istemeyin
- Maksimum istek sayısını sınırlayın
- Günler arası minimum süre belirleyin

### 3. Kullanıcı Deneyimi
- Review butonunu zorla göstermeyin
- Kullanıcıya "Hayır" deme seçeneği verin
- Review isteğini doğal bir şekilde entegre edin

## Örnek Entegrasyon

### App.tsx'te Kullanım

```typescript
import React, { useEffect } from 'react';
import { ReviewTriggers, ReviewConfigs } from './src/utils/reviewTriggers';

const App = () => {
  useEffect(() => {
    const initializeReviewTriggers = async () => {
      const triggers = ReviewTriggers.getInstance();
      
      // İlk kurulum tarihini ayarla (sadece bir kez)
      // triggers.setInstallDate();
      
      // App açılışını takip et
      const shouldTrigger = await triggers.trackAppOpen(ReviewConfigs.establishedUser);
      if (shouldTrigger) {
        await triggers.triggerReview(ReviewConfigs.establishedUser);
      }
    };

    initializeReviewTriggers();
  }, []);

  return (
    // App bileşenleri
  );
};
```

### Screen'de Kullanım

```typescript
import React from 'react';
import { View, Button } from 'react-native';
import { useInAppReview } from '../hooks/useInAppReview';

const GameScreen = () => {
  const { requestReviewAfterPositiveAction } = useInAppReview();

  const handleLevelComplete = async () => {
    // Oyun seviyesi tamamlandı
    console.log('Seviye tamamlandı!');
    
    // Pozitif aksiyon sonrası review iste
    await requestReviewAfterPositiveAction();
  };

  return (
    <View>
      <Button title="Seviyeyi Tamamla" onPress={handleLevelComplete} />
    </View>
  );
};
```

## Platform Özellikleri

### iOS
- iOS 10.3+ gereklidir
- TestFlight'ta çalışmaz
- App Store'da yayınlandıktan sonra çalışır

### Android
- Google Play Store gereklidir
- Test sürümlerinde çalışır
- Minimum API level 21 gereklidir

## Hata Yönetimi

```typescript
try {
  const success = await service.requestReview();
  if (success) {
    console.log('Review başarıyla istendi');
  } else {
    console.log('Review isteği başarısız');
  }
} catch (error) {
  console.error('Review isteği sırasında hata:', error);
  // Fallback: App Store'a yönlendir
}
```

## Test Etme

### Development
- iOS Simulator'da test edilemez
- Android Emulator'da test edilebilir
- Gerçek cihazda test edin

### Production
- App Store/Play Store'da yayınlandıktan sonra test edin
- Farklı kullanıcı senaryolarını test edin
- Analytics ile sonuçları takip edin

## Sorun Giderme

### Yaygın Sorunlar

1. **Review dialog görünmüyor**
   - Platform'un desteklediğinden emin olun
   - Test ortamında olmadığınızdan emin olun
   - Çok sık istemediğinizden emin olun

2. **iOS'ta çalışmıyor**
   - iOS 10.3+ kullandığınızdan emin olun
   - App Store'da yayınlandığından emin olun
   - TestFlight'ta test etmeyin

3. **Android'de çalışmıyor**
   - Google Play Store'un yüklü olduğundan emin olun
   - API level 21+ kullandığınızdan emin olun

## Ek Kaynaklar

- [react-native-in-app-review GitHub](https://github.com/MinaSamir11/react-native-in-app-review)
- [Apple In-App Review Guidelines](https://developer.apple.com/app-store/ratings-and-reviews/)
- [Google Play In-App Review](https://developer.android.com/guide/playcore/in-app-review)