import { queryClient } from '@zelly/core/queries/rootQueryClient';
import { persistor, store } from '@zelly/core/redux/storeWeb';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';

export const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <ToastContainer />
    </PersistGate>
  </Provider>
);
