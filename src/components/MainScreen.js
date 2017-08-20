//@flow
import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { injectIntl, FormattedMessage } from 'react-intl';
import { colorStyles, textStyles } from '../styles';
import { CardButton } from './common/CardButton';

class MainScreen extends Component {
  static navigationOptions = {
    title: 'Main'
  };

  constructor(props) {
    super(props);

    this.formatMessage = this.props.intl.formatMessage.bind(this);

    MainScreen.navigationOptions.title = this.formatMessage({
      id: "main.label",
      defaultMessage: "Menu"
     });
  }

  render() {
    return (
      <View style={styles.mainHolder}>
          <CardButton onPress={() => navigation.navigate('Survey')}>
            {this.formatMessage(
              {
                id: "survey.button.label",
                defaultMessage: "survey"
              })
            }
          </CardButton>
      </View>
    );
  }
}

let injectMainScreen = injectIntl(MainScreen);
Object.assign(injectMainScreen, MainScreen);

export default injectMainScreen;

const styles = StyleSheet.create({
  mainHolder: {
    flex: 1,
    backgroundColor: colorStyles.brand.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  title: {
    ...textStyles.title,
    fontSize: 32,
    margin: 8,
  },
});
