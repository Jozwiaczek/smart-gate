import React, { forwardRef, memo, Ref } from 'react';

import { TickIconProps } from '../elements/animations/Checkmark/Checkmark.types';

const TickIcon = ({ isVisible = true, ...rest }: TickIconProps, svgRef?: Ref<SVGPathElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 8 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      ref={svgRef}
      d="M1 3l2.143 2.5L7 1"
      stroke="currentColor"
      strokeWidth={2}
      strokeDashoffset={0}
      strokeMiterlimit={10}
      strokeLinecap={isVisible ? 'round' : undefined}
      strokeLinejoin={isVisible ? 'round' : undefined}
    />
  </svg>
);

export default memo(forwardRef(TickIcon));
