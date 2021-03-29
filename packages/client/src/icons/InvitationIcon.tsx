import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const InvitationIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="100%"
    viewBox="0 0 21 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <rect x="1" y="1" width="19" height="12.875" rx="2" stroke="currentColor" />
    <path d="M19.6875 1.75L10.3214 9.625L1.3125 1.75" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default memo(forwardRef(InvitationIcon));
