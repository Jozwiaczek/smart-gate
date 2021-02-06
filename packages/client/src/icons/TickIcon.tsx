import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const TickIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width={8}
    height={7}
    viewBox="0 0 8 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M1 3l2.143 2.5L7 1"
      stroke="#fff"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default memo(forwardRef(TickIcon));
