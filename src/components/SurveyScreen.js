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
    this.state = {animating: false, showQuote: false, quote: ""};
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

  animateQuote(emotion) {
    var quotes = {
      "sad": [
        "Your feedback is highly appreciated!",
        "We love you nevertheless <3",
        "Dont give up!",
        "You'll feel better tomorrow. I promise :)",
        "Turn the pain into power!",
        "When you feel sad, DANCE!",
        "Love is all you need .. and food.",
        "Smile! Come on, where's that smile?",
        "Cheer up! Things could be worse.",
        "Life is too short for us to dwell on sadness."
      ],
      "normal": [
        "Your feedback is highly appreciated!",
        "Have a nice day!",
        "What's wrong? Grab a beer!",
        "Hope to see you tomorrow!",
        "Whats up? Looking good today!",
        "Stay positive!",
        "Life is short, eat dessert first.",
        "Become your own best friend.",
        "Set goals and dream big.",
        "Too glam to give a damn.",
        "Have a good day!"
      ],
      "happy": [
        "Your feedback is highly appreciated!",
        "Thank you!",
        "Qvik loves you back <3",
        "Keep up that awesomeness!",
        "Thanks! See you later! :)",
        "May the force be with you!",
        "You're looking good today!",
        "You have a beautiful smile.",
        "You are pretty fucking awesome!",
        "You’re a glitterbomb of glory!",
      ]
    };

    var rand = Math.floor(Math.random() * quotes[emotion].length)

    this.setState({quote: quotes[emotion][rand]});

    this.setState({showQuote: true});
    this.refs.quoteView.fadeIn(1500);
    setTimeout( () => {
      this.refs.quoteView.fadeOut(500);
      setTimeout( () => {
        this.setState({showQuote: false});
        this.setState({animating: false});
      }, 500
      );
    }, 3000
    );
  }

  onEmojiButtonPress(emojiId) {
    console.log(emojiId);
    if (this.state.animating) {
      return;
    }

    this.animateQuote(emojiId);

    let updatedSurvey = { ...this.props.surveyDatabase };

    this.setState({animating: true});
    switch (emojiId) {
      case 'sad':
        this.refs.HighlightRef_sad.tada(2000);
        this.refs.VideoRef_sad.playAsync();
        setTimeout( () => {
          this.refs.VideoRef_sad.pauseAsync();
          this.refs.VideoRef_sad.setPositionAsync(0);
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

  renderQuoteView() {
    return (
      <Animatable.View style={styles.thanksHolderStyle} ref="quoteView">
        <Text style={[styles.thanksStyle, {opacity: this.state.showQuote ? 1 : 0}]}>
          {this.state.quote}
        </Text>
      </Animatable.View>
    )
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
        {this.renderQuoteView()}
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
  },
  thanksHolderStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  thanksStyle: {
    ...textStyles.headerSmall,
    textAlign: 'center',
    lineHeight: 65,
    backgroundColor: 'transparent',
  }
});
