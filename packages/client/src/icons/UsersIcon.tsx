import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const UsersIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="100%"
    viewBox="0 0 21 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M15.225 7.35C16.674 7.35 17.8395 6.174 17.8395 4.725C17.8395 3.276 16.674 2.1 15.225 2.1C13.776 2.1 12.6 3.276 12.6 4.725C12.6 6.174 13.776 7.35 15.225 7.35ZM7.35 6.3C9.093 6.3 10.4895 4.893 10.4895 3.15C10.4895 1.407 9.093 0 7.35 0C5.607 0 4.2 1.407 4.2 3.15C4.2 4.893 5.607 6.3 7.35 6.3ZM15.225 9.45C13.3035 9.45 9.45 10.416 9.45 12.3375V14.7H21V12.3375C21 10.416 17.1465 9.45 15.225 9.45ZM7.35 8.4C4.9035 8.4 0 9.6285 0 12.075V14.7H7.35V12.3375C7.35 11.445 7.69649 9.88053 9.83849 8.69403C8.92499 8.50503 8.043 8.4 7.35 8.4Z"
      fill="currentColor"
    />
  </svg>
);

export default memo(forwardRef(UsersIcon));
