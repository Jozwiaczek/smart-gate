import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const CircleLoaderIndicatorIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    aria-labelledby="circle-loader-indicator"
    data-icon="circle-loader-indicator"
    role="img"
    width="125"
    height="125"
    viewBox="0 0 125 125"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <title id="circle-loader-indicator">Circle loader indicator icon</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M125 125V124.786C124.954 97.9751 116.289 71.8871 100.281 50.3752C84.2296 28.8061 61.6519 12.987 35.8984 5.26566C24.1775 1.75154 12.0824 0 0 0V12.3203C11.1023 12.2365 22.2155 13.7666 33 17C56.7824 24.1304 76.1775 38.0817 91 58C103.294 74.5204 109.985 92.6472 111.91 112.517C112.575 119.382 118.086 124.989 124.98 125H125Z"
      fill="url(#paint0_linear_1806:832)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1806:832"
        x1="-150.5"
        y1="133.5"
        x2="231"
        y2="131"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.390625" stopOpacity="0" />
        <stop offset="0.536458" stopColor="#3ED598" stopOpacity="0.15" />
        <stop offset="0.71875" stopColor="#3ED598" />
      </linearGradient>
    </defs>
  </svg>
);

const Composed = memo(forwardRef(CircleLoaderIndicatorIcon));
Composed.displayName = 'CircleLoaderIndicatorIcon';

export default Composed;
