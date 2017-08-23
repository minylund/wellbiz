import firebase from 'firebase';

import {
	CREATE_SURVEY_SUCCESS,
  CREATE_SURVEY_FAIL,
  CREATE_SURVEY
 } from './types';

 export const createSurvey = () => {
 	title = "my survey";
 	type = "internal;"
 	const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: CREATE_SURVEY });

  	firebase.database().ref(`/users/${currentUser.uid}/surveys`)
  		.push({ title, type })
  		.then((survey) => createSurveySuccess(dispatch, survey))
      .catch(() => createSurveyFail(dispatch));
  };
};

const createSurveySuccess = (dispatch, survey) => {
  dispatch({
    type: CREATE_SURVEY_SUCCESS,
    payload: survey
  });
};

const createSurveyFail = (dispatch) => {
  dispatch({
    type: CREATE_SURVEY_FAIL
  });
};