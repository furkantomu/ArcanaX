import React, {ReactNode} from 'react';
import {Text, TextStyle, StyleSheet, TextProps} from 'react-native';

import {COLORS} from 'styles/theme';
import {fontSize, getFont, letterSpacing} from 'styles/typography';

interface TypographyProps extends TextProps {
  children: ReactNode;
  size?: 'small' | 'regular' | 'medium' | 'large' | 'heading' | 'title';
  weight?:
    | 'regular'
    | 'bold'
    | 'NotoSerifThin'
    | 'NotoSerifCondensedThin'
    | 'NotoSerifCondensedLightItalic'
    | 'NotoSerifCondensedItalic'
    | 'NotoSerifCondensedMediumItalic'
    | 'NotoSerifCondensedBoldItalic';
  lineHeightType?: 'small' | 'regular' | 'medium' | 'large';
  letterSpacingType?: 'normal' | 'wide';
  style?: TextStyle;
}

const Typography: React.FC<TypographyProps> = React.memo(({
  children,
  size = 'regular',
  weight = 'regular',
  letterSpacingType = 'normal',
  style,
  ...props
}) => {
  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: fontSize[size],
          fontFamily: getFont(weight),
          letterSpacing: letterSpacing[letterSpacingType],
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
});

const styles = StyleSheet.create({
  text: {
    color: COLORS.cream,
  },
});

export default Typography;
