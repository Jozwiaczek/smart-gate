import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const TickIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 8 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M1 3l2.143 2.5L7 1"
      stroke="currentColor"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default memo(forwardRef(TickIcon));
