import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const SmartGateLogoIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGPathElement>) => (
  <svg
    width={174}
    height={172}
    viewBox="0 0 174 172"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      ref={svgRef}
      d="M14.442 75.352c1.152 5.673 4.412 18.723 8.24 25.532 4.784 8.51 2.923 11.17 25.78 32.181 18.287 16.808 38.008 30.319 38.008 30.319s20.781-13.511 39.067-30.319c22.858-21.011 22.125-23.488 25.782-32.181L88.226 76.911a7.144 7.144 0 00-2.537-.466v0m73.869-1.093c1.879-8.184 3.189-19.256 4.253-27.128 1.063-7.873 2.569-21.72 3.189-27.66-5.493-2.394-23.123-9.165-38.273-10.638-9.037-.88-18.605-2.394-35.882-2.926h-11.69c-17.277.532-26.845 2.046-35.882 2.926C30.123 11.399 12.493 18.17 7 20.564c.62 5.94 2.126 19.787 3.19 27.66l30.982 13.643m91.391 6.626c.795-3.71.574-3.804 1.225-8.634.651-4.83 1.574-13.326 1.954-16.97-3.365-1.47-14.165-5.624-23.446-6.528-5.536-.54-11.397-1.469-21.98-1.795h-7.162c-10.583.326-16.444 1.256-21.98 1.795-9.28.904-20.08 5.059-23.446 6.527.38 3.645 1.303 12.141 1.954 16.971s2.008 13.11 2.605 16.645c.706 3.481 2.703 11.488 5.048 15.665 2.93 5.222 1.79 6.854 15.793 19.745 11.202 10.313 23.283 18.603 23.283 18.603s12.73-8.29 23.931-18.603c14.003-12.891 13.054-14.288 14.379-17.469"
      stroke="url(#prefix__paint0_linear)"
      strokeWidth={13}
    />
    <defs>
      <linearGradient
        id="prefix__paint0_linear"
        x1={86.735}
        y1={34.566}
        x2={86.735}
        y2={130.517}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#257D69" />
        <stop offset={1} stopColor="#40DF9F" />
      </linearGradient>
    </defs>
  </svg>
);

export default memo(forwardRef(SmartGateLogoIcon));