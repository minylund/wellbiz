import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

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
    alignSelf: 'center',
    color: '#222',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 70
  },
  buttonStyle: {
    height: 70,
    width: 300,
    backgroundColor: '#eee',
    borderRadius: 10,
    borderWidth: 0,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
  }
};

export { CardButton };
