type FontSize = 'small' | 'regular' | 'medium' | 'large' | 'heading' | 'title';
type LineHeight = 'small' | 'regular' | 'medium' | 'large';
type LetterSpacing = 'normal' | 'wide';
type FontWeight =
  | 'regular'
  | 'bold'
  | 'NotoSerifThin'
  | 'NotoSerifCondensedThin'
  | 'NotoSerifCondensedLightItalic'
  | 'NotoSerifCondensedItalic'
  | 'NotoSerifCondensedMediumItalic'
  | 'NotoSerifCondensedBoldItalic';

const fonts = {
  regular: 'NotoSerif-Regular',
  bold: 'NotoSerif-Bold',
  NotoSerifThin: 'NotoSerif-Thin',
  NotoSerifCondensedThin: 'NotoSerifCondensed-Thin',
  NotoSerifCondensedLightItalic: 'NotoSerifCondensed-LightItalic',
  NotoSerifCondensedItalic: 'NotoSerifCondensed-Italic',
  NotoSerifCondensedMediumItalic: 'NotoSerifCondensed-MediumItalic',
  NotoSerifCondensedBoldItalic: 'NotoSerifCondensed-BoldItalic',
};

const fontSize: Record<FontSize, number> = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
  heading: 24,
  title: 32,
};

const lineHeight: Record<LineHeight, number> = {
  small: 16,
  regular: 18,
  medium: 20,
  large: 24,
};

const letterSpacing: Record<LetterSpacing, number> = {
  normal: 0,
  wide: 1,
};


const getFont = (weight: FontWeight): string => {
  switch (weight) {
    case 'regular':
      return fonts.regular;
    case 'NotoSerifThin':
      return fonts.NotoSerifThin;
    case 'NotoSerifCondensedThin':
      return fonts.NotoSerifCondensedThin;
    case 'NotoSerifCondensedLightItalic':
      return fonts.NotoSerifCondensedLightItalic;
    case 'NotoSerifCondensedItalic':
      return fonts.NotoSerifCondensedItalic;
    case 'NotoSerifCondensedMediumItalic':
      return fonts.NotoSerifCondensedMediumItalic;
    case 'NotoSerifCondensedBoldItalic':
      return fonts.NotoSerifCondensedBoldItalic;
    default:
      return fonts.bold;
  }
};

export {fonts, fontSize, lineHeight, letterSpacing, getFont};
