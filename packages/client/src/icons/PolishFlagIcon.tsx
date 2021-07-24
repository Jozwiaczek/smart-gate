import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const PolishFlagIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
      fill="#F0F0F0"
    />
    <path d="M36 18C36 27.9411 27.9411 36 18 36C8.05894 36 0 27.9411 0 18" fill="#D80027" />
  </svg>
);

export default memo(forwardRef(PolishFlagIcon));
