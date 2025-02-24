import { responsiveSize } from '@/utils/responsiveSize';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const COLORS = {
    black: '#0b090a',
    blackOpacity: 'rgba(11,9,10,0.12)',
    blackOpacity1: 'rgba(11,9,10,0.7)',
    white: '#FFFFFF',
    textColor: '#edf6f9',
    gold: '#FFD700',
    cream: '#F5F5DC',
    darkGray: '#2C2C2C',
    silverGray: '#C0C0C0',
    darkBlue: '#1A1F4E',
    darkBlue1: '#1F3B4D',
    red: '#B03030',
    openRed: '#D7263D',
    darkRed: '#5D1F2D',
    green: '#3B5F41',
};

const SIZES = {
    title: responsiveSize(32),
    subTitle:responsiveSize(24),
    body1: responsiveSize(30),
    body2: responsiveSize(20),
    body3: responsiveSize(16),
    body4: responsiveSize(14),
    body5: responsiveSize(12),
    width,
    height,
};

const FONTS = {
    NotoSerifRegular:'NotoSerif-Regular',
    NotoSerifBold: 'NotoSerif-Bold',

    NotoSerifThin: 'NotoSerif-Thin',

    NotoSerifCondensedThin: 'NotoSerifCondensed-Thin',
    NotoSerifCondensedLightItalic: 'NotoSerifCondensed-LightItalic',
    NotoSerifCondensedItalic: 'NotoSerifCondensed-Italic',
    NotoSerifCondensedMediumItalic: 'NotoSerifCondensed-MediumItalic',
    NotoSerifCondensedBoldItalic: 'NotoSerifCondensed-BoldItalic',
};
export {COLORS, SIZES, FONTS};

