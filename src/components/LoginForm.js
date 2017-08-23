import React, { Component } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Input, MainButton, Spinner } from './common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { textStyles, colorStyles } from '../styles';

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onSubmitEditing(text) {
    Keyboard.dismiss;
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <MainButton onPress={this.onButtonPress.bind(this)}>
        LOGIN
      </MainButton>
    );
  }

   render() {
     return (
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          extraHeight={120}
          contentContainerStyle={styles.mainHolder}
          scrollEnabled={false}
        >
          <Image source={require('../../assets/images/wellbiz-logo.png')} style={styles.logo} />
          <View style={styles.authHolder}>
            <Input
              autoFocus={true}
              placeholder={'User ID'}
              onChangeText={this.onEmailChange.bind(this)}
              onSubmitEditing={Keyboard.dismiss}
              value={this.props.email}
              keyboardType={'email-address'}
              returnKeyType={'done'}
              clearButtonMode={'while-editing'}
            />
            <Input
              secureTextEntry
              placeholder={'Password'}
              onChangeText={this.onPasswordChange.bind(this)}
              onSubmitEditing={Keyboard.dismiss}
              value={this.props.password}
              returnKeyType={'done'}
              clearButtonMode={'while-editing'}
            />
          </View>

          <View style={styles.loginHolder}>
            {this.renderButton()}
          </View>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

        </KeyboardAwareScrollView>
     );
   }
}

// STYLING
const styles = {
  mainHolder: {
    flex: 1,
    backgroundColor: colorStyles.white,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  authHolder: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  logo: {
    width: 70,
    height: 70,
    marginTop: 50,
  },
  errorTextStyle: {
    height: 50,
    ...textStyles.error
  },
  loginHolder: {
    height: 100,
    marginBottom: 80,
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, user, loading } = auth;
  return { email, password, user, error, loading };
};

export default connect(mapStateToProps, { emailChanged,
  passwordChanged,
  loginUser })(LoginForm);
