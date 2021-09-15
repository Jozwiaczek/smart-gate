import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const LogoutIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="26"
    height="19"
    viewBox="0 0 26 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M16 5.16667V4.33333C16 2.49238 14.779 1 13.2727 1H3.72727C2.22104 1 1 2.49238 1 4.33333V14.3333C1 16.1743 2.22104 17.6667 3.72727 17.6667H13.2727C14.779 17.6667 16 16.1743 16 14.3333V13.5"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M25.697 9.86383C25.9899 9.57093 25.9899 9.09606 25.697 8.80317L20.924 4.0302C20.6311 3.7373 20.1563 3.7373 19.8634 4.0302C19.5705 4.32309 19.5705 4.79796 19.8634 5.09086L24.106 9.3335L19.8634 13.5761C19.5705 13.869 19.5705 14.3439 19.8634 14.6368C20.1563 14.9297 20.6311 14.9297 20.924 14.6368L25.697 9.86383ZM11 10.0835H25.1667V8.5835H11V10.0835Z"
      fill="currentColor"
    />
  </svg>
);

const Composed = memo(forwardRef(LogoutIcon));
Composed.displayName = 'LogoutIcon';

export default Composed;
