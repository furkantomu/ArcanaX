import React from 'react';
import {ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS} from '@/styles/theme';
import FAQAccordion from './components/FAQAccordion';
import {FAQ} from '@/utils/dummy';
import {getStyles} from './styles';
import {Button, Typography} from '@/components';
import {useRefsContext} from '@/context';

const FAQScreen = () => {
  const styles = getStyles();
  const {FaqSectionScrollViewRef} = useRefsContext();

  return (
    <LinearGradient colors={[COLORS.black, '#3F2305']} style={{flex: 1}}>
      <ScrollView
        ref={FaqSectionScrollViewRef}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Typography style={styles.faqTitle}>
            Sıkça Sorulan Sorular (FAQ) bölümü, uygulamamızı kullanırken merak
            edebileceğiniz konulara hızlı yanıtlar sunar. Tarot, numeroloji,
            rüya tabiri ve üyelik işlemleriyle ilgili detayları burada
            bulabilirsiniz. Daha fazla bilgi için destek ekibimizle iletişime
            geçebilirsiniz!
          </Typography>
          {FAQ.map((question, idx) => (
            <FAQAccordion
              key={idx}
              title={question.title}
              content={question.content}
            />
          ))}
          <Button text="İletişime Geç" variant="secondary" />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default FAQScreen;
