import axios from 'axios';
import { loginAction, logoutAction, registerAction } from '../reducers/auth.reducer';

export const registerUser = (user) => async function (dispatch) {
  await axios.post(process.env.REACT_APP_backConString.concat('/auth/registration'), user, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((responce) => {
    console.log(responce.data);
    dispatch(registerAction());
  });
};

export const LoginUser = (user, login) => async function (dispatch) {
  await axios.post(process.env.REACT_APP_backConString.concat('/auth/login'), user, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((responce) => {
    if (responce.data) {
      login(responce.data);
    }
    dispatch(loginAction(responce.data));
  });
};

export const LogoutUser = (logout) => async function (dispatch) {
  logout();
  dispatch(logoutAction());
};
