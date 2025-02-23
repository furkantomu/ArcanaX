import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import { Icons } from './Icons';

type IconProps = {
  name: keyof typeof Icons;
  size?: number;
  style?: object;
};

const Icon: React.FC<IconProps> = ({name, size = 24, style}) => {
  const source: ImageSourcePropType = Icons[name];

  return (
    <Image
      source={source}
      resizeMode= {'contain'}
      style={[{width: size, height: size}, style]}
    />
  );
};

export default Icon;
