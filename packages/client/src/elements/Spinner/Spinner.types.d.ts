import { ThemeType } from '../../theme/Theme';

export interface SpinnerProps {
  color?: ThemeType;
  size?: string;
  margin?: string;
}

export interface GridProps {
  size?: string;
  margin?: string;
}

export interface CubeProps {
  animationDelay: number;
  color: SpinnerColor;
}
