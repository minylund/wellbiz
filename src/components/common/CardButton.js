import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { textStyles } from '../../styles';

const CardButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      activeOpacity={0.5}
    >
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    ...textStyles.button,
    lineHeight: 65
  },
  buttonStyle: {
    height: 70,
    width: 300,
    backgroundColor: '#fe5',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#dc3'
  }
};

export { CardButton };
