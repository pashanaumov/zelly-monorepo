import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from '@zelly/core/redux/storeWeb';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app';

export const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
