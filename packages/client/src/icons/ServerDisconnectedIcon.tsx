import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const ServerDisconnectedIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M42 13.8529C36.2302 10.1485 29.366 8 22 8C21.329 8 20.6622 8.01782 20 8.05304M2 13.8529C4.48016 12.2606 7.16252 10.9557 10 9.98542L2 13.8529Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M35.6559 21.4092C33.9389 20.4158 32.1035 19.6042 30.1763 19.0002M8.34229 21.4092C11.2625 19.72 14.5244 18.5558 17.9991 18.0458L8.34229 21.4092Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.147 28.5088C17.9776 27.8618 19.9477 27.5098 21.9999 27.5098C24.0521 27.5098 26.0221 27.8618 27.8529 28.5088"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.8354 36.293L21.8032 36.2608"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 2L42 42"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Composed = memo(forwardRef(ServerDisconnectedIcon));
Composed.displayName = 'ServerDisconnectedIcon';

export default Composed;
