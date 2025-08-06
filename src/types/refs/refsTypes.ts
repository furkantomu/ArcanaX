export type BottomSheetRefProps = {
  scrollTo: (destination: number, callback?: () => void) => void;
  scrollToIndex: (index: number, callback?: () => void) => void;
  close: (callback?: () => void) => void;
};
