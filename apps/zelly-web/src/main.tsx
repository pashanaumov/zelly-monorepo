import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from '@zelly/core/redux/storeWeb';
import { PersistGate } from 'redux-persist/integration/react';

import App from './app/app';

const MainApp = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
  document.getElementById('root')
);
