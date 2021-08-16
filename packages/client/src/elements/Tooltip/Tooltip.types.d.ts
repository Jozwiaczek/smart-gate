import { Placement } from '@popperjs/core/lib/enums';
import { ReactNode } from 'react';

interface TooltipProps {
  children?: ReactNode;
  label: ReactNode;
  placement?: Placement;
}

interface TooltipArrowProps {
  placement: Placement;
}

interface StyledTooltipBoxProps {
  isShown: boolean;
}
