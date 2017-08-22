//import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginForm from '../components/LoginForm';

 const LoginNavigation = StackNavigator({
   LoginForm: { screen: LoginForm }
 },
 {
   navigationOptions: {
     header: null,
   },
   initialRouteName: 'LoginForm',
 }
);

 export default LoginNavigation;
