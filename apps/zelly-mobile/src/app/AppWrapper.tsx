import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from '@zelly/core/redux/storeNative';
// import { queryClient } from '@zelly/core/queries/rootQueryClient.native';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App';

const queryClient = new QueryClient();

export const AppWrapper = () => (
  <>
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
    <Toast />
  </>
);
