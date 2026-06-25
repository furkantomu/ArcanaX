import React, {useRef, useMemo} from 'react';
import {ScrollView} from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {BottomSheetRefProps} from '@/types';

interface RefsContextType {
  selectCardSheetRef: React.RefObject<BottomSheetModal>;
  detailCardSheetRef: React.RefObject<BottomSheetModal>;
  tarotSpreadScrollViewRef: React.RefObject<ScrollView>;
  lifePathAccordionScrollViewRef: React.RefObject<ScrollView>;
  uploadTypeSheetRef: React.RefObject<BottomSheetModal>;

  FaqSectionScrollViewRef: React.RefObject<ScrollView>;

  saveTarotSheetRef: React.RefObject<BottomSheetModal>;
  saveNumerologySheetRef: React.RefObject<BottomSheetModal>;
  saveDreamSheetRef: React.RefObject<BottomSheetModal>;
  languageChangeSheetRef: React.RefObject<BottomSheetModal>;
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
  const selectCardSheetRef = useRef<BottomSheetModal>(null);
  const detailCardSheetRef = useRef<BottomSheetModal>(null);
  const tarotSpreadScrollViewRef = useRef<ScrollView>(null);
  const lifePathAccordionScrollViewRef = useRef<ScrollView>(null);
  const uploadTypeSheetRef = useRef<BottomSheetModal>(null);
  const FaqSectionScrollViewRef = useRef<ScrollView>(null);
  const saveTarotSheetRef = useRef<BottomSheetModal>(null);
  const saveNumerologySheetRef = useRef<BottomSheetModal>(null);
  const saveDreamSheetRef = useRef<BottomSheetModal>(null);
  const languageChangeSheetRef = useRef<BottomSheetModal>(null);
  const {children} = props;

  const contextRefValues = useMemo(() => ({
    selectCardSheetRef,
    detailCardSheetRef,
    tarotSpreadScrollViewRef,
    lifePathAccordionScrollViewRef,
    uploadTypeSheetRef,
    FaqSectionScrollViewRef,
    saveTarotSheetRef,
    saveNumerologySheetRef,
    saveDreamSheetRef,
    languageChangeSheetRef,
  }), []);

  return (
    <RefsContext.Provider value={contextRefValues}>
      {children}
    </RefsContext.Provider>
  );
};

export {RefsProvider, useRefsContext};
