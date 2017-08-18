//import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../components/LoginScreen';
import LoginForm from '../components/LoginForm';
import RegisterScreen from '../components/RegisterScreen';

 const LoginNavigation = StackNavigator({
   LoginForm: { screen: LoginForm },
   Login: { screen: LoginScreen },
   Register: { screen: RegisterScreen },
 },
 {
   navigationOptions: {
     header: null,
   },
   initialRouteName: 'LoginForm',
 }
);

 export default LoginNavigation;
