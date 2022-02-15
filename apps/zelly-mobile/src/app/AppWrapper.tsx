import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from '@zelly/core/redux/storeNative';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App';

export const AppWrapper = () => (
  <>
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <App />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
    <Toast />
  </>
);
