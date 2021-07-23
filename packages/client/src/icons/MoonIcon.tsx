import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const MoonIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
      fill="#1E1E1E"
    />
    <path
      d="M15.9996 24.5335C20.7125 24.5335 24.533 20.713 24.533 16.0001C24.533 11.2873 20.7125 7.4668 15.9996 7.4668C11.2868 7.4668 7.46631 11.2873 7.46631 16.0001C7.46631 20.713 11.2868 24.5335 15.9996 24.5335Z"
      fill="#FBFBFB"
    />
    <path
      d="M20.6935 21.1201C25.4063 21.1201 29.2268 17.2996 29.2268 12.5868C29.2268 7.87397 25.4063 4.05347 20.6935 4.05347C15.9807 4.05347 12.1602 7.87397 12.1602 12.5868C12.1602 17.2996 15.9807 21.1201 20.6935 21.1201Z"
      fill="#1E1E1E"
    />
  </svg>
);

export default memo(forwardRef(MoonIcon));
