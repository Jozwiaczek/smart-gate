import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const PowerSupplyIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="24"
    height="29"
    viewBox="0 0 24 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M19.1049 4.00379C19.7562 3.18002 19.1424 2 18.0599 2H9.66476C9.196 2 8.76224 2.24 8.52849 2.62751L2.17586 13.1977C1.6746 14.0302 2.30462 15.069 3.31088 15.069H7.59722L3.55964 25.1505C2.97588 26.4255 4.55341 27.5918 5.61343 26.6692L22 11.1639H13.4386L19.1049 4.00379V4.00379Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default memo(forwardRef(PowerSupplyIcon));
