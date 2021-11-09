import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './header.auth';
import useRoutes from '../router';
import useAuth from '../hooks/auth.hook';

const ConnectApp = () => {
  const {
    login, logout, token, isAlready,
  } = useAuth();
  const isLoggedIn = !!token;
  const routes = useRoutes(isLoggedIn);

  return (
    <Provider value={{
      login, logout, token, isAlready, isLoggedIn,
    }}
    >
      <BrowserRouter>
        <Header />
        {routes}
      </BrowserRouter>
    </Provider>
  );
};

export default ConnectApp;
