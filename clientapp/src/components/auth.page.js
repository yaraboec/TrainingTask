import { React, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter, Switch, Route, Link,
} from 'react-router-dom';

const AuthPage = () => {
  const [t] = useTranslation();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setData((prevValues) => ({ ...prevValues, [e.target.name]: e.target.value }));
    console.log(data);
  };

  return (
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
              <div>
                <div>{t('Auth.Login')}</div>
                <div>
                  <input type="email" name="email" placeholder={t('Auth.Email')} onChange={(e) => changeHandler(e)} />
                </div>
                <div>
                  <input type="password" name="password" placeholder={t('Auth.Password')} onChange={(e) => changeHandler(e)} />
                </div>
                <div>
                  <button type="button" style={{ marginLeft: '55px', marginTop: '15px' }}>{t('Auth.Login')}</button>
                </div>
                <div style={{ marginTop: '30px', fontSize: '0.9rem' }}>
                  <Link to="/registration">{t('Auth.LoginRequest')}</Link>
                </div>
              </div>
            </Route>

            <Route path="/registration">
              <div>
                <div>{t('Auth.Registration')}</div>
                <div>
                  <input type="email" name="email" placeholder={t('Auth.Email')} onChange={(e) => changeHandler(e)} />
                </div>
                <div>
                  <input type="password" name="password" placeholder={t('Auth.Password')} onChange={(e) => changeHandler(e)} />
                </div>
                <div>
                  <button type="button" style={{ marginLeft: '55px', marginTop: '15px' }}>{t('Auth.Register')}</button>
                </div>
                <div style={{ marginTop: '30px', fontSize: '0.9rem' }}>
                  <Link to="/login">{t('Auth.RegisterRequest')}</Link>
                </div>
              </div>
            </Route>
          </div>
        </>
      </Switch>
    </BrowserRouter>
  );
};

export default AuthPage;
