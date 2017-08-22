//@flow
import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, Platform, Keyboard, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { newSurveyPressed, openExistingSurvey, pageDismissed } from '../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colorStyles, textStyles } from '../styles';
import { typographyStyles } from '../styles/typography';
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

  renderBackButton() {
    return (
      <TouchableOpacity
        onPress={ () => this.props.pageDismissed()}
        style={styles.backButtonHolder}
        activeOpacity={0.5}
      >
        <Image 
          source={require('../../assets/images/back-button.png')}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  }

  renderExistingSection() {
    return(
      <View style={styles.mainHolder}>
        {this.renderBackButton()}
        <View style={styles.mainHeadersHolder}>
          <Text style={styles.headerStyle}>
            Old surveys
          </Text>
        </View>
        <View style={styles.existingSurveysHolder}>
          <FlatList
            style={styles.flatList}
            data={[
              {key: '0', date: '25.8.2017', title: 'Pizza and beer'},
              {key: '1', date: '1.7.2017', title: 'Qvik internal'},
              {key: '2', date: '16.5.2017', title: 'IDxA Design'},
              {key: '3', date: '13.4.2017', title: 'Pizza and beer'},
              {key: '4', date: '21.3.2017', title: 'Pizza and beer'},
              {key: '5', date: '1.7.2017', title: 'Qvik internal'},
              {key: '6', date: '16.5.2017', title: 'IDxA Design'},
              {key: '7', date: '13.4.2017', title: 'Pizza and beer'},
              {key: '8', date: '21.3.2017', title: 'Pizza and beer'}
            ]}
            renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemDate}>{item.date}</Text>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <TouchableOpacity
                style={styles.listItemButton}
                activeOpacity={0.5}
              >
                <Text style={styles.listItemButtonText}>Open survey</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.listItemButton}
                activeOpacity={0.5}
              >
                <Text style={styles.listItemButtonText}>Statistics</Text>
              </TouchableOpacity>
            </View>
            )}
          />
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
        {this.renderBackButton()}
        <View style={styles.mainHeadersHolder}>
          <Text style={styles.headerStyle}>
            Create a new survey
          </Text>
        </View>
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
    paddingBottom: 0,
  },
  mainHeadersHolder: {
    alignItems: 'center',
    margin: 50,
    paddingTop: 80,
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
  existingSurveysHolder: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
    marginBottom: 10,
    marginLeft: 60,
    marginRight: 60,
    borderBottomWidth: 1,
    borderColor: colorStyles.border.light
  },
  listItemDate: {
    ...textStyles.listItem,
    ...typographyStyles.dateFont,
    width: 130
  },
  listItemTitle: {
    ...textStyles.listItem,
    width: 400
  },
  listItemButton: {
    width: 160,
    backgroundColor: 'transparent'
  },
  listItemButtonText: {
    ...textStyles.listItem,
    ...typographyStyles.listButton,
    color: colorStyles.brand.primary,
    textAlign: 'center',
    fontSize: 20
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
  radioForm: {
    marginTop: 10,
    marginBottom: 30
  },
  headerStyle: {
    ...textStyles.headerBig,
    textAlign: 'center',
    lineHeight: 65,
  },
  backButtonHolder: {
    marginTop: 10,
    width: 60,
    height: 60
  },
});
