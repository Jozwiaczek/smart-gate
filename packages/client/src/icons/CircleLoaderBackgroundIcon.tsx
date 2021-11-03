import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const CircleLoaderBackgroundIcon = (
  props: SVGProps<SVGSVGElement>,
  svgRef?: Ref<SVGSVGElement>,
) => (
  <svg
    aria-labelledby="circle-loader-background"
    data-icon="circle-loader-background"
    role="img"
    width="250"
    height="250"
    viewBox="0 0 250 250"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <title id="circle-loader-background">Circle loader background icon</title>
    <path
      d="M250 125C250 194.036 194.036 250 125 250C55.9644 250 0 194.036 0 125C0 55.9645 55.9644 6.10352e-05 125 6.10352e-05C194.036 6.10352e-05 250 55.9645 250 125ZM12.5 125C12.5 187.132 62.868 237.5 125 237.5C187.132 237.5 237.5 187.132 237.5 125C237.5 62.868 187.132 12.5001 125 12.5001C62.868 12.5001 12.5 62.868 12.5 125Z"
      fill="#257D69"
      fillOpacity="0.12"
    />
  </svg>
);

const Composed = memo(forwardRef(CircleLoaderBackgroundIcon));
Composed.displayName = 'CircleLoaderBackgroundIcon';

export default Composed;
