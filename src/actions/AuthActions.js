import firebase from 'firebase';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  USER_LOGOUT
 } from './types';

export const emailChanged = (text) => {
    return {
      type: EMAIL_CHANGED,
      payload: text
    };
};

export const passwordChanged = (text) => {
    return {
      type: PASSWORD_CHANGED,
      payload: text
    };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => loginUserSuccess(dispatch, user))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
      });
  };
};

export const userLogout = () => {
  console.log('Called');
  return (dispatch) => {
    firebase.auth().signOut()
    .then(() => {
      console.log('then Called');
      userLogoutSuccess(dispatch);
    });
  };
};

const userLogoutSuccess = (dispatch) => {
  dispatch({
    type: USER_LOGOUT
  });
};

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};

const loginUserSuccess = (dispatch, user) => {
  console.log('SUCCESS');
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};
