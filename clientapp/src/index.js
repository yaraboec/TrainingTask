import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/store';
import ConnectApp from './components/connect.page';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
