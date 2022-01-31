import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '@zelly/shared-ui-layout/redux/store';

import App from './app/app';

const MainApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
  document.getElementById('root')
);
