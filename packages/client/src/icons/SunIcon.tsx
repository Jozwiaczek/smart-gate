import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const SunIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 174 174"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M47.4919 93.8301C51.328 115.586 72.0743 130.113 93.8301 126.276C115.586 122.44 130.113 101.694 126.276 79.9382C122.44 58.1824 101.694 43.6557 79.9383 47.4918C58.1825 51.328 43.6557 72.0743 47.4919 93.8301Z"
      fill="#FFB400"
    />
    <path
      d="M160.745 73.8606L141.049 77.3336"
      stroke="#FFB400"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M13.0236 99.9078L32.7197 96.4348"
      stroke="#FFB400"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M73.8606 13.0237L77.3336 32.7198"
      stroke="#FFB400"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M99.9078 160.745L96.4348 141.049"
      stroke="#FFB400"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M131.498 23.1692L119.331 40.546"
      stroke="#FFB400"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M54.4377 133.222L42.2704 150.599"
      stroke="#FFB400"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M46.3382 58.4935L23.1691 42.2703"
      stroke="#FFB400"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M150.599 131.498L127.43 115.275"
      stroke="#FFB400"
      strokeWidth="8"
      strokeLinecap="round"
    />
  </svg>
);

const Composed = memo(forwardRef(SunIcon));
Composed.displayName = 'SunIcon';

export default Composed;
