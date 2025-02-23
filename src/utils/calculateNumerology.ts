const reduceToSingleDigit = (num: number): number =>
  num
    .toString()
    .split('')
    .reduce((sum, digit) => sum + Number(digit), 0);

// Calculate Life Path Number (Yaşam Yolu Sayısı)
const calculateLifePathNumber = (birthDate: string): number => {
  const [day, month, year] = birthDate.split('-').map(Number);

  let totalSum = reduceToSingleDigit(
    reduceToSingleDigit(day) +
      reduceToSingleDigit(month) +
      reduceToSingleDigit(year),
  );
  if ([11, 22, 33].includes(totalSum)) {
    return totalSum;
  }

  while (totalSum >= 10) {
    totalSum = reduceToSingleDigit(totalSum);
  }
  return totalSum;
};

// Calculate Expression Number (İfade Sayısı) from Name
function calculateExpressionNumber(name: string): number {
  const alphabetMap: {[key: string]: number} = {
    A: 1,
    B: 2,
    C: 3,
    Ç: 0,
    D: 4,
    E: 5,
    F: 8,
    G: 3,
    Ğ: 0,
    H: 5,
    I: 1,
    İ: 0,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 7,
    Ö: 0,
    P: 8,
    R: 2,
    S: 3,
    Ş: 0,
    T: 4,
    U: 6,
    Ü: 0,
    V: 6,
    Y: 1,
    Z: 7,
    w: 6,
  };
  const nameUpper = name.toUpperCase();

  let sum = nameUpper
    .split('')
    .reduce((acc, char) => acc + (alphabetMap[char] || 0), 0);

  while (sum >= 10) {
    sum = reduceToSingleDigit(sum);
  }

  return sum;
}

// Calculate Personal Year Number (Kişisel Yıl Sayısı)
const calculatePersonalYearNumber = (
  birthDate: string,
  year: number,
): number => {
  const lifePath = calculateLifePathNumber(birthDate);

  // Step 1: Add the year (e.g., 2025) to the Life Path number
  const yearSum = reduceToSingleDigit(year);
  const personalYearSum = reduceToSingleDigit(Number(lifePath) + yearSum);

  return personalYearSum;
};

// Radikal sayıyı hesaplama fonksiyonu
function calculateRadicalNumber(day: number): number {
  if (day <= 9) {
    return day;
  }
  let sum = day
    .toString()
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit), 0);
  while (sum > 9) {
    sum = sum
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  return sum;
}

// Karmik Sayı olup olmadığını kontrol eden fonksiyon (Sadece güne göre)
function checkKarmicNumber(dateOfBirth: string): boolean {
  // Doğum tarihini 'yyyy-mm-dd' formatında alırız
  const dateParts = dateOfBirth.split('-');
  const day = parseInt(dateParts[0], 10);

  // Ay sayısını kontrol ediyoruz, sadece 13, 14, 16, 19'la karşılaştırıyoruz
  return [13, 14, 16, 19].includes(day);
}

export const calculateNumerology = (name: string, birthDate: string) => {
  const currentYear = new Date().getFullYear();
  const lifePath = calculateLifePathNumber(birthDate);
  const expression = calculateExpressionNumber(name);
  const personalYear = calculatePersonalYearNumber(birthDate, currentYear);
  const radicalNumber = calculateRadicalNumber(Number(birthDate.split('-')[0]));
  const checkSpecificNumber = checkKarmicNumber(birthDate);
  return {
    lifePath,
    expression,
    personalYear,
    radicalNumber,
    checkSpecificNumber,
  };
};

export const calculatePinnacleNumber = (birthDate: string) => {
  const [day, month, year] = birthDate.split('-').map(Number);

  const singleDay = reduceToSingleDigit(day);
  const singleMonth = reduceToSingleDigit(month);
  const singleYear = reduceToSingleDigit(year);

  const pinnacleNumberOneValue = reduceToSingleDigit(singleDay + singleMonth);
  const pinnacleNumberTwoValue = reduceToSingleDigit(singleDay + singleYear);
  const pinnacleNumberThirdValue = reduceToSingleDigit(
    pinnacleNumberOneValue + pinnacleNumberTwoValue,
  );

  const result = {
    pinnacleNumberOneValue,
    pinnacleNumberTwoValue,
    pinnacleNumberThirdValue,
  };
  return result;
};