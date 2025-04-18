import {Button, Icon, IconButton, Typography} from '@/components';
import {useRefsContext} from '@/context';
import {useAppSelector} from '@/hooks';
import i18n from '@/i18n';
import {COLORS, SIZES} from '@/styles/theme';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import {useMyTarotReadingContext} from '../MyTarotReadingContext';
import { useNavigation } from '@react-navigation/native';

const InfoCardsScreen = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const {myTarotSheetRef} = useRefsContext();
  const {selectedCards} = useMyTarotReadingContext();

  const card1Anim = useRef(new Animated.Value(0)).current;
  const card2Anim = useRef(new Animated.Value(0)).current;
  const card3Anim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.stagger(300, [
      Animated.spring(card1Anim, {
        toValue: 1,
        useNativeDriver: true,
        delay: 300,
      }),
      Animated.spring(card2Anim, {
        toValue: 1,
        useNativeDriver: true,
        delay: 400,
      }),
      Animated.spring(card3Anim, {
        toValue: 1,
        useNativeDriver: true,
        delay: 500,
      }),
    ]).start();
  }, []);

  const animatedCardStyle = (animation: any) => ({
    opacity: animation,
  });
  const openModal = () => {
    myTarotSheetRef.current?.scrollTo(-SIZES.height / 1.2);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.infoCardSelectContainer}>
          <Typography>
            {localeValue === 'tr' ? 'Seçilen Kart:' : 'Selected Card'}{' '}
            {selectedCards.length}/5
          </Typography>
          <Typography>
            {localeValue === 'tr'
              ? 'Kartı seçmek için sağa kaydır.'
              : 'Swipe right to select the card.'}
          </Typography>
        </View>
        <View style={styles.infoContainer}>
          <IconButton
            text={localeValue === 'tr' ? 'Okuma Kılavuzu' : 'Reading Guide'}
            iconName="info"
            iconSize={30}
            iconStyle={styles.icon}
            buttonStyle={styles.infoBtn}
            textStyle={styles.buttonText}
            handlePress={() => setModalVisible(true)}
          />
          <IconButton
            text={
              localeValue === 'tr'
                ? 'Kendi Desteni Kullan'
                : 'Use Your Own Deck'
            }
            iconName="tarot"
            iconSize={30}
            iconStyle={styles.icon}
            buttonStyle={styles.infoBtn}
            textStyle={styles.buttonText}
            handlePress={() => openModal()}
          />
          <Button
            text={localeValue === 'tr' ? 'Devam' : 'Continue'}
            textStyle={styles.buttonText}
            variant="secondary"
            disabled={selectedCards.length === 0}
            handlePress={() => navigation.navigate('MyTarotAnalysis', {selectedCards})}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Animated.View style={[styles.card, animatedCardStyle(card1Anim)]}>
              <Typography size="large" style={styles.cardText}>
                {i18n.t('MY_TAROT.card1', {locale: localeValue})}
              </Typography>
            </Animated.View>

            <Animated.View style={[styles.card, animatedCardStyle(card2Anim)]}>
              <Typography size="large" style={styles.cardText}>
                {i18n.t('MY_TAROT.card2', {locale: localeValue})}
              </Typography>
            </Animated.View>

            <Animated.View style={[styles.card, animatedCardStyle(card3Anim)]}>
              <Typography size="large" style={styles.cardText}>
                {i18n.t('MY_TAROT.card3', {locale: localeValue})}
              </Typography>
            </Animated.View>
            <Button
              handlePress={() => setModalVisible(!modalVisible)}
              text={localeValue === 'tr' ? "Kapat" : "Close"}
              variant="secondary"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  infoCardSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 100,

    padding: 10,
    borderRadius: 10,
  },

  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20,
  },
  icon: {
    resizeMode: 'cover',
    tintColor: COLORS.cream,
  },
  infoBtn: {
    backgroundColor: COLORS.blackOpacity1,
  },
  scrollContainer: {},
  card: {
    width: '100%',
    backgroundColor: '#27200a4b',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#f1f1f171',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#E0E0E0',
    textAlign: 'center',
    fontWeight: '400',
  },
  buttonText: {
    color: COLORS.cream,
    fontSize: SIZES.body2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.darkGray,
    borderRadius: 20,
    padding: 35,

    elevation: 5,
  },
});

export default InfoCardsScreen;
