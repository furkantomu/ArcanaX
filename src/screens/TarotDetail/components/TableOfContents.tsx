import {COLORS} from '@/styles/theme';
import React from 'react';
import {View, Pressable} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {getStyles} from '../styles';

// TableOfContentsElement component props types
interface TableOfContentsElementProps {
  item: string;
  index: number;
  visibleIndex: number;
  toggleSection: (index: number) => void;
}

const TableOfContentsElement: React.FC<TableOfContentsElementProps> = ({
  item,
  index,
  visibleIndex,
  toggleSection,
}) => {
  const styles = getStyles();

  const style = useAnimatedStyle(() => ({
    color: visibleIndex === index ? COLORS.gold : COLORS.cream,
  }));

  return (
    <Pressable
      onPress={() => toggleSection(index)}
      style={styles.collapsibleMenuItem}>
      <Animated.Text style={[style, styles.collapsibleMenuItemText]}>
        {item}
      </Animated.Text>
    </Pressable>
  );
};

// TableOfContents component props types
interface TableOfContentsProps {
  data: string[];
  visibleIndex: number;
  toggleSection: (index: number) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  data,
  visibleIndex,
  toggleSection,
}) => {
  const styles = getStyles();
  return (
    <View>
      <Animated.FlatList
        horizontal
        contentContainerStyle={styles.collapsibleMenu}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TableOfContentsElement
            item={item}
            visibleIndex={visibleIndex}
            index={index}
            toggleSection={toggleSection}
          />
        )}
        data={data}
      />
    </View>
  );
};

export default TableOfContents;
