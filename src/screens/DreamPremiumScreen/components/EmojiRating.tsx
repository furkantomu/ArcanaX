import { COLORS } from '@/styles/theme';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import { useDreamContext } from '../DreamScreenContext';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const emojiOptions = ['😞', '😐', '😊', '😁', '😍']; // 1-5 değerlendirme

const EmojiRating = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const {setRating, rating, setComment, comment} = useDreamContext();


  return (
    <View style={{alignItems: 'center', padding: 20}}>
      <Text style={{fontSize: 18, marginBottom: 10}}>{i18n.t('RATING.TITLE', {locale: localeValue})}</Text>
      <View style={{flexDirection: 'row'}}>
        {emojiOptions.map((emoji, index) => (
          <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
            <Text
              style={{
                fontSize: 32,
                marginHorizontal: 5,
                opacity: rating === index + 1 ? 1 : 0.5,
              }}>
              {emoji}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        placeholder={i18n.t('RATING.PLACEHOLDER', {locale: localeValue})}
        placeholderTextColor={COLORS.darkGray}
        multiline
        style={{
          width: '100%',
          minHeight: 80,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          textAlignVertical: 'top',
          marginBottom: 10,
          marginTop: 10,

        }}
        value={comment}
        onChangeText={text => setComment(text)}
      />
    </View>
  );
};

export default EmojiRating;
