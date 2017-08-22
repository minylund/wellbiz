import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { textStyles } from '../../styles';
import FloatingLabel from 'react-native-floating-labels';

const Input = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  const { labelInput, input, formInput, containerStyle, borderStyle } = styles;
  return (
    <View style={containerStyle}>
      <FloatingLabel 
        secureTextEntry={secureTextEntry}
        labelStyle={labelInput}
        inputStyle={input}
        style={formInput}
        value={value}
        onChangeText={onChangeText}
      >{placeholder}</FloatingLabel>
    <View style={borderStyle}></View>
    </View>
  );
};

const styles = {
  labelInput: {
    ...textStyles.inputLabel,
  },
  formInput: {
    flex: 1,
    width: 500,
  },
  input: {
    ...textStyles.input,
    lineHeight: 30,
    borderWidth: 0,
  },
  containerStyle: {
    height: 70,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 40
  },
  borderStyle: {
    height: 2,
    width: 480,
    backgroundColor: "#ddd",
  },
};

export { Input };
