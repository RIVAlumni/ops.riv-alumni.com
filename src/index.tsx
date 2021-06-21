import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import ReactDOM from 'react-dom';
import { StrictMode } from 'react';

import Modal from 'react-modal';
import { Provider } from 'react-redux';

import { Router } from './pages';
import { rootStore } from './services';

import * as serviceWorker from './serviceWorker';

import './styles/base.scss';

dayjs.extend(customParseFormat);
Modal.setAppElement('#root');

ReactDOM.render(
  <StrictMode>
    <Provider store={rootStore}>
      <Router />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
