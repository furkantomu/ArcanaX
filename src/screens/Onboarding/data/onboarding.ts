import {COLORS} from '@/styles/theme';
import {ImageSourcePropType} from 'react-native/types';

export interface OnboardingData {
  id: number;
  image: ImageSourcePropType;
  text: string;
  textColor: string;
  description: string;
  backgroundColor: string;
  type?: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    image: require('../../../../assets/onboarding/onboarding1.webp'),
    text: 'Gizemli Bir Yolculuğa Hazır Mısınız?',
    description:
      'Kendinizi ve geleceğinizi keşfetmeye başlayın! Tarot, numeroloji ve astrolojinin kadim bilgeliğiyle hayatınıza rehberlik edin',
    textColor: COLORS.cream,
    backgroundColor: COLORS.blackOpacity1,
  },
  {
    id: 2,
    image: require('../../../../assets/onboarding/onboarding2.webp'),
    text: 'Tarot Kartları: Geleceğiniz Size Fısıldıyor',
    description:
      'Aşk, kariyer, sağlık veya spiritüel rehberlik… Kartlar, sezgilerinizi güçlendirerek size yol gösterecek.',
    textColor: COLORS.darkBlue,
    backgroundColor: '#e586af76',
    type: 'email',
  },
  {
    id: 3,
    image: require('../../../../assets/onboarding/onboarding3.webp'),
    text: 'Numeroloji: Sayıların Gizemli Mesajları',
    description:
      'Hayat yolunuz, kader sayınız ve ruhsal titreşiminiz… Sayılar size kim olduğunuzu anlatıyor.',
    textColor: COLORS.darkBlue,
    backgroundColor: '#f5f5dc86',
    type: 'fullName',
  },
  {
    id: 4,
    image: require('../../../../assets/onboarding/onboardingLast.webp'),
    text: 'Size Özel Bir Deneyim',
    description:
      'Kendi doğum bilgilerinizi girerek en doğru öngörülere ulaşın! Geleceğinizi kişiselleştirilmiş analizlerle aydınlatın.',
    textColor: COLORS.darkBlue,
    backgroundColor: '#c0c0c09f',
    type: 'birthdate',
  },
  {
    id: 5,
    image: require('../../../../assets/onboarding/onboarding4.webp'),
    text: 'Haydi, Yolculuğunuzu Başlatalım!',
    description: 'Evrensel enerjilere açılın ve keşfetmeye başlayın!',
    textColor: COLORS.darkBlue,
    backgroundColor: '#c0c0c09f',
    type: 'password',
  },
];

export default data;
