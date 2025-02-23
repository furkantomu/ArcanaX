export function getReadingTypeText(readingType: number) {
  let readingText = '';

  switch (readingType) {
    case 1:
      readingText = 'Tek Kart Okuması';
      break;
    case 3:
      readingText = 'Üç Kart Okuması';
      break;
    case 10:
      readingText = 'Kelt Haçı Yöntemi';
      break;
    case 6:
      readingText = 'İlişki Okuması';
      break;
    default:
      return 'Bilinmeyen Okuma Türü';
  }

  return readingText;
}
