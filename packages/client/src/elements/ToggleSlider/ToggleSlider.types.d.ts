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

interface ArrowUpProps {
  isDragging: boolean;
}

interface ToggleSliderProps {
  onToggle: () => void;
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
}

interface UseResetSliderProps {
  thumbYPosition: number;
  setThumbYPosition: Dispatch<SetStateAction<number>>;
  slideProgress: number;
  setSlideProgress: Dispatch<SetStateAction<number>>;
  onComplete: () => unknown;
}
