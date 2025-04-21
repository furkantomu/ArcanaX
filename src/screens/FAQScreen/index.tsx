import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS} from '@/styles/theme';
import FAQAccordion from './components/FAQAccordion';
import {FAQ} from '@/utils/dummy';
import {getStyles} from './styles';
import {Button, CustomHeader, Typography} from '@/components';
import {useRefsContext} from '@/context';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';
import ContactModal from './components/ContactModal';

const FAQScreen = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const [isModalVisible, setModalVisible] = useState(false);
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
          <CustomHeader leftIcon={true} title={true} rightIcon={true} />
          <View style={styles.container}>
            <Typography style={styles.faqTitle}>
              {i18n.t('FAQ_TITLE', {locale: localeValue})}
            </Typography>
            {FAQ.map((question, idx) => (
              <FAQAccordion key={idx} index={idx} />
            ))}
            <Button handlePress={() => setModalVisible(true)}  text={i18n.t('CONTACT_BUTTON', {locale: localeValue})} variant="secondary" />
          </View>
          <ContactModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default FAQScreen;
