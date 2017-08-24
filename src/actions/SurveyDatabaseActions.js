import firebase from 'firebase';

import {
	FETCH_SURVEY_SUCCESS,
	UPDATE_SURVEY,
	FETCH_ALL_SURVEYS_SUCCESS,
} from './types';

export const fetchSurvey = (id) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/surveys/${id}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_SURVEY_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const fetchAllSurveys = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/surveys/`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_ALL_SURVEYS_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const updateAnswers = (survey, id) => {
 const { currentUser } = firebase.auth();

 return (dispatch) => {
   firebase.database().ref(`/users/${currentUser.uid}/surveys/${id}`).set(survey);
 };
};
