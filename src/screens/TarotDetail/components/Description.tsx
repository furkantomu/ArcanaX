import React from 'react';
import {View} from 'react-native';

import {Typography} from '@/components';
import {getStyles} from '../styles';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const Description = () => {
  const styles = getStyles();
  const {localeValue} = useAppSelector(state => state.settings);
  return (
    <View style={styles.descriptionContainer}>
      <View>
        <Typography size="heading" style={styles.title}>
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_ONE.SUB_TITLE', {locale: localeValue})}
        </Typography>
        <Typography size="large">
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_ONE.DESCRIPTION', {locale: localeValue})}
        </Typography>
        <Typography style={styles.margin}>
          <Typography style={styles.title}>
            {i18n.t('TAROT_DETAIL.FIRST.DETAIL_ONE.ITEM.TITLE', {locale: localeValue})}:{' '}
          </Typography>
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_ONE.ITEM.DESCRIPTION', {locale: localeValue})}
        </Typography>
        <Typography>
          <Typography style={styles.title}>
            {i18n.t('TAROT_DETAIL.FIRST.DETAIL_ONE.ITEM_TWO.TITLE', {locale: localeValue})}:{' '}
          </Typography>
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_ONE.ITEM_TWO.DESCRIPTION', {locale: localeValue})}
        </Typography>
      </View>
      <View>
        <Typography size="heading" style={styles.title}>
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_TWO.SUB_TITLE', {locale: localeValue})}:
        </Typography>
        <Typography size="large">
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_TWO.DESCRIPTION', {locale: localeValue})}:
        </Typography>
        <Typography style={styles.margin}>
          <Typography style={styles.title}>
            {i18n.t('TAROT_DETAIL.FIRST.DETAIL_TWO.ITEM.TITLE', {locale: localeValue})}:{' '}
          </Typography>
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_TWO.ITEM.DESCRIPTION', {locale: localeValue})}
        </Typography>
        <Typography>
          <Typography style={styles.title}>
            {i18n.t('TAROT_DETAIL.FIRST.DETAIL_TWO.ITEM_TWO.TITLE', {locale: localeValue})}
          </Typography>
          ,{i18n.t('TAROT_DETAIL.FIRST.DETAIL_TWO.ITEM_TWO.DESCRIPTION', {locale: localeValue})}
        </Typography>
      </View>

      <View>
        <Typography size="heading" style={styles.title}>
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_THREE.SUB_TITLE',{locale: localeValue})}
        </Typography>
        <Typography size="large">
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_THREE.DESCRIPTION', {locale: localeValue})}
        </Typography>
        <Typography style={[styles.title, styles.margin]}>
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_THREE.ITEM.TITLE', {locale: localeValue})}
        </Typography>
        <Typography style={styles.title}>
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_THREE.ITEM_TWO.TITLE', {locale: localeValue})}
        </Typography>
        <Typography style={styles.title}>
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_THREE.ITEM_THREE.TITLE', {locale: localeValue})}
        </Typography>
        <Typography style={styles.title}>
          {i18n.t('TAROT_DETAIL.FIRST.DETAIL_THREE.ITEM_FOUR.TITLE', {locale: localeValue})}
        </Typography>
      </View>
    </View>
  );
};

export default Description;
