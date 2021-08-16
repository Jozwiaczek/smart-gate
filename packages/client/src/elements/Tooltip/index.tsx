import React from 'react';

import { usePopper } from '../../hooks';
import Portal from '../Portal';
import {
  StyledTooltipBox,
  TargetWrapper,
  TooltipArrow,
  TooltipBoxOuterWrapper,
  Wrapper,
} from './Tooltip.styled';
import { TooltipProps } from './Tooltip.types';

const Tooltip = ({ children, label, placement = 'auto' }: TooltipProps) => {
  const { target, toggle, ref, isShown } = usePopper<HTMLDivElement>({ placement });

  return (
    <Wrapper>
      <TargetWrapper
        onMouseEnter={toggle}
        onMouseLeave={toggle}
        onFocus={toggle}
        onBlur={toggle}
        ref={target}
      >
        {children}
      </TargetWrapper>
      <Portal>
        <TooltipBoxOuterWrapper>
          <StyledTooltipBox data-testid="tooltip" role="tooltip" ref={ref} isShown={isShown}>
            <TooltipArrow placement={placement} />
            {label}
          </StyledTooltipBox>
        </TooltipBoxOuterWrapper>
      </Portal>
    </Wrapper>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
