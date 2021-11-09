import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './header.auth';
import useRoutes from '../router';
import useAuth from '../hooks/auth.hook';
import AuthService from '../services/auth.service';

const ConnectApp = () => {
  const {
    login, logout, token, isAlready,
  } = useAuth();
  const isLoggedIn = !!token;
  const routes = useRoutes(isLoggedIn);

  return (
    <AuthService.Provider value={{
      login, logout, token, isAlready, isLoggedIn,
    }}
    >
      <BrowserRouter>
        <Header />
        {routes}
      </BrowserRouter>
    </AuthService.Provider>
  );
};

export default ConnectApp;
