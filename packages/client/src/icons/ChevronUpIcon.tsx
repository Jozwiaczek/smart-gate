import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const ChevronUpIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="40"
    height="23"
    viewBox="0 0 40 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M3 20.2308L19.5237 3.70711C19.9142 3.31658 20.5474 3.31658 20.9379 3.70711L37.4615 20.2308"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Composed = memo(forwardRef(ChevronUpIcon));
Composed.displayName = 'ChevronUpIcon';

export default Composed;
