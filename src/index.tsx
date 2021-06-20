import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import ReactDOM from 'react-dom';
import { StrictMode } from 'react';

import { analytics, initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/firestore';

import Modal from 'react-modal';
import { Provider } from 'react-redux';

import { Router } from './pages';
import { rootStore } from './services';
import { STORAGE_BUCKETS } from './constants';

import * as serviceWorker from './serviceWorker';

import firebaseConfig from './configs/firebase.json';
import eventStorageConfig from './configs/storage.json';

import './styles/base.scss';

const first = initializeApp(firebaseConfig);
const second = initializeApp(eventStorageConfig, STORAGE_BUCKETS.Events);

analytics();
console.log(first);
console.log(second);

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
