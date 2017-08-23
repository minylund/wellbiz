//@flow
import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { userLogout } from '../actions';
import { injectIntl, FormattedMessage } from 'react-intl';
import { colorStyles, textStyles } from '../styles';
import { Video } from 'expo';
import * as Animatable from 'react-native-animatable';

class SurveyScreen extends Component {
  static navigationOptions = {
    title: 'Survey'
  };

  constructor(props) {
    super(props);

    this.state = {animating: false};

    this.formatMessage = this.props.intl.formatMessage.bind(this);
  }

  onEmojiButtonPress(emojiId) {
      console.log(emojiId);
      if (this.state.animating) {
        return;
      }
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
    return (
      <View style={styles.mainHolder}>
        <TouchableOpacity
          onPress={ () => this.props.userLogout()}
          style={styles.secretButton}
          activeOpacity={1}
        ></TouchableOpacity>
        <View style={styles.mainHeadersHolder}>
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

const mapStateToProps = ({ mainscreen }) => {
  const { logout } = mainscreen;
  return { logout };
};

let injectSurveyScreen = injectIntl(SurveyScreen);
Object.assign(injectSurveyScreen, SurveyScreen);

export default connect(mapStateToProps, { userLogout })(injectSurveyScreen);

// STYLING
const styles = StyleSheet.create({
  mainHolder: {
    flex: 1,
    backgroundColor: colorStyles.white,
    justifyContent: 'center',
    padding: 20
  },
  secretButton: {
    width: 100,
    height: 100,
    backgroundColor: colorStyles.brand.primary
  },
  mainHeadersHolder: {
    alignItems: 'center',
    margin: 50,
    paddingTop: 80,
    height: 50
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
    paddingTop: 70
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
