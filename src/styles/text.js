import { colorStyles } from './colors';
import { typographyStyles } from './typography';

/*
 TODO: Add examples from below elements
  - lineheight
  - spacing, if needed
  - color,
  - fontSize
  - fontWeight
*/

export const textStyles = {
    headerSmall: {
      ...typographyStyles.primaryFont,
      color: colorStyles.text.gray,
      fontSize: 30,
    },
    headerBig: {
      ...typographyStyles.primaryFont,
      color: colorStyles.text.gray,
      fontSize: 60,
    },
    inputLabel: {
      ...typographyStyles.secondaryFont,
      color: colorStyles.text.gray,
      fontSize: 15,
    },
    input: {
      ...typographyStyles.primaryFont,
      color: colorStyles.text.gray,
      fontSize: 30,
    },
    button: {
      ...typographyStyles.buttonFont,
      fontWeight: 'bold',
      alignSelf: 'center',
      color: colorStyles.text.button,
      fontSize: 25,
    }
  };
