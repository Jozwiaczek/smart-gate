import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const SendEmailIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    height="100%"
    viewBox="0 0 24 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.49664 2H20.8734L13.4543 8.63862L6.49664 2ZM3 3C3 1.82977 3.67003 0.816042 4.64738 0.321511L4.69033 0.276502L4.70683 0.292252C5.09841 0.104908 5.53695 0 6 0H21C22.6569 0 24 1.34315 24 3V11.875C24 13.5319 22.6569 14.875 21 14.875H9V12.875H21C21.5523 12.875 22 12.4273 22 11.875V3.67571L14.0993 10.7452L13.4107 11.3614L12.7421 10.7235L5 3.33632V9H3V3Z"
      fill="currentColor"
    />
    <rect x="3" y="10" width="2" height="8" fill="currentColor" />
    <rect y="15" width="2" height="8" transform="rotate(-90 0 15)" fill="currentColor" />
  </svg>
);

const Composed = memo(forwardRef(SendEmailIcon));
Composed.displayName = 'SendEmailIcon';

export default Composed;
