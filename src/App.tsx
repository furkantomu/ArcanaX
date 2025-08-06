/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AppNavigator} from '@/navigation';
import {persistor, store} from '@/store';
import {ErrorBoundary} from '@/components';
import {RatingProvider} from '@/context';

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RatingProvider>
            <AppNavigator />
          </RatingProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
