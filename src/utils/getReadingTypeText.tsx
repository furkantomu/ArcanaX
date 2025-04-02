export function getReadingTypeText(readingType: number, localeValue: string) {
  let readingText = '';

  switch (readingType) {
    case 1:
      readingText =
        localeValue === 'tr' ? 'Tek Kart Okuması' : 'Single Card Reading';
      break;
    case 3:
      readingText =
        localeValue === 'tr' ? 'Üç Kart Okuması' : 'Three Card Reading';
      break;
    case 10:
      readingText =
        localeValue === 'tr' ? 'Kelt Haçı Yöntemi' : 'Celtic Cross Method';
      break;
    case 6:
      readingText =
        localeValue === 'tr' ? 'İlişki Okuması' : 'Relationship Reading';
      break;
    default:
      return 'General Reading';
  }

  return readingText;
}
