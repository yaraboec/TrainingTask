import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import store from './store/store';
import Header from './components/header.auth';
import AuthPage from './components/auth.page';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <AuthPage />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
