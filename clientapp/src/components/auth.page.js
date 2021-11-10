import {
  React,
} from 'react';

import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import LoginPage from './login.page';
import RegistrationPage from './registration.page';

const AuthPage = () => (
  <BrowserRouter>
    <Switch>
      <>
        <div style={{
          position: 'absolute',
          top: '35%',
          left: '45%',
        }}
        >
          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/registration">
            <RegistrationPage />
          </Route>
        </div>
      </>
    </Switch>
  </BrowserRouter>
);

export default AuthPage;
