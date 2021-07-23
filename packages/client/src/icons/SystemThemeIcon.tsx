import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const SystemThemeIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
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
      d="M15.3896 25.7131C20.4721 25.7131 24.5923 21.593 24.5923 16.5105C24.5923 11.428 20.4721 7.30786 15.3896 7.30786C10.3072 7.30786 6.18701 11.428 6.18701 16.5105C6.18701 21.593 10.3072 25.7131 15.3896 25.7131Z"
      fill="#FBFBFB"
    />
    <path
      d="M20.4512 22.032C25.5336 22.032 29.6538 17.9118 29.6538 12.8293C29.6538 7.74687 25.5336 3.62671 20.4512 3.62671C15.3687 3.62671 11.2485 7.74687 11.2485 12.8293C11.2485 17.9118 15.3687 22.032 20.4512 22.032Z"
      fill="#1E1E1E"
    />
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="16"
      y="0"
      width="16"
      height="32"
    >
      <path d="M16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32V0Z" fill="#FBFBFB" />
    </mask>
    <g mask="url(#mask0)">
      <path
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
        fill="#EAECED"
      />
      <path
        d="M8.78081 17.3482C9.49007 21.3706 13.3258 24.0565 17.3482 23.3472C21.3706 22.638 24.0565 18.8022 23.3472 14.7798C22.638 10.7574 18.8022 8.07155 14.7798 8.78081C10.7574 9.49006 8.07155 13.3258 8.78081 17.3482Z"
        fill="#FFB400"
      />
      <path
        d="M29.7202 13.656L26.0786 14.2981"
        stroke="#FFB400"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18.4717 29.72L17.8296 26.0784"
        stroke="#FFB400"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24.3125 4.28369L22.0629 7.49648"
        stroke="#FFB400"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M27.8443 24.3125L23.5605 21.313"
        stroke="#FFB400"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default memo(forwardRef(SystemThemeIcon));
