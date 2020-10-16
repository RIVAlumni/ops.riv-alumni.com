import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { rootStore, FirebaseService } from './services';

import * as serviceWorker from './serviceWorker';

FirebaseService.getInstance().sayHello();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <h1>Hello World</h1>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
