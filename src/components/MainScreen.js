//@flow
import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { newSurveyPressed, openExistingSurvey, pageDismissed } from '../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colorStyles, textStyles } from '../styles';
import { Card, Input, CardButton, CardSection, Spinner } from './common';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var survey_type_props = [
  {label: 'Internal', value: 0 },
  {label: 'External', value: 1 }
];

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

  componentWillUnMount() {
    console.log('FREE MEE');
    this.props.pageDismissed();
  }

  renderExistingSection() {
    return(
      <View style={styles.mainHolder}>
        <View style={styles.mainHeadersHolder}>
          <Text style={styles.headerStyle}>
            Old surveys
          </Text>
        </View>
      </View>
    );
  }

  renderNewSection(context) {
    const { navigation } = this.props;
    return(
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.mainHolder}
        scrollEnabled={false}
      >
        <View style={styles.mainHeadersHolder}>
          <Text style={styles.headerStyle}>
            Create a new survey
          </Text>
          <View style={styles.createFormHolder}>
            <Input
              placeholder={'Title'}
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType={'done'}
            />
            <RadioForm
              radio_props={survey_type_props}
              formHorizontal={false}
              buttonColor={colorStyles.brand.primary}
              labelStyle={styles.radioFormLabel}
              buttonStyle={styles.radioFormButton}
              style={styles.radioForm}
              buttonSize={40}
              buttonOuterSize={55}
              initial={0}
              onPress={(value) => {}}
            />
            <CardButton
              onPress={() => navigation.navigate('Survey')}>
              {context.formatMessage(
                {
                  id: "createSurveyCreate.button.label",
                  defaultMessage: "Create"
                })
              }
            </CardButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );

  }

  renderInitialSection(context) {
    return(
      <View style={styles.mainHolder}>
        <View style={styles.mainHeadersHolder}>
          <Text style={styles.headerStyle}>
            What would you like to do?
          </Text>
        </View>
        <View style={styles.mainButtonsHolder}>
          <CardButton
            imagePath={require('../../assets/images/menu-statistics.png')}
            onPress={ () => this.props.openExistingSurvey()}>
            {context.formatMessage(
              {
                id: "oldSurveys.button.label",
                defaultMessage: "View old surveys"
              })
            }
          </CardButton>
          <CardButton
            imagePath={require('../../assets/images/menu-create.png')}
            onPress={ () => this.props.newSurveyPressed()}>
            {context.formatMessage(
              {
                id: "createSurvey.button.label",
                defaultMessage: "Create a new survey"
              })
            }
          </CardButton>
        </View>
      </View>
    );
  }

  render() {
    console.log(this.props);

    if (this.props.showCreation) {
      return this.renderNewSection(this);
    }

    if (this.props.showExisting) {
      return this.renderExistingSection(this);
    }

    return this.renderInitialSection(this);
  }
}

const mapStateToProps = ({ mainscreen }) => {
  const { showCreation, showExisting } = mainscreen;
  return { showCreation,  showExisting };
};


let injectMainScreen = injectIntl(MainScreen);
Object.assign(injectMainScreen, MainScreen);

//export default injectMainScreen;

export default connect(mapStateToProps, { newSurveyPressed, openExistingSurvey, pageDismissed })(injectMainScreen);

/*
const mapStateToProps = ({ auth }) => {
  const { email, password, error, user, loading } = auth;
  return { email, password, user, error, loading };
};

export default connect(mapStateToProps, { emailChanged,
  passwordChanged,
  loginUser })(LoginForm);
  */

const styles = StyleSheet.create({
  mainHolder: {
    flex: 1,
    backgroundColor: colorStyles.white,
    justifyContent: 'center',
    padding: 20,
  },
  mainHeadersHolder: {
    flex: 1,
    alignItems: 'center',
    margin: 50,
    paddingTop: 100,
    height: 100
  },
  mainButtonsHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    margin: 100,
    paddingBottom: 150,
  },
  createFormHolder: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50
  },
  radioFormLabel: {
    ...textStyles.button,
    lineHeight: 65,
  },
  radioFormButton: {
  },
  radioForm: {
    marginTop: 10,
    marginBottom: 30
  },
  headerStyle: {
    ...textStyles.headerBig,
    textAlign: 'center',
    lineHeight: 65,
  },
});
