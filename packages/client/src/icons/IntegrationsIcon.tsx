import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const IntegrationsIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M12.667 16.1667C14.6 16.1667 16.167 14.5997 16.167 12.6667C16.167 10.7338 14.6 9.16675 12.667 9.16675C10.734 9.16675 9.16699 10.7338 9.16699 12.6667C9.16699 14.5997 10.734 16.1667 12.667 16.1667Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.6673 5.66667C13.956 5.66667 15.0007 4.622 15.0007 3.33333C15.0007 2.04467 13.956 1 12.6673 1C11.3787 1 10.334 2.04467 10.334 3.33333C10.334 4.622 11.3787 5.66667 12.6673 5.66667Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.0003 15.0002C23.289 15.0002 24.3337 13.9555 24.3337 12.6668C24.3337 11.3782 23.289 10.3335 22.0003 10.3335C20.7117 10.3335 19.667 11.3782 19.667 12.6668C19.667 13.9555 20.7117 15.0002 22.0003 15.0002Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33333 15.0002C4.622 15.0002 5.66667 13.9555 5.66667 12.6668C5.66667 11.3782 4.622 10.3335 3.33333 10.3335C2.04467 10.3335 1 11.3782 1 12.6668C1 13.9555 2.04467 15.0002 3.33333 15.0002Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.6673 24.3334C13.956 24.3334 15.0007 23.2887 15.0007 22.0001C15.0007 20.7114 13.956 19.6667 12.6673 19.6667C11.3787 19.6667 10.334 20.7114 10.334 22.0001C10.334 23.2887 11.3787 24.3334 12.6673 24.3334Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.667 5.66675V9.16675"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.167 12.6667H19.667"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.667 16.1667V19.6667"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.16699 12.6667H5.66699"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default memo(forwardRef(IntegrationsIcon));
