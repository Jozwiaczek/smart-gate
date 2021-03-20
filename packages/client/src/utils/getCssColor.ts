import { ITheme } from '../theme/Theme';

interface GetColorProps {
  color: string;
  theme: ITheme;
}

const getCssColor = ({ color, theme: { palette } }: GetColorProps): string => {
  switch (color) {
    case 'primary':
      return palette.primary.dark;
    default:
      return color;
  }
};

export default getCssColor;
