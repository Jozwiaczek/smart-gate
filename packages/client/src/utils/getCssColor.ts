import { ITheme } from '../theme/Theme';

interface GetColorProps {
  color: string;
  theme: ITheme;
}

const getCssColor = ({ color, theme: { palette } }: GetColorProps): string => {
  switch (color) {
    case 'text-primary':
      return palette.text.primary;
    case 'text-secondary':
      return palette.text.secondary;
    case 'text-dark':
      return palette.text.dark;
    case 'text-light':
      return palette.text.light;
    case 'primary':
      return palette.primary.main;
    case 'background-default':
      return palette.background.default;
    case 'background-paper':
      return palette.background.paper;
    case 'red':
      return palette.colors.red;
    default:
      return color;
  }
};

export default getCssColor;
