import { combineReducers } from 'redux';
import NavigationReducer from './NavigationReducer';
import AuthReducer from './AuthReducer';
import MainScreenReducer from './MainScreenReducer';
import SurveyReducer from './SurveyReducer';
import SurveyDatabaseReducer from './SurveyDatabaseReducer';

 export default combineReducers({
    navigation: NavigationReducer,
    auth: AuthReducer,
    mainscreen: MainScreenReducer,
    survey: SurveyReducer,
    surveyDatabase: SurveyDatabaseReducer,
 });
