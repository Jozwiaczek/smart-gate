import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const OpenLockIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="10"
    height="14"
    viewBox="0 0 10 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M2.33416 6.33665L2.33025 5.00599C2.32539 2.33533 3.21613 1 5.00249 1C6.46429 1 7.41023 1.87993 7.67081 3.66832M2.33416 6.33665H7.68584C8.38919 6.33665 8.96541 6.88091 9.01635 7.57124L9.02 7.67457L9.00872 11.6771C9.00665 12.4124 8.40994 13.0075 7.67457 13.0075H2.33416C1.59732 13.0075 1 12.4101 1 11.6733V7.67081C1 6.93397 1.59732 6.33665 2.33416 6.33665Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Composed = memo(forwardRef(OpenLockIcon));
Composed.displayName = 'OpenLockIcon';

export default Composed;
