/**
 * Actions in which you can change the state on main screen
 */

import {
  MAINSCREEN_SHOW_EXISTING_SURVEYS,
  MAINSCREEN_SHOW_NEW_SURVEY,
  MAINSCREEN_SHOW_STATISTICS,
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

export const openStatistics = () => {
    return {
      type: MAINSCREEN_SHOW_STATISTICS,
    };
};

export const pageDismissed = () => {
    return {
      type: MAINSCREEN_PAGE_DISMISSED,
    };
};
