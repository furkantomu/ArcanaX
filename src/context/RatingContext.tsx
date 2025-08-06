import React, {createContext, useContext, ReactNode, useState} from 'react';

interface RatingContextType {
  showRatingModal: boolean;
  setShowRatingModal: (show: boolean) => void;
  triggerRatingModal: () => void;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

interface RatingProviderProps {
  children: ReactNode;
}

export const RatingProvider: React.FC<RatingProviderProps> = ({children}) => {
  const [showRatingModal, setShowRatingModal] = useState(false);

  const triggerRatingModal = () => {
    setShowRatingModal(true);
  };

  const value = {
    showRatingModal,
    setShowRatingModal,
    triggerRatingModal,
  };

  return (
    <RatingContext.Provider value={value}>{children}</RatingContext.Provider>
  );
};

export const useRatingContext = (): RatingContextType => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error('useRatingContext must be used within a RatingProvider');
  }
  return context;
};