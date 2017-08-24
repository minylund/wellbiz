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
    },
    listItem: {
      ...typographyStyles.secondaryFont,
      color: colorStyles.black,
      fontSize: 23,
      lineHeight: 70,
    },
    statisticsText: {
      ...typographyStyles.primaryFont,
      color: colorStyles.text.gray,
      fontSize: 40,
    },
    error: {
      ...typographyStyles.secondaryFont,
      color: colorStyles.text.error,
      fontSize: 23,
    },
  };
