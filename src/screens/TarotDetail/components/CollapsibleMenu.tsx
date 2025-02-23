import React, {useState} from 'react';

import Card from './Card';
import Description from './Description';

import SectionCards from './SectionCards';

import TableOfContents from './TableOfContents';

// Bölüm verisinin tipini tanımlıyoruz
interface SectionType {
  name: string;
  content: React.ReactNode; // content, JSX öğesi veya metin olabilir
}

const SECTIONS: SectionType[] = [
  {
    name: 'Açıklama',
    content: <Description/>,
  },
  {
    name: 'Major Arcana',
    content: <Card type={'major'} />,
  },
  {
    name: 'Kupa (Cup)',
    content: <Card type={'cups'} />,
  },
  {
    name: 'Tılsım (Pentacle)',
    content: <Card type={'pentacles'} />,
  },
  {
    name: 'Kılıç (Sword)',
    content: <Card type={'swords'} />,
  },
  {
    name: 'Asa (Wand)',
    content: <Card type={'wands'} />,
  },
];

interface CollapsibleMenuProps {}
const CollapsibleMenu: React.FC<CollapsibleMenuProps> = () => {
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
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
