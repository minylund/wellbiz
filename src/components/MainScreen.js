//@flow
import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { colorStyles, textStyles } from '../styles';
import { CardButton } from './common/CardButton';

class MainScreen extends Component {

  render() {
    return (
      <View style={styles.mainHolder}>
          <CardButton onPress={() => navigation.navigate('Survey')}>
            {this.formatMessage(
              {
                id: "register.button.label",
                defaultMessage: "survey"
              })
            }
          </CardButton>
      </View>
    );
  }
}

export default MainScreen;

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
