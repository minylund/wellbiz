import {
  CREATE_SURVEY,
  CREATE_SURVEY_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  title: 'My survey',
  type: 'internal'
 };

export default (state = INITIAL_STATE, action) => {

  console.log('STATE: ', state);
  console.log('ACTION', action);

  switch (action.type) {
    case CREATE_SURVEY:
      return { ...state, loading: true, error: '' };
    default:
      return state;
  }
};
