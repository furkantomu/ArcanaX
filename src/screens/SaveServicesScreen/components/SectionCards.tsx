import React from 'react';
import {
  View,
  ListRenderItemInfo,
  FlatList,
} from 'react-native';
import {getStyles} from '../styles';

interface SectionType {
  name: string;
  content: React.ReactNode;
}

interface SectionCardsProps {
  sections: SectionType[]; // Bölüm verisi dizisi
  visibleIndex: number; // Görüntülenen bölümün indeksi
}

const SectionCards: React.FC<SectionCardsProps> = ({
  sections,
  visibleIndex,
}) => {
  const styles = getStyles();

  const renderItem = ({item, index}: ListRenderItemInfo<SectionType>) => {
    return (
      <View style={styles.collapsibleMenuContent}>
        {visibleIndex === index && <>{item.content}</>}
      </View>
    );
  };

  return (
    <FlatList
      renderItem={renderItem}
      data={sections}
      extraData={visibleIndex}
    />
  );
};

export default SectionCards;
