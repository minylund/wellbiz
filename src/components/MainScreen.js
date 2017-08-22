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
        <View style={styles.mainHeadersHolder}>
          <Text style={styles.headerStyle}>
            Old surveys
          </Text>
        </View>
      </View>
    );
  }

  renderNewSection() {
    return(
      <View style={styles.mainHolder}>
        <View style={styles.mainHeadersHolder}>
          <Text style={styles.headerStyle}>
            Create a new survey
          </Text>
        </View>
      </View>
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
    backgroundColor: colorStyles.brand.primary,
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
  headerStyle: {
    ...textStyles.headerBig,
    textAlign: 'center',
    lineHeight: 65,
  },
});
