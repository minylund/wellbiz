//@flow
import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { userLogout } from '../actions';
import { injectIntl, FormattedMessage } from 'react-intl';
import { colorStyles, textStyles } from '../styles';
import { Video } from 'expo';

class SurveyScreen extends Component {
  static navigationOptions = {
    title: 'Survey'
  };

  constructor(props) {
    super(props);

    this.formatMessage = this.props.intl.formatMessage.bind(this);
  }

  renderEmojiButton(emojiId) {
    let imageSource = '';
    switch (emojiId) {
      case 'sad':
        imageSource = 'https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Emoji_Icon_2_large.png?v=1485577094';
        break;
      case 'ok':
        imageSource = 'https://cdn.shopify.com/s/files/1/1061/1924/products/Neutral_Face_Emoji_large.png?v=1480481054';
        break;
      case 'happy':
        imageSource = 'https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Icon_-_Happy_large.png?v=1485573423';
        break;
      default:
        return null
    }

    return (
      <Image 
        source={{uri: imageSource}}
        style={styles.emoji}
      />
    );
  }

  render() {
    return (
      <View style={styles.mainHolder}>
        <View style={styles.secretButton}></View>
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
        <View style={styles.emojiHolder}>
          {this.renderEmojiButton('sad')}
          {this.renderEmojiButton('ok')}
          {this.renderEmojiButton('happy')}
        </View>
        <Video
          source = {{uri :'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'}}
          ref={this._handleVideoRef}
          style={styles.videoPlayer}
          shouldPlay
        />
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

//export default injectSurveyScreen;

export default connect(mapStateToProps, { userLogout })(injectSurveyScreen);

const styles = StyleSheet.create({
  mainHolder: {
    flex: 1,
    backgroundColor: colorStyles.white,
    justifyContent: 'center',
    padding: 20
  },
  secretButton: {
    width: 100,
    height: 50,
    backgroundColor: colorStyles.brand.primary
  },
  mainHeadersHolder: {
    alignItems: 'center',
    margin: 50,
    paddingTop: 100,
    height: 50
  },
  headerStyle: {
    ...textStyles.headerBig,
    textAlign: 'center',
    lineHeight: 65,
  },
  emojiHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 70
  },
  emoji: {
    width: 140,
    height: 140,
    margin: 30,
  }
});
