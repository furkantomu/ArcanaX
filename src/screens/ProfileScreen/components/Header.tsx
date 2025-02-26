import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {Icon, IconButton, Typography} from '@/components';

import {getZodiacSign} from '@/utils/getZodiacType';

import {COLORS} from '@/styles/theme';
import {getStyles} from '../styles';
import {useAppSelector} from '@/hooks';
import dayjs from 'dayjs';

const zodiacImages = {
  Aries: require('../../../../assets/zodiac/Aries.webp'),
  Taurus: require('../../../../assets/zodiac/Taurus.webp'),
  Gemini: require('../../../../assets/zodiac/Gemini.webp'),
  Cancer: require('../../../../assets/zodiac/Cancer.webp'),
  Leo: require('../../../../assets/zodiac/Leo.webp'),
  Virgo: require('../../../../assets/zodiac/Virgo.webp'),
  Libra: require('../../../../assets/zodiac/Libra.webp'),
  Scorpio: require('../../../../assets/zodiac/Scorpio.webp'),
  Sagittarius: require('../../../../assets/zodiac/Sagittarius.webp'),
  Capricorn: require('../../../../assets/zodiac/Capricorn.webp'),
  Aquarius: require('../../../../assets/zodiac/Aquarius.webp'),
  Pisces: require('../../../../assets/zodiac/Pisces.webp'),
};

const Header = () => {
  const [zodiac, setZodiac] = useState({engName: '', name: ''});
  const [zodiacImage, setZodiacImage] = useState(zodiacImages.Aries);
  const {user} = useAppSelector(state => state.auth);
  const styles = getStyles();
  const navigation = useNavigation();
  useEffect(() => {
    if (user !== null) {
      const day = dayjs(user.birthDate).format('DD');
      const month = dayjs(user.birthDate).format('MM');

      const zod = getZodiacSign(Number(day), Number(month));
      setZodiac(zod);
      setZodiacImage(zodiacImages[zod.engName]);
    }
  }, [user]);
  const handlePress = () => {
    navigation.navigate('ProfileUserScreen');
  };
  return (
    <View>
      <LinearGradient
        colors={[COLORS.black, COLORS.blackOpacity, COLORS.black]}
        style={styles.linearGradient}
      />
      <Image
          source={zodiacImage}
          style={[styles.ImageBackground]}
          resizeMode={'cover'}
        />
      <View style={styles.headerTextWrapper}>
        <Typography weight={'NotoSerifCondensedMediumItalic'} size={'heading'}>
          Profilim
        </Typography>
        <View style={styles.profileInfoSection}>
          <View style={styles.profileImage}>
            <Icon name={'user'} size={50} style={styles.profileIcon} />
          </View>
          <View style={styles.profileName}>
            <Typography weight="bold" size="heading">
              {user?.name}
            </Typography>
            <Typography weight="NotoSerifThin" size="large">
              {dayjs(user?.birthDate).format('DD MMMM YYYY')} - {zodiac.name}
            </Typography>
          </View>
          <View style={styles.profileEdit}>
            <IconButton
              iconName={'edit'}
              text=""
              iconSize={30}
              iconStyle={styles.editIcon}
              buttonStyle={styles.editButton}
              handlePress={handlePress}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
