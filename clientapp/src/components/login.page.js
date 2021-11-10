import {
  React, useContext, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import AuthService from '../services/auth.service';
import { LoginUser } from '../actions/auth.async.actions';

const LoginPage = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email can not be empty');
  const [passwordError, setPasswordError] = useState('Password can not be empty');
  const [formValid, setFormValid] = useState(false);
  const { login } = useContext(AuthService);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError(t('Validation.IncorrectEmail'));
      if (!e.target.value) {
        setEmailError(t('Validation.EmptyEmail'));
      }
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8 || e.target.value.length > 16) {
      setPasswordError(t('Validation.IncorrectPass'));
      if (!e.target.value) {
        setPasswordError(t('Validation.EmptyPass'));
      }
    } else {
      setPasswordError('');
    }
  };

  const loginAuth = () => {
    const data = {
      email,
      password,
    };
    dispatch(LoginUser(data, login));
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '10px' }}>{t('Auth.Login')}</div>
      <div>
        {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
        <Form.Control
          type="email"
          name="email"
          placeholder={t('Auth.Email')}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => emailHandler(e)}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
        <Form.Control
          type="password"
          name="password"
          placeholder={t('Auth.Password')}
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => passwordHandler(e)}
        />
      </div>
      <div>
        <Button
          onClick={() => loginAuth()}
          type="button"
          disabled={!formValid}
          style={{ marginTop: '15px' }}
        >
          {t('Auth.Login')}
        </Button>
      </div>
      <div style={{ marginTop: '30px', fontSize: '0.9rem' }}>
        <Link to="/registration">{t('Auth.RegisterRequest')}</Link>
      </div>
    </div>
  );
};
export default LoginPage;
