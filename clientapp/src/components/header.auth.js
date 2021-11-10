import { React, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
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
          && (
          <Button
            variant="link"
            onClick={() => logoutAuth()}
            style={{
              marginRight: '20px', fontSize: '1.1rem', textDecoration: 'none',
            }}
            href="/"
          >
            {t('Auth.Logout')}
          </Button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
