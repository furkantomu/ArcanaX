import { View } from 'react-native';
import React from 'react';
import { Typography } from '@/components';
import { getStyles } from '../styles';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const Content = () => {
    const {localeValue} = useAppSelector(state => state.settings);
    const styles = getStyles();
    return (
        <View style={styles.content}>
            <Typography size={'large'} style={styles.contentText}>
               {i18n.t('DREAM_SCREEN.DESCRIPTION', {locale: localeValue})}
            </Typography>
        </View>
    );
};

export default Content;
