import firebase from 'firebase';

import {
	FETCH_SURVEY_SUCCESS,
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
    .once('value', snapshot => {
      dispatch({ type: FETCH_ALL_SURVEYS_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const addAnswer = (surveyId, value) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {

    const timeStamp = new Date().toISOString();

    console.log("ADD ANSWER");
    console.log(timeStamp);

    firebase.database().ref(`/users/${currentUser.uid}/surveys/${surveyId}/answers`)
      .push({ value, timeStamp });
  };
};
