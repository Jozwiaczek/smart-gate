import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const TrashIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="100%"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.29289 0.292894C-0.09763 0.683414 -0.09763 1.31658 0.29289 1.7071L5.2426 6.65685L0.29289 11.6066C-0.09763 11.9972 -0.09763 12.6303 0.29289 13.0209C0.68341 13.4114 1.31658 13.4114 1.7071 13.0209L6.65684 8.07111L11.6066 13.0209C11.9972 13.4114 12.6302 13.4114 13.0209 13.0209C13.4114 12.6303 13.4114 11.9972 13.0209 11.6066L8.07111 6.65685L13.0209 1.7071C13.4114 1.31658 13.4114 0.683414 13.0209 0.292894C12.6302 -0.0976262 11.9972 -0.0976262 11.6066 0.292894L6.65684 5.2426L1.7071 0.292894C1.31658 -0.0976363 0.68341 -0.0976263 0.29289 0.292894Z"
      fill="currentColor"
    />
  </svg>
);

export default memo(forwardRef(TrashIcon));
