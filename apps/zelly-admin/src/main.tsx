import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { store } from '@zelly/core/redux/storeWeb';
import 'core-js';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppWrapper } from './app/AppWrapper';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>,
  document.getElementById('root')
);
