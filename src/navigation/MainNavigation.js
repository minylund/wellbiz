//import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainScreen from '../components/MainScreen';
import SurveyScreen from '../components/SurveyScreen';
import { colorStyles, textStyles } from '../styles';

  const MainNavigation = StackNavigator({
   Main: { screen: MainScreen },
   Survey: { screen: SurveyScreen }
 },
 {
   navigationOptions: {
     header: null,
   },
   initialRouteName: 'Main',
 }
);

 export default MainNavigation;
