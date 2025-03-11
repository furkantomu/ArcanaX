import React, {useState} from 'react';
import ButtonType from './ButtonType';
import SectionCards from './SectionCards';
import TableOfContents from './TableOfContents';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

interface SectionType {
  name: string;
  content: React.ReactNode;
}


interface CollapsibleMenuProps {}
const CollapsibleMenu: React.FC<CollapsibleMenuProps> = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);


const SECTIONS: SectionType[] = [
  {
    name: i18n.t('SAVE_HISTORY.TAROT_SPREAD', {locale:localeValue}),
    content: <ButtonType type={'tarot'} />,
  },
  {
    name: i18n.t('SAVE_HISTORY.NUMEROLOGY', {locale:localeValue}),
    content: <ButtonType type={'numerology'} />,
  },
  {
    name: i18n.t('SAVE_HISTORY.DREAM', {locale:localeValue}),
    content: <ButtonType type={'dream'} />,
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
