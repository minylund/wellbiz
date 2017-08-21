import {
  MAINSCREEN_SHOW_EXISTING_SURVEYS,
  MAINSCREEN_SHOW_NEW_SURVEY,
 } from '../actions/types';

const INITIAL_STATE = {
  showCreation: false,
  showExisting: false
 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAINSCREEN_SHOW_EXISTING_SURVEYS:
      return { ...state, showExisting: true, showCreation: false };
      //return;
    case MAINSCREEN_SHOW_NEW_SURVEY:
      return { ...state, showExisting: false, showCreation: true };
      //return;
    default:
      return state;
  }
};
