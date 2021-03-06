import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  USER_LOGOUT
 } from '../actions/types';

const INITIAL_STATE = {
  email: 'joel+100@qvik.fi',
  password: 'qwerty',
  user: null,
  error: '',
  loading: false
 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, error: '' };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Invalid user ID or password. Please try again!', password: '', loading: false };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case USER_LOGOUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
