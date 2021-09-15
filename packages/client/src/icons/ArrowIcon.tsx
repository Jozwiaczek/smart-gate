import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const ArrowIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width={19}
    height={14}
    viewBox="0 0 19 14"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M14.018.73a1 1 0 00-1.529 1.29L14.018.73zm3.218 6.915a1 1 0 001.528-1.29l-1.528 1.29zm1.528 0a1 1 0 00-1.528-1.29l1.528 1.29zM12.49 11.98a1 1 0 101.529 1.29l-1.529-1.29zM18 8a1 1 0 100-2v2zM1.123 6a1 1 0 000 2V6zM12.49 2.02l4.747 5.625 1.528-1.29L14.018.73l-1.529 1.29zm4.747 4.335l-4.747 5.625 1.529 1.29 4.746-5.625-1.528-1.29zM18 6H1.123v2H18V6z"
      fill="currentColor"
    />
  </svg>
);

const Composed = memo(forwardRef(ArrowIcon));
Composed.displayName = 'ArrowIcon';

export default Composed;
