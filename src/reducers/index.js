import { combineReducers } from 'redux';
import NavigationReducer from './NavigationReducer';
import AuthReducer from './AuthReducer';
import MainScreenReducer from './MainScreenReducer';

 export default combineReducers({
    navigation: NavigationReducer,
    auth: AuthReducer,
    mainscreen: MainScreenReducer,
 });
