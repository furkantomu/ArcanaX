const imageMap: Record<number, any> = {
  1: require('../../assets/numerology/1.webp'),
  2: require('../../assets/numerology/2.webp'),
  3: require('../../assets/numerology/3.webp'),
  4: require('../../assets/numerology/4.webp'),
  5: require('../../assets/numerology/5.webp'),
  6: require('../../assets/numerology/6.webp'),
  7: require('../../assets/numerology/7.webp'),
  8: require('../../assets/numerology/8.webp'),
  9: require('../../assets/numerology/9.webp'),
  11: require('../../assets/numerology/11.webp'),
  22: require('../../assets/numerology/22.webp'),
  33: require('../../assets/numerology/33.webp'),
};

export const getImageForNumber = (num: number) => {
  return imageMap[num] || require('../../assets/background/numerology.webp');
};

const NumberIcons: Record<string, any> = {
  '0': require('../../assets/card/number/0.zero.png'),
  '1': require('../../assets/card/number/1.one.png'),
  '2': require('../../assets/card/number/2.two.png'),
  '3': require('../../assets/card/number/3.three.png'),
  '4': require('../../assets/card/number/4.four.png'),
  '5': require('../../assets/card/number/5.five.png'),
  '6': require('../../assets/card/number/6.six.png'),
  '7': require('../../assets/card/number/7.seven.png'),
  '8': require('../../assets/card/number/8.eight.png'),
  '9': require('../../assets/card/number/9.nine.png'),
  '10': require('../../assets/card/number/10.ten.png'),
  '11': require('../../assets/card/number/11.eleven.png'),
  '12': require('../../assets/card/number/12.twelve.png'),
  '13': require('../../assets/card/number/13.thirteen.png'),
  '14': require('../../assets/card/number/14.fourteen.png'),
  '15': require('../../assets/card/number/15.fifteen.png'),
  '16': require('../../assets/card/number/16.sixteen.png'),
  '17': require('../../assets/card/number/17.seventeen.png'),
  '18': require('../../assets/card/number/18.eighteen.png'),
  '19': require('../../assets/card/number/19.nineteen.png'),
  '20': require('../../assets/card/number/20.twenty.png'),
  '21': require('../../assets/card/number/21.twentyone.png'),
  '22': require('../../assets/card/number/22.twentytwo.png'),
};

export const getImageForCardNumber = (num: string) => {
  return NumberIcons[num] || require('../../assets/card/number/0.zero.png');
};

const ZodiacIcons: Record<string, any> = {
  Koç: require('../../assets/card/zodiac/aries.png'),
  Boğa: require('../../assets/card/zodiac/taurus.png'),
  İkizler: require('../../assets/card/zodiac/gemini.png'),
  Yengeç: require('../../assets/card/zodiac/cancer.png'),
  Aslan: require('../../assets/card/zodiac/leo.png'),
  Başak: require('../../assets/card/zodiac/virgo.png'),
  Terazi: require('../../assets/card/zodiac/libra.png'),
  Akrep: require('../../assets/card/zodiac/scorpio.png'),
  Yay: require('../../assets/card/zodiac/sagittarius.png'),
  Oğlak: require('../../assets/card/zodiac/capricorn.png'),
  Kova: require('../../assets/card/zodiac/aquarius.png'),
  Balık: require('../../assets/card/zodiac/pisces.png'),
};

export const getImageForCardZodiac = (zodiac: string) => {
  return ZodiacIcons[zodiac] || require('../../assets/card/zodiac/aries.png');
};

const ElementIcons: Record<string, any> = {
  Ateş: require('../../assets/card/element/fire.png'),
  Su: require('../../assets/card/element/water.png'),
  Toprak: require('../../assets/card/element/terrain.png'),
  Hava: require('../../assets/card/element/wind.png'),
};
export const getImageForCardElement = (type: string) => {
  return ElementIcons[type] || require('../../assets/card/element/fire.png');
};
