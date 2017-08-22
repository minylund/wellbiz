import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { colorStyles, textStyles } from '../../styles';
import FloatingLabel from 'react-native-floating-labels';

const Input = ({ value, autoFocus, returnKeyType, onChangeText, onSubmitEditing, placeholder, secureTextEntry, keyboardType }) => {
  const { labelInput, input, formInput, containerStyle, borderStyle } = styles;
  return (
    <View style={containerStyle}>
      <FloatingLabel
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        labelStyle={labelInput}
        inputStyle={input}
        style={formInput}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
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
    height: 75,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 40
  },
  borderStyle: {
    height: 1,
    width: 480,
    backgroundColor: colorStyles.border.dark,
  },
};

export { Input };
