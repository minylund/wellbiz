//@flow
import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, Platform, Keyboard, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { newSurveyPressed, openExistingSurvey, openStatistics, pageDismissed, createSurvey,
radioButtonChanged, titleChanged, fetchAllSurveys } from '../actions';
import { colorStyles, textStyles } from '../styles';
import { typographyStyles } from '../styles/typography';
import { Input, MainButton } from './common';

var survey_type_props = [
  {label: 'Internal', value: 0 },
  {label: 'External', value: 1 }
];

class MainScreen extends Component {
  static navigationOptions = {
    title: 'Main'
  };

  onCreateSurveyPress() {
    this.setState({createDisabled: true});
    const callback = this.props.navigation.dispatch;
    this.props.createSurvey(this.props.surveyTitle, this.props.surveyRadioButton, callback);
  }


  onRadioButtonChanged(value) {
    this.props.radioButtonChanged(value);
  }

  onTitleChanged(value) {
    this.setState({createDisabled: (value === "")});
    this.props.titleChanged(value);
  }

  onOpenSurveyPress(id) {
    const { navigation } = this.props;
    navigation.navigate('Survey', {surveyId: id});
  }

  constructor(props) {
    super(props);
    this.state = {createDisabled: true};

    this.formatMessage = this.props.intl.formatMessage.bind(this);

    MainScreen.navigationOptions.title = this.formatMessage({
      id: "main.label",
      defaultMessage: "Menu"
     });
  }

  componentWillMount() {
    this.props.pageDismissed();
    this.props.fetchAllSurveys();
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

  // View for showing list of existing surveys

  renderExistingSection(context) {
    let listData = [];
    for (var i in this.props.surveyDatabase) {
      var date = new Date(this.props.surveyDatabase[i].creationDate);
      var dateString = date.getDate() + '.' + (date.getMonth() + 1) + '.' +  date.getFullYear()
      listData.push({key: i, 
              date: dateString, 
              title: this.props.surveyDatabase[i].title});
    }
    const { navigation } = this.props;
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
            data={listData}
            renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemDate}>{item.date}</Text>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <TouchableOpacity
                onPress={ this.onOpenSurveyPress.bind(this, item.key) }
                style={styles.listItemButton}
                activeOpacity={0.5}
              >
                <Text style={styles.listItemButtonText}>Open survey</Text>
              </TouchableOpacity>
            </View>
            )}
          />
        </View>
      </View>
    );
    // Statistics button hidden for now as its not yet functional :/
    /*<TouchableOpacity
      onPress={ () => this.props.openStatistics()}
      style={styles.listItemButton}
      activeOpacity={0.5}
    >
      <Text style={styles.listItemButtonText}>Statistics</Text>
    </TouchableOpacity>*/
  }

  // View for showing survey creation form

  renderNewSection(context) {
    const { navigation, surveyRadioButton, surveyTitle } = this.props;
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
            onChangeText={ this.onTitleChanged.bind(this) }
            returnKeyType={'done'}
            value={surveyTitle}
            clearButtonMode={'while-editing'}
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
            initial={surveyRadioButton}
            onPress={ this.onRadioButtonChanged.bind(this) }
          />
          <MainButton
            disabled={this.state.createDisabled}
            onPress={this.onCreateSurveyPress.bind(this)}>
            {context.formatMessage(
              {
                id: "createSurveyCreate.button.label",
                defaultMessage: "Create"
              })
            }
          </MainButton>
        </View>
      </KeyboardAwareScrollView>
    );

  }

  // View for showing survey statistics

  renderStatisticsSection(context) {
    const { navigation } = this.props;
    return(
      <View style={styles.mainHolder}>
        {this.renderBackButton()}
        <View style={styles.mainHeadersHolder}>
          <Text style={styles.headerStyle}>
            Statistics
          </Text>
        </View>
        <View style={styles.statisticsFormHolder}>
          <Text >
            Statistics here :)
          </Text>
        </View>
      </View>
    );

  }

  // View for showing initial menu

  renderInitialSection(context) {
    return(
      <View style={styles.mainHolder}>
        <View style={styles.mainHeadersHolder}>
          <Text style={styles.headerStyle}>
            What would you like to do?
          </Text>
        </View>
        <View style={styles.mainButtonsHolder}>
          <MainButton
            imagePath={require('../../assets/images/menu-statistics.png')}
            onPress={ () => this.props.openExistingSurvey()}>
            {context.formatMessage(
              {
                id: "oldSurveys.button.label",
                defaultMessage: "View old surveys"
              })
            }
          </MainButton>
          <MainButton
            imagePath={require('../../assets/images/menu-create.png')}
            onPress={ () => this.props.newSurveyPressed()}>
            {context.formatMessage(
              {
                id: "createSurvey.button.label",
                defaultMessage: "Create a new survey"
              })
            }
          </MainButton>
        </View>
      </View>
    );
  }

  render() {
    console.log(this.props);



    // Render section based on current state

    if (this.props.showCreation) {
      return this.renderNewSection(this);
    }

    if (this.props.showExisting) {
      return this.renderExistingSection(this);
    }

    if (this.props.showStatistics) {
      return this.renderStatisticsSection(this);
    }

    return this.renderInitialSection(this);
  }
}

const mapStateToProps = ({ mainscreen, surveyDatabase }) => {
  const {
    showCreation,
    showExisting,
    showStatistics,
    showInitial,
    error,
    survey,
    loading,
    surveyRadioButton,
    surveyTitle
        } = mainscreen;
  return { showCreation,
    showExisting, 
    showStatistics, 
    showInitial, 
    error, 
    survey, 
    loading,
    surveyRadioButton, 
    surveyTitle, 
    surveyDatabase };
};

let injectMainScreen = injectIntl(MainScreen);
Object.assign(injectMainScreen, MainScreen);

export default connect(mapStateToProps, {
  newSurveyPressed, 
  openExistingSurvey,
  openStatistics,
  pageDismissed,
  createSurvey,
  radioButtonChanged,
  titleChanged,
  fetchAllSurveys
 })(injectMainScreen);

// STYLING
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
    width: 560
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
  statisticsFormHolder: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
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
