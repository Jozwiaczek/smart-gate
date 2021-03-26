import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const StatisticsIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="100%"
    viewBox="0 0 21 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M0 14.6249C4.2 14.6249 1.575 1.49989 5.25 1.49994C8.925 1.49999 7.35 9.37494 10.5 9.37494C13.65 9.37494 13.7246 4.64994 16.8 4.64994C18.9 4.64994 17.85 12.5249 21 12.5249"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default memo(forwardRef(StatisticsIcon));
