import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import Header from './header.auth';
import useRoutes from '../router';
import useAuth from '../hooks/auth.hook';
import AuthService from '../services/auth.service';

const ConnectApp = () => {
  const {
    login, logout, token, idUser, isAlready,
  } = useAuth();
  const isLoggedIn = !!token;
  const routes = useRoutes(isLoggedIn);

  return (
    <AuthService.Provider value={{
      login, logout, token, isAlready, idUser, isLoggedIn,
    }}
    >
      <BrowserRouter>
        <Header />
        <ToastProvider>
          {routes}
        </ToastProvider>
      </BrowserRouter>
    </AuthService.Provider>
  );
};

export default ConnectApp;
