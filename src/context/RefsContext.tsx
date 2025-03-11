import React, {useRef} from 'react';
import {ScrollView} from 'react-native';

import {BottomSheetRefProps} from '@/types';

interface RefsContextType {
  selectCardSheetRef: React.RefObject<BottomSheetRefProps>;
  detailCardSheetRef: React.RefObject<BottomSheetRefProps>;
  tarotSpreadScrollViewRef: React.RefObject<ScrollView>;
  lifePathAccordionScrollViewRef: React.RefObject<ScrollView>;
  uploadTypeSheetRef: React.RefObject<BottomSheetRefProps>;
  purchasingSheetRef: React.RefObject<BottomSheetRefProps>;
  FaqSectionScrollViewRef: React.RefObject<ScrollView>;

  saveTarotSheetRef: React.RefObject<BottomSheetRefProps>;
  saveNumerologySheetRef: React.RefObject<BottomSheetRefProps>;
  saveDreamSheetRef: React.RefObject<BottomSheetRefProps>;
  languageChangeSheetRef: React.RefObject<BottomSheetRefProps>;
}

const RefsContext = React.createContext<RefsContextType | undefined>(undefined);

const useRefsContext = (): RefsContextType => {
  const context = React.useContext(RefsContext);
  if (!context) {
    throw new Error(
      'useRefsContext: `RefsContext` is undefined. Seems you forgot to wrap component within the CalendarProvider',
    );
  }

  return context;
};

const RefsProvider: React.FC<
  Partial<RefsContextType & {children: React.ReactNode}>
> = props => {
  const selectCardSheetRef = useRef<BottomSheetRefProps>(null);
  const detailCardSheetRef = useRef<BottomSheetRefProps>(null);
  const tarotSpreadScrollViewRef = useRef<ScrollView>(null);
  const lifePathAccordionScrollViewRef = useRef<ScrollView>(null);
  const uploadTypeSheetRef = useRef<BottomSheetRefProps>(null);
  const purchasingSheetRef = useRef<BottomSheetRefProps>(null);
  const FaqSectionScrollViewRef = useRef<ScrollView>(null);
  const saveTarotSheetRef = useRef<BottomSheetRefProps>(null);
  const saveNumerologySheetRef = useRef<BottomSheetRefProps>(null);
  const saveDreamSheetRef = useRef<BottomSheetRefProps>(null);
  const languageChangeSheetRef = useRef<BottomSheetRefProps>(null);
  const {children} = props;

  const contextRefValues = {
    selectCardSheetRef,
    detailCardSheetRef,
    tarotSpreadScrollViewRef,
    lifePathAccordionScrollViewRef,
    uploadTypeSheetRef,
    purchasingSheetRef,
    FaqSectionScrollViewRef,
    saveTarotSheetRef,
    saveNumerologySheetRef,
    saveDreamSheetRef,
    languageChangeSheetRef,
  };

  return (
    <RefsContext.Provider value={contextRefValues}>
      {children}
    </RefsContext.Provider>
  );
};

export {RefsProvider, useRefsContext};
