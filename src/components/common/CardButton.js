import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { colorStyles, textStyles } from '../../styles';

const CardButton = ({ imagePath, onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      activeOpacity={0.5}
    >
      <View style={styles.buttonHolder}>
        {imagePath != null &&
          <Image 
            source={imagePath}
            style={styles.image}
          />
        }
        <View style={styles.textHolder}>
          <Text style={textStyle}>
            {children}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  buttonHolder: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  textHolder: {
    height: 70,
    width: 300,
    backgroundColor: colorStyles.brand.primary,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: colorStyles.brand.secondary
  },
  textStyle: {
    ...textStyles.button,
    textAlign: 'center',
    lineHeight: 65,
  },
  buttonStyle: {
    height: 150,
    width: 300,
  },
  image: {
    width: 140,
    height: 110,
    marginBottom: 10,
  },
};

export { CardButton };
