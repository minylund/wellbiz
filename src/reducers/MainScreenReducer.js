import {
  MAINSCREEN_SHOW_EXISTING_SURVEYS,
  MAINSCREEN_SHOW_NEW_SURVEY,
  MAINSCREEN_SHOW_STATISTICS,
  MAINSCREEN_PAGE_DISMISSED,
  MAINSCREEN_RADIOBUTTON_CHANGED,
  MAINSCREEN_TITLE_CHANGED
 } from '../actions/types';

const INITIAL_STATE = {
  showCreation: false,
  showExisting: false,
  showStatistics: false,
  surveyRadioButton: 0, // Internal - Ext is 1
  surveyTitle: '',
 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAINSCREEN_SHOW_EXISTING_SURVEYS:
      return { ...state, showExisting: true, showCreation: false, showStatistics: false };
    case MAINSCREEN_SHOW_NEW_SURVEY:
      return { ...state, showExisting: false, showCreation: true, showStatistics: false };
    case MAINSCREEN_SHOW_STATISTICS:
      return { ...state, showExisting: false, showCreation: false , showStatistics: true };
    case MAINSCREEN_PAGE_DISMISSED:
      return INITIAL_STATE;

    case MAINSCREEN_RADIOBUTTON_CHANGED:
      return { ...state, surveyRadioButton: action.payload };

    case MAINSCREEN_TITLE_CHANGED:
      return { ...state, surveyTitle: action.payload };

    default:
      return state;
  }
};
