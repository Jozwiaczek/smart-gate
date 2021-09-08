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
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="16"
      height="32"
    >
      <rect width="16" height="32" fill="#C4C4C4" />
    </mask>
    <g mask="url(#mask0)">
      <path
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
        fill="#1E1E1E"
      />
      <path
        d="M15.2026 25.0864C20.2851 25.0864 24.4053 20.9663 24.4053 15.8838C24.4053 10.8013 20.2851 6.68115 15.2026 6.68115C10.1202 6.68115 6 10.8013 6 15.8838C6 20.9663 10.1202 25.0864 15.2026 25.0864Z"
        fill="#FBFBFB"
      />
      <path
        d="M20.2642 21.4053C25.3466 21.4053 29.4668 17.2851 29.4668 12.2026C29.4668 7.12016 25.3466 3 20.2642 3C15.1817 3 11.0615 7.12016 11.0615 12.2026C11.0615 17.2851 15.1817 21.4053 20.2642 21.4053Z"
        fill="#1E1E1E"
      />
    </g>
    <mask
      id="mask1"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="16"
      y="0"
      width="16"
      height="32"
    >
      <path
        d="M16 0V0C24.8366 0 32 7.16344 32 16V16C32 24.8366 24.8366 32 16 32V32V0Z"
        fill="#FBFBFB"
      />
    </mask>
    <g mask="url(#mask1)">
      <path
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
        fill="#FFF"
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

const Composed = memo(forwardRef(SystemThemeIcon));
Composed.displayName = 'SystemThemeIcon';

export default Composed;
