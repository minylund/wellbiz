import {
  NAVIGATION_TYPE_LOGIN,
  NAVIGATION_TYPE_MAIN,
  NAVIGATION_TYPE_SPLASH,
  LOGIN_USER_SUCCESS,
  USER_LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  navigateTo: NAVIGATION_TYPE_SPLASH,
 };

export default (state = INITIAL_STATE, action) => {

  console.log('STATE: ', state);
  console.log('ACTION', action);

  switch (action.type) {
    case NAVIGATION_TYPE_LOGIN:
      return { ...state, navigateTo: action.payload };
    case NAVIGATION_TYPE_MAIN:
      return { ...state, navigateTo: action.payload };
    case NAVIGATION_TYPE_SPLASH:
      return { ...state, navigateTo: action.payload };
    case LOGIN_USER_SUCCESS:
    return { ...state, navigateTo: NAVIGATION_TYPE_MAIN };
    case USER_LOGOUT:
    return { ...state, navigateTo: NAVIGATION_TYPE_LOGIN };

    default:
      return state;
  }
};
