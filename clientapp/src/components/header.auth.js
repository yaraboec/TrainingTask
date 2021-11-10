import { React, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AuthService from '../services/auth.service';
import { LogoutUser } from '../actions/auth.async.actions';

const Header = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { logout, isLoggedIn } = useContext(AuthService);

  const logoutAuth = () => {
    dispatch(LogoutUser(logout));
  };

  return (
    <div>
      <nav>
        <div style={{ backgroundColor: '#ccc', height: '40px', textAlign: 'end' }}>
          { isLoggedIn
          && <a onClick={() => logoutAuth()} style={{ marginRight: '20px', fontSize: '1.3rem' }} href="/">{t('Auth.Logout')}</a>}
        </div>
      </nav>
    </div>
  );
};

export default Header;
