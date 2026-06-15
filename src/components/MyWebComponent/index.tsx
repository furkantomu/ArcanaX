import React, {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Typography from '../Typography/Typography';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';
import {COLORS} from '@/styles/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '../Button/Button';

const {width, height} = Dimensions.get('window'); // Ekran boyutlarını alıyoruz

const MyWebComponent = ({uri}: {uri: string}) => {
  const [modalVisible, setModalVisible] = useState(false); // Modal görünürlük durumu
  const {localeValue} = useAppSelector(state => state.settings);
  const toggleModal = () => {
    setModalVisible(!modalVisible); // Modal'ı açıp kapama
  };

  const LoadingView = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleModal}>
        <Typography weight="bold" style={styles.privacy}>
          {i18n.t('ADD_BALANCE_SHEET.PRIVACY', {locale: localeValue})}
        </Typography>
      </Pressable>
      {/* Modal içinde WebView */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={false}
        onRequestClose={toggleModal}>
        <SafeAreaView style={styles.modalContainer}>
          <WebView
            source={{uri}}
            style={{width, height}}
            startInLoadingState={true}
            renderLoading={LoadingView}
          />
          <Button
            text={localeValue === 'tr' ? 'Kapat' : 'Close'}
            handlePress={toggleModal}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingBottom: 0,
    paddingHorizontal: 5,
  },
  privacy: {
    color: COLORS.silverGray,
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.silverGray,
    paddingVertical: 5,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
});

export default MyWebComponent;
