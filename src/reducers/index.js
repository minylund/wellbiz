import { combineReducers } from 'redux';
import NavigationReducer from './NavigationReducer';
import AuthReducer from './AuthReducer';

 export default combineReducers({
    navigation: NavigationReducer,
    auth: AuthReducer,
 });
