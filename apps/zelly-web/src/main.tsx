import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { AppWrapper } from './app/AppWrapper';

ReactDOM.render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
  document.getElementById('root')
);
