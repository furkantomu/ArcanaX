import React, {useState} from 'react';

import Card from './Card';
import Description from './Description';

import SectionCards from './SectionCards';

import TableOfContents from './TableOfContents';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';

// Bölüm verisinin tipini tanımlıyoruz
interface SectionType {
  name: string;
  content: React.ReactNode; // content, JSX öğesi veya metin olabilir
}

interface CollapsibleMenuProps {}
const CollapsibleMenu: React.FC<CollapsibleMenuProps> = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);

  const SECTIONS: SectionType[] = [
    {
      name: i18n.t('TAROT_DETAIL.FIRST.TITLE', {locale: localeValue}),
      content: <Description />,
    },
    {
      name: i18n.t('TAROT_DETAIL.SECOND.TITLE', {locale: localeValue}),
      content: <Card type={'major'} />,
    },
    {
      name: i18n.t('TAROT_DETAIL.THIRD.TITLE', {locale: localeValue}),
      content: <Card type={'cups'} />,
    },
    {
      name: i18n.t('TAROT_DETAIL.FOUR.TITLE', {locale: localeValue}),
      content: <Card type={'pentacles'} />,
    },
    {
      name: i18n.t('TAROT_DETAIL.FIVE.TITLE', {locale: localeValue}),

      content: <Card type={'swords'} />,
    },
    {
      name: i18n.t('TAROT_DETAIL.SIX.TITLE', {locale: localeValue}),
      content: <Card type={'wands'} />,
    },
  ];
  const sectionNames = SECTIONS.map(s => s.name);

  const toggleSection = (index: number) => {
    setVisibleIndex(prevIndex => (prevIndex === index ? prevIndex : index));
  };
  return (
    <>
      <TableOfContents
        data={sectionNames}
        visibleIndex={visibleIndex}
        toggleSection={toggleSection}
      />
      <SectionCards sections={SECTIONS} visibleIndex={visibleIndex} />
    </>
  );
};

export default CollapsibleMenu;
