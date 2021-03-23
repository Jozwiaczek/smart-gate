interface RippleEffectProps {
  color?: string;
  duration?: number;
  opacity?: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleContainerProps {
  duration: number;
  opacity: number;
}
