import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const UserActionsIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="28"
    height="20"
    viewBox="0 0 28 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M18.9 17.3333V19.9999H0V17.3333C0 17.3333 0 12 9.45 12C18.9 12 18.9 17.3333 18.9 17.3333ZM14.175 4.66665C14.175 3.74368 13.8979 2.84143 13.3787 2.074C12.8595 1.30657 12.1216 0.708437 11.2582 0.35523C10.3948 0.002022 9.44476 -0.0903933 8.5282 0.0896705C7.61164 0.269734 6.76972 0.71419 6.10892 1.36683C5.44812 2.01948 4.99811 2.85099 4.81579 3.75623C4.63347 4.66148 4.72705 5.59978 5.08467 6.4525C5.44229 7.30522 6.04791 8.03405 6.82493 8.54683C7.60195 9.05961 8.51548 9.3333 9.45 9.3333C10.7031 9.3333 11.905 8.84164 12.7911 7.96647C13.6772 7.09131 14.175 5.90433 14.175 4.66665Z"
      fill="currentColor"
    />
    <rect x="16" width="12" height="2" fill="currentColor" />
    <rect x="16" y="4" width="12" height="2" fill="currentColor" />
    <rect x="16" y="8" width="12" height="2" fill="currentColor" />
  </svg>
);

export default memo(forwardRef(UserActionsIcon));
