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
    paragraph: {
      ...typographyStyles.primaryFont,
      color: colorStyles.gray.dark,
      fontSize: 14,
    },
    title: {
      ...typographyStyles.primaryFont,
      color: '#222',
      fontWeight: 'bold',
      fontSize: 20,
    },
    subTitle: {
      ...typographyStyles.primaryFont,
      color: '#222',
      fontWeight: 'bold',
      fontSize: 14,
    },
    data: {
    ...typographyStyles.primaryFont,
      fontSize: 25,
    },
  };
