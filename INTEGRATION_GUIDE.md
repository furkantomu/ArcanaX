# In-App Review Integration Guide

Bu rehber, mevcut ekranlarınıza in-app review özelliğini nasıl entegre edeceğinizi gösterir.

## Hızlı Başlangıç

### 1. Basit Review Butonu Ekleme

Herhangi bir ekrana review butonu eklemek için:

```typescript
import InAppReviewButton from '../components/InAppReviewButton';

const MyScreen = () => {
  return (
    <View>
      {/* Mevcut içerik */}
      <InAppReviewButton 
        title="Uygulamayı Değerlendir"
        onPress={() => console.log('Review butonu tıklandı')}
      />
    </View>
  );
};
```

### 2. Pozitif Aksiyon Sonrası Review

Kullanıcı pozitif bir deneyim yaşadıktan sonra review istemek için:

```typescript
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

### 3. Otomatik Review Tetikleme

App açılışında otomatik review tetiklemek için:

```typescript
import { useAppReviewTracker } from '../hooks/useAppReviewTracker';
import { ReviewConfigs } from '../utils/reviewTriggers';

const App = () => {
  useAppReviewTracker({
    trackAppOpens: true,
    trackPositiveActions: true,
    autoTriggerReviews: true,
    config: ReviewConfigs.establishedUser,
  });

  return (
    // App bileşenleri
  );
};
```

## Mevcut Ekranlara Entegrasyon

### HomeScreen'e Review Butonu Ekleme

```typescript
// src/screens/HomeScreen/HomeWrapper.tsx
import ReviewButton from './components/ReviewButton';

const HomeWrapper = () => {
  return (
    <View style={styles.flex}>
      {/* Mevcut içerik */}
      <SafeAreaView>
        <CustomHeader leftIcon={false} title={true} rightIcon={true} />
        <Slider scrollX={scrollX}/>
        <ReviewButton /> {/* Review butonu eklendi */}
      </SafeAreaView>
    </View>
  );
};
```

### TarotScreen'e Milestone Review Ekleme

```typescript
// src/screens/TarotScreen/index.tsx
import { useInAppReview } from '../../hooks/useInAppReview';

const TarotScreen = () => {
  const { requestReviewAfterMilestone } = useInAppReview();

  const handleReadingComplete = async () => {
    // Tarot okuması tamamlandı
    console.log('Tarot okuması tamamlandı!');
    
    // Milestone sonrası review iste
    await requestReviewAfterMilestone('tarot_reading_completed');
  };

  return (
    <View>
      {/* Mevcut tarot içeriği */}
      <Button title="Okumayı Tamamla" onPress={handleReadingComplete} />
    </View>
  );
};
```

### ProfileScreen'e Review Butonu Ekleme

```typescript
// src/screens/ProfileScreen/index.tsx
import InAppReviewButton from '../../components/InAppReviewButton';

const ProfileScreen = () => {
  return (
    <ScrollView>
      {/* Mevcut profil içeriği */}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Uygulama Hakkında</Text>
        <InAppReviewButton 
          title="⭐ Uygulamayı Değerlendir"
          style={styles.reviewButton}
        />
      </View>
    </ScrollView>
  );
};
```

## Konfigürasyon Seçenekleri

### Farklı Kullanıcı Tipleri İçin

```typescript
// Yeni kullanıcılar için
const newUserConfig = {
  minAppOpens: 3,
  minPositiveActions: 2,
  maxReviewRequests: 1,
  daysBetweenRequests: 5,
};

// Yerleşik kullanıcılar için
const establishedUserConfig = {
  minAppOpens: 10,
  minDaysSinceInstall: 7,
  minPositiveActions: 5,
  maxReviewRequests: 3,
  daysBetweenRequests: 14,
};

// Güçlü kullanıcılar için
const powerUserConfig = {
  minAppOpens: 20,
  minDaysSinceInstall: 14,
  minPositiveActions: 15,
  maxReviewRequests: 5,
  daysBetweenRequests: 30,
};
```

## En İyi Uygulamalar

### 1. Doğru Zamanlama
- ✅ Kullanıcı pozitif bir deneyim yaşadıktan sonra
- ✅ Oyun seviyesi tamamlandıktan sonra
- ✅ Önemli bir özellik kullanıldıktan sonra
- ❌ App açılışında hemen
- ❌ Kullanıcı meşgulken
- ❌ Hata durumlarında

### 2. Sınırlama
- ✅ Maksimum 3-5 review isteği
- ✅ Günler arası minimum süre (7-14 gün)
- ✅ Kullanıcı "Hayır" dedikten sonra tekrar isteme
- ❌ Çok sık isteme
- ❌ Sınırsız istek

### 3. Kullanıcı Deneyimi
- ✅ Doğal ve organik entegrasyon
- ✅ Kullanıcıya seçim hakkı verme
- ✅ Zorla göstermeme
- ❌ Popup spam
- ❌ Zorla yönlendirme

## Test Etme

### Development Ortamında
```typescript
// Test için review sayacını sıfırla
const { resetTracking } = useAppReviewTracker();
resetTracking();

// Test için review iste
const { requestReviewAfterPositiveAction } = useInAppReview();
await requestReviewAfterPositiveAction();
```

### Production Ortamında
- App Store/Play Store'da yayınlandıktan sonra test edin
- Farklı kullanıcı senaryolarını test edin
- Analytics ile sonuçları takip edin

## Sorun Giderme

### Review Dialog Görünmüyor
1. Platform desteğini kontrol edin
2. Test ortamında olmadığınızdan emin olun
3. Çok sık istemediğinizden emin olun
4. App Store/Play Store'da yayınlandığından emin olun

### iOS'ta Çalışmıyor
1. iOS 10.3+ kullandığınızdan emin olun
2. App Store'da yayınlandığından emin olun
3. TestFlight'ta test etmeyin

### Android'de Çalışmıyor
1. Google Play Store'un yüklü olduğundan emin olun
2. API level 21+ kullandığınızdan emin olun
3. Test sürümlerinde çalışır

## Örnek Kullanım Senaryoları

### Senaryo 1: Oyun Uygulaması
```typescript
// Seviye tamamlandığında
const handleLevelComplete = async () => {
  // Seviye tamamlandı animasyonu
  await playLevelCompleteAnimation();
  
  // Pozitif aksiyon sonrası review iste
  await requestReviewAfterPositiveAction();
};
```

### Senaryo 2: Sosyal Medya Uygulaması
```typescript
// İlk post paylaşıldığında
const handleFirstPost = async () => {
  // Post paylaşma işlemi
  await sharePost();
  
  // Milestone sonrası review iste
  await requestReviewAfterMilestone('first_post_shared');
};
```

### Senaryo 3: E-ticaret Uygulaması
```typescript
// İlk satın alma tamamlandığında
const handleFirstPurchase = async () => {
  // Satın alma işlemi
  await completePurchase();
  
  // Milestone sonrası review iste
  await requestReviewAfterMilestone('first_purchase_completed');
};
```

Bu entegrasyon rehberi ile in-app review özelliğini uygulamanıza kolayca ekleyebilirsiniz!