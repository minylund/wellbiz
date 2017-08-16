//@flow
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { colorStyles } from '../../styles';


type Props = {
  onPress: Function,
  children?: any,
}

const Button = ({ onPress, children } : Props) => {
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonStyle}
    >
      <Text style={styles.textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: colorStyles.brand.primary,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#555',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
  }
};

export { Button };


Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
