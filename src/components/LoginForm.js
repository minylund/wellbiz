import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, Input, CardButton, CardSection, Spinner } from './common';
import { colorStyles } from '../styles';

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

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <CardButton onPress={this.onButtonPress.bind(this)}>
        LOGIN
      </CardButton>
  );
  }

   render() {
     return (
         <View style={styles.mainHolder}>
          <Image source={require('../../assets/images/wellbiz-logo.png')} style={styles.logo} />
          <View style={styles.authHolder}>
            <CardSection>
              <Input
                placeholder={'User ID'}
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
            </CardSection>

            <CardSection>
              <Input
                secureTextEntry
                placeholder={'Password'}
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </CardSection>
          </View>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection style={styles.loginButton}>
            {this.renderButton()}
          </CardSection>
        </View>
     );
   }
}

const styles = {
  mainHolder: {
    flex: 1,
    backgroundColor: colorStyles.brand.primary,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  authHolder: {
    flex: 1,
    backgroundColor: colorStyles.brand.primary,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30,
  },
  logo: {
    width: 70,
    height: 70,
    marginTop: 50,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  loginButton: {
    marginBottom: 150,
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, user, loading } = auth;
  return { email, password, user, error, loading };
};

export default connect(mapStateToProps, { emailChanged,
  passwordChanged,
  loginUser })(LoginForm);
