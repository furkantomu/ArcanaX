/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */



import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigator } from '@/navigation';
import { persistor, store } from '@/store';



//const SCREEN_HEIGHT = Dimensions.get('window').height;
function App(): React.JSX.Element {



  // const openModal = () => {
  //   ref.current?.scrollTo(-SCREEN_HEIGHT / 1.2);
  // };
  // const closeModal = () => {
  //   ref.current?.scrollTo(0);
  // };
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppNavigator />
    </PersistGate>
  </Provider>
  );
}


export default App;
