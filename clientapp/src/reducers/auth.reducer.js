import { LOGIN_USER, REGISET_USER, LOG_OUT } from '../actions/auth.actions';

const user = JSON.parse(localStorage.getItem('token'));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLoggedIn: true, user: action.paload };
    case REGISET_USER:
      return { ...state, isLoggedIn: false };
    case LOG_OUT:
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
export const registerAction = (payload) => ({ type: REGISET_USER, payload });
export const loginAction = (payload) => ({ type: LOGIN_USER, payload });
export const logoutAction = () => ({ type: LOG_OUT });
