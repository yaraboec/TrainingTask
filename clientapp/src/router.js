import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import App from './App';
import AuthPage from './components/auth.page';

const Routes = (isLoggedIn) => {
  if (isLoggedIn) {
    return (
      <Switch>
        <Route path="/" exact component={App} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/login" exact component={AuthPage} />
      <Redirect to="" />
    </Switch>
  );
};

export default Routes;
