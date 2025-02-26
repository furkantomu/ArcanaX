import React, { useEffect } from 'react';
import {ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS} from '@/styles/theme';
import FAQAccordion from './components/FAQAccordion';
import {FAQ} from '@/utils/dummy';
import {getStyles} from './styles';
import {Button, CustomHeader, Typography} from '@/components';
import {useRefsContext} from '@/context';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const FAQScreen = () => {
  const styles = getStyles();
  const {FaqSectionScrollViewRef} = useRefsContext();
  const navigation = useNavigation();


    useEffect(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {display: 'none'},
      });
  
      return () =>
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            backgroundColor: '#f5f5dc4f',
            position: 'absolute',
            marginHorizontal: 30,
            marginBottom: 20,
            borderTopWidth: 0,
            height: 50,
            borderBottomWidth: 0,
            borderRadius: 50,
            elevation: 0,
          },
        });
    }, [navigation]);

  return (
    <LinearGradient colors={[COLORS.black, '#3F2305']} style={{flex: 1}}>
      <ScrollView
        ref={FaqSectionScrollViewRef}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView>
        <CustomHeader leftIcon={true} title={true} rightIcon={false} />
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
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default FAQScreen;
