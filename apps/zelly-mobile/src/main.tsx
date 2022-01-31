import React from 'react';
import { AppRegistry } from 'react-native';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from '@zelly/shared-ui-layout/redux/store';

const MainApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('main', () => MainApp);
