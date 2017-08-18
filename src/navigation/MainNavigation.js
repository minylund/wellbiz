//import React from 'react';
import { StackNavigator } from 'react-navigation';
//import { TabNavigator } from 'react-navigation';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import RegisterScreen from '../components/RegisterScreen';
import { colorStyles, textStyles } from '../styles';


 /*const MainNavigation = TabNavigator(
   {
     Main: { screen: MainScreen },
     Profile: { screen: ProfileScreen },
   },
   {
     tabBarOptions: {
       activeBackgroundColor: colorStyles.brand.secondary,
       inactiveBackgroundColor: colorStyles.brand.primary,
       activeTintColor: colorStyles.white,
       labelStyle: {
         ...textStyles.subTitle,
       },
       indicatorStyle: {
         backgroundColor: colorStyles.white,
       },
       style: {
         backgroundColor: colorStyles.brand.primary,
         height: 70,
       },
       labelStyle: {
         color: colorStyles.black,
         fontSize: 20,
         height: 45,
       },
     },
     tabBarPosition: 'bottom',
     //lazy: true,
   },
 );*/

  const MainNavigation = StackNavigator({
   Main: { screen: MainScreen },
   Survey: { screen: RegisterScreen }
 },
 {
   navigationOptions: {
     header: null,
   },
   initialRouteName: 'Survey',
 }
);

 export default MainNavigation;
