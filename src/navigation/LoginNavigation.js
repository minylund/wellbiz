//import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import TestScreen from '../components/TestScreen';

 const LoginNavigation = StackNavigator({
   Login: { screen: LoginScreen },
   Register: { screen: RegisterScreen },
   Test: { screen: TestScreen },
 },
 {
   navigationOptions: {
     header: null,
   },
   initialRouteName: 'Login',
 }
);

 export default LoginNavigation;
