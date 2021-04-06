import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const BackArrowIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="29"
    height="17"
    viewBox="0 0 29 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <rect x="5" y="6" width="24" height="5" rx="1" fill="currentColor" />
    <path
      d="M11 14.9635V2.03649C11 1.20581 10.0459 0.737288 9.38855 1.24521L1.02402 7.70871C0.505946 8.10904 0.505947 8.89096 1.02402 9.29129L9.38855 15.7548C10.0459 16.2627 11 15.7942 11 14.9635Z"
      fill="currentColor"
    />
  </svg>
);

export default memo(forwardRef(BackArrowIcon));
