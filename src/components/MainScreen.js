//@flow
import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { newSurveyPressed, openExistingSurvey, pageDismissed } from '../actions';
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

  componentWillUnMount() {
    console.log('FREE MEE');
    this.props.pageDismissed();
  }

  renderExistingSection() {
    return(
      <View style={styles.mainHolder}>
        <Text>
        OLD SURVEY
      </Text>
      </View>
    );
  }

  renderNewSection() {
    return(
      <View style={styles.mainHolder}>
        <Text>
        NEW SURVEY
      </Text>
      </View>
    );

  }

  renderInitialSection(context) {
    return(
      <View style={styles.mainHolder}>

      <CardButton onPress={ () => this.props.newSurveyPressed()}>
        {context.formatMessage(
          {
            id: "survey.button.label",
            defaultMessage: "survey"
          })
        }
      </CardButton>
      <CardButton onPress={ () => this.props.openExistingSurvey()}>
        {context.formatMessage(
          {
            id: "survey.button.label",
            defaultMessage: "survey"
          })
        }
      </CardButton>
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
