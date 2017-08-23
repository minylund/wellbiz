import {
  FETCH_SURVEY_SUCCESS,
  UPDATE_SURVEY
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  type: '',
  creationDate: '',
  answerHappy: 0,
  answerNormal: 0,
  answerSad: 0,
 };

export default (state = INITIAL_STATE, action) => {

  console.log('STATE: ', state);
  console.log('ACTION', action);

  switch (action.type) {
    case FETCH_SURVEY_SUCCESS:
      return action.payload;
    case UPDATE_SURVEY:
      return { ...state };

    default:
      return state;
  }
};
