import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const ChevronDownIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M1.66675 1L7.00008 6.33333L12.3334 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Composed = memo(forwardRef(ChevronDownIcon));
Composed.displayName = 'ChevronDownIcon';

export default Composed;
