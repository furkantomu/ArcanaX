import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { trackGlobalErrors } from 'reactotron-react-native';

const reactotron = Reactotron
  .configure() // Reactotron yapılandırması
  .useReactNative() // React Native eklentilerini ekle
  .use(reactotronRedux()) // Redux takibi için
  .use(trackGlobalErrors()) // Bellek sızıntıları ve hataları izlemek için
  .connect(); // Bağlantıyı başlat

export default reactotron;
