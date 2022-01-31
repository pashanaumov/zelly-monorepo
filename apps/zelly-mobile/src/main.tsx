import React from 'react';
import { AppRegistry } from 'react-native';
import App from './app/App';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from '@zelly/core/redux/storeNative';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

const MainApp = () => (
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

AppRegistry.registerComponent('main', () => MainApp);
