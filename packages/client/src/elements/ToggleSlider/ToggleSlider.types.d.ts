import { Dispatch, SetStateAction } from 'react';

interface ThumbCircleProps {
  isSnapped: boolean;
  rotateDegree: number;
  isDragging: boolean;
  isToggled: boolean;
}

interface SliderThumbProps {
  disabledPulsing: boolean;
}

interface ArrowUpProps extends BaseSliderStylesProps {
  isDragging: boolean;
}

type ToggleSliderOrientation = 'vertical' | 'horizontal';

interface ToggleSliderProps {
  onToggle: () => void;
  orientation?: ToggleSliderOrientation;
}

interface BaseSliderStylesProps {
  isHorizontal: boolean;
}

type InfoBoxState = 'default' | 'success';

interface InfoBoxProps {
  state: InfoBoxState;
}

interface InfoBoxLabelProps {
  state: InfoBoxState;
}

interface UseTogglingProgressProps {
  onComplete: () => unknown;
  duration?: number;
}

interface UseResetSliderProps {
  isHorizontal: boolean;
  thumbPosition: number;
  setThumbPosition: Dispatch<SetStateAction<number>>;
  slideProgress: number;
  setSlideProgress: Dispatch<SetStateAction<number>>;
  onComplete: () => unknown;
}
