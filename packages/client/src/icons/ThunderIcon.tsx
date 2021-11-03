import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const ThunderIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    aria-labelledby="thunder"
    data-icon="thunder"
    role="img"
    width="105"
    height="63"
    viewBox="0 0 105 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <title id="thunder">Thunder icon</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M63.7434 51.2979L63.8466 51.4765L63.8859 51.4274L63.8887 51.43L63.8866 51.4264L104.72 0.277206L60.2655 32.1063L40.9614 11.7643L40.8733 11.6119L40.8475 11.6442L40.797 11.591L40.836 11.6586L-0.000198657 62.8112L45.4193 34.6413L63.7434 51.2979Z"
      fill="url(#paint0_linear_1449:402)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1449:402"
        x1="59.7249"
        y1="4.05151"
        x2="45.5104"
        y2="56.0883"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#257D69" />
        <stop offset="1" stopColor="#40DF9F" />
      </linearGradient>
    </defs>
  </svg>
);

const Composed = memo(forwardRef(ThunderIcon));
Composed.displayName = 'ThunderIcon';

export default Composed;
