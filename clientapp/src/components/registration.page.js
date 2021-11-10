import {
  React, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import { registerUser } from '../actions/auth.async.actions';

const RegistrationPage = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email can not be empty');
  const [passwordError, setPasswordError] = useState('Password can not be empty');
  const [formValid, setFormValid] = useState(false);

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

  const register = () => {
    const data = {
      email,
      password,
    };
    dispatch(registerUser(data));
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
    <div>
      <div>{t('Auth.Registration')}</div>
      <div>
        {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
        <input
          type="email"
          name="email"
          onBlur={(e) => blurHandler(e)}
          placeholder={t('Auth.Email')}
          required
          onChange={(e) => emailHandler(e)}
        />
      </div>
      <div>
        {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
        <input
          type="password"
          name="password"
          onBlur={(e) => blurHandler(e)}
          placeholder={t('Auth.Password')}
          required
          onChange={(e) => passwordHandler(e)}
        />
      </div>
      <div>
        <Link to="/login">
          <button
            onClick={() => register()}
            disabled={!formValid}
            type="button"
            style={{ marginLeft: '55px', marginTop: '15px' }}
          >
            {t('Auth.Register')}

          </button>
        </Link>
      </div>
      <div style={{ marginTop: '30px', fontSize: '0.9rem' }}>
        <Link to="/login">{t('Auth.LoginRequest')}</Link>
      </div>
    </div>
  );
};
export default RegistrationPage;
