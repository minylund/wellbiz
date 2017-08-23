import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';


import {
	CREATE_SURVEY_SUCCESS,
  CREATE_SURVEY_FAIL,
  CREATE_SURVEY
 } from './types';

 export const createSurvey = (title, internal, callback) => {
 	const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: CREATE_SURVEY });

		const type = internal === 0 ? 'internal' : 'external';
		const creationDate = new Date().toISOString();
		const answerSad = 0;
		const answerNormal = 0;
		const answerHappy = 0;

		console.log(creationDate);

  	firebase.database().ref(`/users/${currentUser.uid}/surveys`)
  		.push({ title, type, creationDate, answerSad, answerNormal, answerHappy })
  		.then((survey) => createSurveySuccess(dispatch, survey, callback))
      .catch((error) => createSurveyFail(dispatch, error));
  };
};

const createSurveySuccess = (dispatch, survey, callback) => {
	dispatch({
    type: CREATE_SURVEY_SUCCESS,
		payload: survey.key,
  });
	const callbackParams = NavigationActions.navigate({
		routeName: 'Survey',
		params: {
			surveyId: survey.key,
		},
	});
	console.log('CALLING CALLBACK');
	callback(callbackParams);
};

const createSurveyFail = (dispatch, error) => {
	console.log('ERROR: ', error);
  dispatch({
    type: CREATE_SURVEY_FAIL
  });
};
