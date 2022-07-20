import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { store, persistor } from '@zelly/core/redux/storeWeb';
import { queryClient } from '@zelly/core/queries/rootQueryClient';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';

export const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
