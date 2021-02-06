type SpinnerColor = 'primary' | 'secondary';

export interface SpinnerProps {
  color?: SpinnerColor;
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
