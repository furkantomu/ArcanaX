import React, {useState} from 'react';
import ButtonType from './ButtonType';
import SectionCards from './SectionCards';
import TableOfContents from './TableOfContents';

interface SectionType {
  name: string;
  content: React.ReactNode;
}

const SECTIONS: SectionType[] = [
  {
    name: 'Tarot Okuma',
    content: <ButtonType type={'tarot'} />,
  },
  {
    name: 'Numeroloji Analizi',
    content: <ButtonType type={'numerology'} />,
  },
  {
    name: 'Rüya Tabiri',
    content: <ButtonType type={'dream'} />,
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
