import 'react-app-polyfill/stable';
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app/App";
import { Provider } from 'react-redux';
import { store, persistor } from '@zelly/core/redux/storeWeb';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
