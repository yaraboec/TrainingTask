import { LOGIN_USER, REGISET_USER, LOG_OUT } from '../actions/auth.actions';

const user = JSON.parse(localStorage.getItem('token'));

const initialState = user;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.paload };
    case REGISET_USER:
      return { ...state };
    case LOG_OUT:
      return { ...state };
    default:
      return state;
  }
};

export default authReducer;
export const registerAction = () => ({ type: REGISET_USER });
export const loginAction = (payload) => ({ type: LOGIN_USER, payload });
export const logoutAction = () => ({ type: LOG_OUT });
