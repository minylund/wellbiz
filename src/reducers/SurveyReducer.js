import {
  CREATE_SURVEY,
  CREATE_SURVEY_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  id: '',
  loading: false,
  title: '',
  type: '',
  creationDate: '',
  answers: {
    sad: 0,
    normal: 0,
    happy: 0,
  },
 };

export default (state = INITIAL_STATE, action) => {

  //console.log('STATE: ', state);
  //console.log('ACTION', action);

  switch (action.type) {
    case CREATE_SURVEY:
      return { ...state };
    case CREATE_SURVEY_SUCCESS:
      return { ...state, loading: false, error: '', id: action.payload };

    default:
      return state;
  }
};
