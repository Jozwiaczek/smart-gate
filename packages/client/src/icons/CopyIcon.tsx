import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const CopyIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <title>Copy</title>
    <path
      d="M14.5 6.25H7.75C6.92157 6.25 6.25 6.92157 6.25 7.75V14.5C6.25 15.3284 6.92157 16 7.75 16H14.5C15.3284 16 16 15.3284 16 14.5V7.75C16 6.92157 15.3284 6.25 14.5 6.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.25 10.75H2.5C1.67157 10.75 1 10.0784 1 9.25V2.5C1 1.67157 1.67157 1 2.5 1H9.25C10.0784 1 10.75 1.67157 10.75 2.5V3.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Composed = memo(forwardRef(CopyIcon));
Composed.displayName = 'CopyIcon';

export default Composed;
