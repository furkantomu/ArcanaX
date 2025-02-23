import React from 'react';
import {View} from 'react-native';

import {Typography} from '@/components';
import {getStyles} from '../styles';

const Description = () => {
  const styles = getStyles();
  return (
    <View style={styles.descriptionContainer}>
      <View>
        <Typography size="heading" style={styles.title}>
          1. Tarot Kartlarını Tanımak
        </Typography>
        <Typography size="large">
          Öncelikle Tarot kartlarının yapısını anlamanız çok önemli. Tarot,
          genellikle 78 karttan oluşur. Bunlar, Büyük Arkana (22 kart) ve Küçük
          Arkana (56 kart) olarak iki gruba ayrılır.{' '}
        </Typography>
        <Typography style={styles.margin}>
          <Typography style={styles.title}>Büyük Arkana:</Typography> Yaşamın
          ana temalarına, büyük değişimlere, ruhsal büyümeye ve hayattaki önemli
          yolculuklara işaret eder. Örneğin, The Fool (Deli), The Lovers
          (Aşıklar), Death (Ölüm) gibi kartlar.
        </Typography>
        <Typography>
          <Typography style={styles.title}>Küçük Arkana:</Typography> Günlük
          yaşamda karşılaştığımız durumları, hisleri ve küçük değişimleri
          anlatır. Bunlar dört takıma ayrılır: Kupa, Kılıç, Tılsım ve Asalar.
          Her biri farklı bir yaşam alanını simgeler (duygular, düşünceler,
          maddi durumlar ve eylemler).
        </Typography>
      </View>
      <View>
        <Typography size="heading" style={styles.title}>
          2. Sezgiyi Geliştirmek
        </Typography>
        <Typography size="large">
          Tarot'un ana gücü sezgide ve içsel bilgide yatar. Her bir kartın
          doğrudan anlamına bakmanın ötesine geçmek, semboller ve imgeler
          üzerinden sezgisel okuma yapmak önemlidir. Bu, kartları ne şekilde
          gördüğünüzle ilgilidir. Bazı okurlar kartları çok analitik bir şekilde
          okur, bazıları ise tamamen sezgisel olarak, doğrudan iç seslerini
          dinleyerek okurlar.
        </Typography>
        <Typography style={styles.margin}>
          <Typography style={styles.title}> Meditasyon yapın</Typography>, sakin
          bir ortamda oturun ve kartları elinizde tutarak içsel sesinizi
          dinlemeye çalışın.
        </Typography>
        <Typography>
          <Typography style={styles.title}>
            Kartları düzenli olarak gözden geçirin
          </Typography>
          , her gün birkaç dakika kartları inceleyerek ne hissettiğinizi yazın.
        </Typography>
      </View>

      <View>
        <Typography size="heading" style={styles.title}>
          3. Kartların Temel Anlamlarını Öğrenmek
        </Typography>
        <Typography size="large">
          Başlangıçta, her kartın geleneksel anlamlarını öğrenmek iyi bir temel
          oluşturur. Bununla birlikte, zamanla bu anlamlar esnekleşecek ve sizin
          kişisel sezgilerinize göre şekillenecektir. Kartlar hakkında bilgi
          edinmek için yukardaki menüden tüm kartları görebilirsiniz. Ayrıca,
          her kart için özel bir anlam defteri tutmak faydalı olabilir.
        </Typography>
        <Typography size="large">
          Her kartın anlamını yorumlarken şu soruları sorabilirsiniz:
        </Typography>
        <Typography style={[styles.title, styles.margin]}>
          Bu kart neyi simgeliyor?
        </Typography>
        <Typography style={styles.title}>Bunun zamanlaması nedir?</Typography>
        <Typography style={styles.title}>
          Bu kart bana hangi duyguyu getiriyor?
        </Typography>
        <Typography style={styles.title}>
          Kartlar arasında bir desen veya tema var mı?
        </Typography>
      </View>
    </View>
  );
};

export default Description;
