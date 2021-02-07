import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const LockIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 18"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C5.442 0 3.368 2.097 3.368 4.683v2.13c-.98.008-1.542.048-1.989.278A2.54 2.54 0 00.275 8.207C0 8.754 0 9.47 0 10.9v2.895c0 1.43 0 2.146.275 2.693.243.48.629.871 1.104 1.116.54.278 1.248.278 2.663.278h7.916c1.415 0 2.122 0 2.663-.278a2.54 2.54 0 001.104-1.116C16 15.94 16 15.226 16 13.795V10.9c0-1.431 0-2.146-.275-2.693a2.54 2.54 0 00-1.104-1.116c-.447-.23-1.008-.27-1.99-.277v-2.13C12.632 2.096 10.559 0 8 0zm2.947 6.812V4.683c0-1.646-1.32-2.98-2.947-2.98-1.628 0-2.947 1.334-2.947 2.98v2.13h5.894zm-2.105 6.159c.504-.294.842-.845.842-1.475 0-.94-.754-1.703-1.684-1.703-.93 0-1.684.762-1.684 1.703 0 .63.338 1.18.842 1.475v1.505c0 .47.377.852.842.852a.847.847 0 00.842-.852v-1.505z"
      fill="currentColor"
    />
  </svg>
);

export default memo(forwardRef(LockIcon));
