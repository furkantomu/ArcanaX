import { View } from 'react-native';
import React from 'react';
import { Typography } from '@/components';
import { getStyles } from '../styles';

const Content = () => {
    const styles = getStyles();
    return (
        <View style={styles.content}>
            <Typography size={'large'} style={styles.contentText}>
                "Rüyalar, bilinçaltımızın derinliklerinden gelen mesajlardır.
                Yüzyıllardır insanlar, gördükleri rüyaların anlamlarını çözmeye çalışmış
                ve çeşitli tabirler geliştirmiştir. Rüyalar bazen kişisel duygularımızı,
                endişelerimizi ya da geleceğe dair ipuçlarını yansıtır. Hangi tür rüyayı
                görmüş olursanız olun, her birinin bir anlamı vardır. Şimdi rüyanızı
                yazın ve anlamını öğrenin!"
            </Typography>
        </View>
    );
};

export default Content;
