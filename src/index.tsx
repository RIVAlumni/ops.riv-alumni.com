/**
 * Why Did You Render needs to be called before any other component.
 */
import './wdyr';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import Modal from 'react-modal';
import { Provider } from 'react-redux';

import { Router } from './pages';
import { rootStore } from './services';

import * as serviceWorker from './serviceWorker';

import './styles/base.scss';

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
