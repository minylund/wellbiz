import {
  FETCH_SURVEY_SUCCESS,
  FETCH_ALL_SURVEYS_SUCCESS,
  ADD_ANSWER
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  type: '',
  creationDate: '',
  answers: []
 };

export default (state = INITIAL_STATE, action) => {

  console.log('STATE: ', state);
  console.log('ACTION', action);

  switch (action.type) {
    case FETCH_SURVEY_SUCCESS:
      return action.payload;
    case FETCH_ALL_SURVEYS_SUCCESS:
      return action.payload;
    case ADD_ANSWER:
      return { ...state };

    default:
      return state;
  }
};
