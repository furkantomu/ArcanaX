export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';
type ZodiacSignTR =
  | 'Koç'
  | 'Boğa'
  | 'İkizler'
  | 'Yengeç'
  | 'Aslan'
  | 'Başak'
  | 'Terazi'
  | 'Akrep'
  | 'Yay'
  | 'Oğlak'
  | 'Kova'
  | 'Balık';

interface ZodiacRange {
  sign: ZodiacSign;
  signTR: ZodiacSignTR; // Türkçe burç ismi
  start: {month: number; day: number};
  end: {month: number; day: number};
}

const zodiacRanges: ZodiacRange[] = [
  {
    sign: 'Aries',
    signTR: 'Koç',
    start: {month: 3, day: 21},
    end: {month: 4, day: 19},
  },
  {
    sign: 'Taurus',
    signTR: 'Boğa',
    start: {month: 4, day: 20},
    end: {month: 5, day: 20},
  },
  {
    sign: 'Gemini',
    signTR: 'İkizler',
    start: {month: 5, day: 21},
    end: {month: 6, day: 20},
  },
  {
    sign: 'Cancer',
    signTR: 'Yengeç',
    start: {month: 6, day: 21},
    end: {month: 7, day: 22},
  },
  {
    sign: 'Leo',
    signTR: 'Aslan',
    start: {month: 7, day: 23},
    end: {month: 8, day: 22},
  },
  {
    sign: 'Virgo',
    signTR: 'Başak',
    start: {month: 8, day: 23},
    end: {month: 9, day: 22},
  },
  {
    sign: 'Libra',
    signTR: 'Terazi',
    start: {month: 9, day: 23},
    end: {month: 10, day: 22},
  },
  {
    sign: 'Scorpio',
    signTR: 'Akrep',
    start: {month: 10, day: 23},
    end: {month: 11, day: 21},
  },
  {
    sign: 'Sagittarius',
    signTR: 'Yay',
    start: {month: 11, day: 22},
    end: {month: 0, day: 19},
  },
  {
    sign: 'Capricorn',
    signTR: 'Oğlak',
    start: {month: 0, day: 20},
    end: {month: 1, day: 18},
  },
  {
    sign: 'Aquarius',
    signTR: 'Kova',
    start: {month: 1, day: 19},
    end: {month: 2, day: 20},
  },
  {
    sign: 'Pisces',
    signTR: 'Balık',
    start: {month: 2, day: 20},
    end: {month: 3, day: 20},
  },
];

export function getZodiacSign(
  day: number,
  month: number,
): { engName: ZodiacSign; name: ZodiacSignTR } | null {
  for (const { sign, signTR, start, end } of zodiacRanges) {
    if (
      (month === start.month && day >= start.day) ||
      (month === end.month && day <= end.day) ||
      (start.month > end.month &&
        (month > start.month || month < end.month)) || // Yıl sonu geçişi (ör: Oğlak: 22 Aralık - 19 Ocak)
      (month > start.month && month < end.month)
    ) {
      return { engName: sign, name: signTR };
    }
  }

  return null; // Artık error fırlatmıyor
}

