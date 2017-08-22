//@flow
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { injectIntl, FormattedMessage } from 'react-intl';
import { colorStyles, textStyles } from '../styles';
import { Video } from 'expo';

class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Register',
    header: undefined, // This will show the header ;)
    headerTintColor: '#222',
    headerTitleStyle: {
      ...textStyles.title,
    },
    headerBackTitleStyle: {
      ...textStyles.title,
    },
    headerStyle: {
      backgroundColor: colorStyles.brand.secondary,
    }
  };

  constructor(props) {
    super(props);

    this.formatMessage = this.props.intl.formatMessage.bind(this);

    RegisterScreen.navigationOptions.title = this.formatMessage({
      id: "main.label",
      defaultMessage: "Survey_test"
     });
  }

  render() {
    return (
        <View style={styles.mainHolder}>
         <Video
          source = {{uri :'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'}}
          ref={this._handleVideoRef}
          style={styles.videoPlayer}
          shouldPlay
        />
          <Text style={styles.text}>
            <FormattedMessage
              id="main.label"
              defaultMessage={'menu'}
              />
          </Text>
        </View>
    )
  }
}

let injectRegisterScreen = injectIntl(RegisterScreen);
Object.assign(injectRegisterScreen, RegisterScreen);

export default injectRegisterScreen;

const styles = StyleSheet.create({
  mainHolder: {
    flex: 1,
    backgroundColor: colorStyles.white,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    ...textStyles.title,
    fontSize: 32,
  },
  videoPlayer: {
    width: 300,
    height: 300,
  }
});
