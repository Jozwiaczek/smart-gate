import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const LogoutAllIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="32"
    height="22"
    viewBox="0 0 32 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M21.8335 8.50016V7.66683C21.8335 5.82588 20.6125 4.3335 19.1062 4.3335H9.56077C8.05454 4.3335 6.8335 5.82588 6.8335 7.66683V17.6668C6.8335 19.5078 8.05454 21.0002 9.56077 21.0002H19.1062C20.6125 21.0002 21.8335 19.5078 21.8335 17.6668V16.8335"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M6.03788 17.6667H3.87879C2.28888 17.6667 1 16.1743 1 14.3333V4.33333C1 2.49238 2.28888 1 3.87879 1H13.9545C15.5445 1 16.8333 2.49238 16.8333 4.33333V5.16667"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M31.5305 13.1968C31.8234 12.9039 31.8234 12.4291 31.5305 12.1362L26.7575 7.3632C26.4646 7.07031 25.9898 7.07031 25.6969 7.3632C25.404 7.6561 25.404 8.13097 25.6969 8.42386L29.9395 12.6665L25.6969 16.9091C25.404 17.202 25.404 17.6769 25.6969 17.9698C25.9898 18.2627 26.4646 18.2627 26.7575 17.9698L31.5305 13.1968ZM16.8335 13.4165H31.0002V11.9165H16.8335V13.4165Z"
      fill="currentColor"
    />
  </svg>
);

export default memo(forwardRef(LogoutAllIcon));
