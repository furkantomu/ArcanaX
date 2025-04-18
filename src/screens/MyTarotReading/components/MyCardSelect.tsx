import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {useMyTarotReadingContext} from '../MyTarotReadingContext';
import {COLORS, SIZES} from '@/styles/theme';
import {Button, Icon, Typography} from '@/components';
import {useAppSelector} from '@/hooks';
import {useRefsContext} from '@/context';

const MyCardSelect = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const {tarotCards, selectedCards, handleRemoveCard, handleSelectCard} =
    useMyTarotReadingContext();
  const [searchText, setSearchText] = useState('');

  const {myTarotSheetRef} = useRefsContext();

  const filteredCards = tarotCards.filter(
    card =>
      card.name.toLowerCase().includes(searchText.toLowerCase()) ||
      card.engName.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.selectedContainer}>
        {selectedCards.length > 0 && (
          <Typography style={styles.selectedTitle}>
            {localeValue === 'tr' ? 'Seçilen Kartlar:' : 'Selected Cards:'}{' '}
            {selectedCards.length}/5
          </Typography>
        )}

        <View style={styles.selectedList}>
          {selectedCards.map((card, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRemoveCard(card)}>
              {localeValue === 'tr' ? (
                <Typography style={styles.selectedCard}>
                  {card.name} x
                </Typography>
              ) : (
                <Typography style={styles.selectedCard}>
                  {card.engName} x
                </Typography>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.searchInputWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder={
            localeValue === 'tr'
              ? 'Kartları ara... (örneğin: Kupa Onlusu)'
              : 'Search cards... (e.g., Six Wands)'
          }
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText !== '' && (
          <Pressable onPress={() => setSearchText('')} style={styles.clearBtn}>
            <Icon name="delete" size={34} style={styles.clearBtnIcon} />
          </Pressable>
        )}
      </View>
      {selectedCards.length > 0 && (
        <Button
          text={localeValue === 'tr' ? 'Onayla' : 'Confirm'}
          variant="secondary"
          buttonStyle={{marginBottom: 10}}
          handlePress={() => myTarotSheetRef.current?.scrollTo(0)}
        />
      )}

      <FlatList
        data={filteredCards}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            onPress={() => handleSelectCard(item)}
            style={[
              styles.cardItem,

              {
                backgroundColor: selectedCards.some(c => c.id === item.id)
                  ? COLORS.green
                  : COLORS.black,
              },
            ]}>
            {localeValue === 'tr' ? (
              <Typography style={styles.cardText}>{item.name}</Typography>
            ) : (
              <Typography style={styles.cardText}>{item.engName}</Typography>
            )}
            {selectedCards.some(c => c.id === item.id) && (
              <Typography style={styles.cardText}>X</Typography>
            )}
          </Pressable>
        )}
        removeClippedSubviews={true} // render dışındakileri kes
        windowSize={5} // belki 7'ye çıkarılabilir (yüksek çözünürlük cihazlarda)
        initialNumToRender={3} // 5 çok olabilir, 3 idealdir
        maxToRenderPerBatch={3} // aynı şekilde batch’leri küçült
        updateCellsBatchingPeriod={150} // render arası bekleme süresi (ms)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZES.height / 1.2,
    padding: 20,
    paddingBottom: 100,
  },
  searchInput: {
    height: 48,
    backgroundColor: COLORS.darkGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#fff',
    marginBottom: 16,
  },
  cardItem: {
    height: 50,
    borderBottomColor: COLORS.darkGray,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems:'center',
  },
  cardText: {},
  selectedContainer: {
    marginBottom: 16,
  },
  selectedTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  searchInputWrapper: {},
  clearBtnIcon: {
    tintColor: COLORS.cream,
    width: 50,
  },
  clearBtn: {
    position: 'absolute',
    top: 6,
    right: 5,
  },
  selectedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  selectedCard: {
    backgroundColor: COLORS.darkGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
});

export default MyCardSelect;
