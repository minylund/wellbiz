import React, { Component } from 'react';
import { NativeModules, Platform, Text } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { addLocaleData, IntlProvider } from 'react-intl';
import fiLocale from 'react-intl/locale-data/fi';
import enLocale from 'react-intl/locale-data/en';
import AppNavigation from './src/navigation/AppNavigation';
import reducers from './src/reducers';
import EN_MESSAGES from './assets/strings/en_EN.json';
import { Font } from 'expo';

const translations = {
  en: EN_MESSAGES,
};

class App extends Component {
  state = {
    fontLoaded: false,
  };

  componentWillMount() {
    const config = {
      apiKey: "AIzaSyAQtF_ix7IlPxX9rwEvRC_Ivkda7axApEk",
      authDomain: "wellbiz-9b448.firebaseapp.com",
      databaseURL: "https://wellbiz-9b448.firebaseio.com",
      projectId: "wellbiz-9b448",
      storageBucket: "wellbiz-9b448.appspot.com",
      messagingSenderId: "464378008028"
    };
    firebase.initializeApp(config);
    Font.loadAsync({
      'RobotoSlab-Regular': require('./assets/fonts/RobotoSlab-Regular.ttf'),
      'RobotoSlab-Bold': require('./assets/fonts/RobotoSlab-Bold.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    });
  }




  constructor(props) {
    super(props);
    addLocaleData([...enLocale]);
  }

  getLocale () {
    return 'en';
    /*if (Platform.OS === 'android') {
      return NativeModules.I18nManager.localeIdentifier.replace(/_/, '-').split('-')[0];
    } else {
      return NativeModules.SettingsManager.settings.AppleLocale.replace(/_/, '-').split('-')[0];
    }*/
  }

  render() {
    const locale = this.getLocale();
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <IntlProvider
           locale={locale}
           textComponent={Text}
           messages={translations[locale]}
           >
           <AppNavigation />
         </IntlProvider>
      </Provider>
    );
  }
}

export default App;
