import backConString from '../enviroment';
import { registerAction } from '../reducers/auth.reducer';

export const registerUser = (user) => async function (dispatch) {
  await fetch(backConString.concat('/auth/registration'), {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((responce) => responce.json())
    .then((json) => dispatch(registerAction(json)));
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};
