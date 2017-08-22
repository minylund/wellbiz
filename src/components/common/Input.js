import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { textStyles } from '../../styles';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        placeholder={placeholder}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    ...textStyles.input,
    color: '#000',
    lineHeight: 30,
    flex: 1,
    paddingBottom: 10,
    width: 500,
    borderBottomWidth: 2,
    borderColor: '#ddd'
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 90,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  }
};

export { Input };
