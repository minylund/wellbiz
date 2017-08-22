import {
  MAINSCREEN_SHOW_EXISTING_SURVEYS,
  MAINSCREEN_SHOW_NEW_SURVEY,
  MAINSCREEN_SHOW_STATISTICS,
  MAINSCREEN_PAGE_DISMISSED
 } from '../actions/types';

const INITIAL_STATE = {
  showCreation: false,
  showExisting: false,
  showStatistics: false
 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAINSCREEN_SHOW_EXISTING_SURVEYS:
      return { ...state, showExisting: true, showCreation: false, showStatistics: false };
      //return;
    case MAINSCREEN_SHOW_NEW_SURVEY:
      return { ...state, showExisting: false, showCreation: true, showStatistics: false };
      //return;
    case MAINSCREEN_SHOW_STATISTICS:
      return { ...state, showExisting: false, showCreation: false , showStatistics: true };
      //return;
    case MAINSCREEN_PAGE_DISMISSED:
      return INITIAL_STATE;
      //return;
    default:
      return state;
  }
};
