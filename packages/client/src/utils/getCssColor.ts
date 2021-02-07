import { ITheme } from '../theme/Theme';

interface GetColorProps {
  color?: string;
  theme: ITheme;
}

const getCssColor = ({ color, theme: { palette } }: GetColorProps) => {
  switch (color) {
    case 'primary':
      return palette.primary.main;
    case 'secondary':
      return palette.secondary.main;
    default:
      return color;
  }
};

export default getCssColor;
