import backConString from '../enviroment';
import { loginAction, logoutAction, registerAction } from '../reducers/auth.reducer';

export const registerUser = (user) => async function (dispatch) {
  await fetch(backConString.concat('/auth/registration'), {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((responce) => responce.json())
    .then((json) => {
      console.log(json);
      dispatch(registerAction());
    });
};

export const LoginUser = (user, login) => async function (dispatch) {
  await fetch(backConString.concat('/auth/login'), {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((responce) => responce.json())
    .then((json) => {
      if (json) {
        login(json);
      }
      dispatch(loginAction(json));
    });
};

export const LogoutUser = (logout) => async function (dispatch) {
  logout();
  dispatch(logoutAction());
};
