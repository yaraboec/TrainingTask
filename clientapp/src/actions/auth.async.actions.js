import axios from 'axios';
import { loginAction, logoutAction, registerAction } from '../reducers/auth.reducer';

export const registerUser = (user) => async function registerInternal(dispatch) {
  await axios.post(process.env.REACT_APP_backConString.concat('/auth/registration'), user, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    console.log(response.data);
    dispatch(registerAction());
  });
};

export const LoginUser = (user, login) => async function loginInternal(dispatch) {
  await axios.post(process.env.REACT_APP_backConString.concat('/auth/login'), user, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.data) {
      login(response.data);
    }
    dispatch(loginAction(response.data));
  });
};

export const LogoutUser = (logout) => async function logoutInternal(dispatch) {
  logout();
  dispatch(logoutAction());
};
