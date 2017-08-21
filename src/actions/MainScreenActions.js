
import {
  MAINSCREEN_SHOW_EXISTING_SURVEYS,
  MAINSCREEN_SHOW_NEW_SURVEY,
  MAINSCREEN_PAGE_DISMISSED
 } from './types';

export const newSurveyPressed = () => {
    return {
      type: MAINSCREEN_SHOW_NEW_SURVEY,
    };
};

export const openExistingSurvey = () => {
    return {
      type: MAINSCREEN_SHOW_EXISTING_SURVEYS,
    };
};

export const pageDismissed = () => {
    return {
      type: MAINSCREEN_PAGE_DISMISSED,
    };
};
