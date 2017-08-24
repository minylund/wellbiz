//@flow
import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { userLogout, fetchSurvey, updateAnswers } from '../actions';
import { injectIntl, FormattedMessage } from 'react-intl';
import { colorStyles, textStyles } from '../styles';
import { Video } from 'expo';
import * as Animatable from 'react-native-animatable';

class SurveyScreen extends Component {
  static navigationOptions = {
    title: 'Survey',
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {animating: false};
    this.formatMessage = this.props.intl.formatMessage.bind(this);
  }


  componentWillMount() {
    this.props.fetchSurvey(this.props.navigation.state.params.surveyId);
  }

  onLogoutPress() {
    if (this.state.animating) {
      return;
    }
    this.props.userLogout()
  }

  onEmojiButtonPress(emojiId) {
    console.log(emojiId);
    if (this.state.animating) {
      return;
    }


    let updatedSurvey = { ...this.props.surveyDatabase };

    this.setState({animating: true});
    switch (emojiId) {
      case 'sad':
        this.refs.HighlightRef_sad.tada(2000);
        this.refs.VideoRef_sad.playAsync();
        setTimeout( () => {
          this.refs.VideoRef_sad.pauseAsync();
          this.refs.VideoRef_sad.setPositionAsync(0);
          this.setState({animating: false});
        },
          2000
        );
        updatedSurvey.answerSad++;
        this.props.updateAnswers(updatedSurvey, this.props.navigation.state.params.surveyId);
        break;
      case 'normal':
        this.refs.HighlightRef_normal.pulse(2000);
        this.refs.VideoRef_normal.playAsync();
        setTimeout( () => {
          this.refs.VideoRef_normal.pauseAsync();
          this.refs.VideoRef_normal.setPositionAsync(0);
          this.setState({animating: false});
        },
          2000
        );
        updatedSurvey.answerNormal++;
        this.props.updateAnswers(updatedSurvey, this.props.navigation.state.params.surveyId);
        break;
      case 'happy':
        this.refs.HighlightRef_happy.swing(2000);
        this.refs.VideoRef_happy.playAsync();
        setTimeout( () => {
          this.refs.VideoRef_happy.pauseAsync();
          this.refs.VideoRef_happy.setPositionAsync(0);
          this.setState({animating: false});
        },
          2000
        );
        updatedSurvey.answerHappy++;
        this.props.updateAnswers(updatedSurvey, this.props.navigation.state.params.surveyId);
        break;
      default:
        return
    }
  }

  renderEmojiButton(emojiId) {

    // Render emoji face button for id

    //let {paused} = this.state;

    let videoSource = '';
    switch (emojiId) {
      case 'sad':
        videoSource = require('../../assets/video/emoji_sad.mp4');
        break;
      case 'normal':
        videoSource = require('../../assets/video/emoji_normal.mp4');
        break;
      case 'happy':
        videoSource = require('../../assets/video/emoji_happy.mp4');
        break;
      default:
        return null
    }

    return (
      <TouchableOpacity
        onPress={this.onEmojiButtonPress.bind(this, emojiId)}
        style={styles.emojiButtonHolder}
        activeOpacity={0.5}
      >
        <Animatable.View
          ref={"HighlightRef_"+emojiId}
          style={styles.emojiHighlight}>
        <Video
          source={videoSource}
          ref={"VideoRef_"+emojiId}
          style={styles.emojiVideoPlayer}
          isLooping={true}
        /></Animatable.View>
      </TouchableOpacity>
    );
  }

  render() {
    console.log('ID OF SURVEY: ', this.props.navigation.state.params.surveyId);
    console.log('SURVEY DATA: ', this.props.surveyDatabase);
    return (
      <View style={styles.mainHolder}>
        <TouchableOpacity
          onPress={this.onLogoutPress.bind(this)}
          style={styles.secretButton}
          activeOpacity={1}
        ></TouchableOpacity>
        <View style={styles.mainHeadersHolder}>
          <Text style={styles.titleStyle}>
            {this.props.surveyDatabase.title}
          </Text>
          <Text style={styles.headerStyle}>
            How are you feeling today?
          </Text>
        </View>
        <View style={styles.emojisHolder}>
          {this.renderEmojiButton('sad')}
          {this.renderEmojiButton('normal')}
          {this.renderEmojiButton('happy')}
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ mainscreen, surveyDatabase }) => {
  const { logout } = mainscreen;
  return { logout, surveyDatabase };
};

let injectSurveyScreen = injectIntl(SurveyScreen);
Object.assign(injectSurveyScreen, SurveyScreen);

export default connect(mapStateToProps, { userLogout, fetchSurvey, updateAnswers })(injectSurveyScreen);

// STYLING
const styles = StyleSheet.create({
  mainHolder: {
    flex: 1,
    backgroundColor: colorStyles.white,
    justifyContent: 'center',
    padding: 20
  },
  secretButton: {
    width: 50,
    height: 50
  },
  mainHeadersHolder: {
    alignItems: 'center',
    margin: 50,
    height: 50,
    paddingTop: 50,
  },
  titleStyle: {
    ...textStyles.headerSmall,
    textAlign: 'center',
    lineHeight: 80,
    height: 80,
  },
  headerStyle: {
    ...textStyles.headerBig,
    textAlign: 'center',
    lineHeight: 65,
  },
  emojisHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 120
  },
  emojiButtonHolder: {
    width: 150,
    height: 150,
    margin: 30,
  },
  emojiVideoPlayer: {
    flex: 1
  },
  emojiHighlight: {
    flex: 1
  }
});
