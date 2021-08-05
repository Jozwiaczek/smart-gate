import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const RefreshIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M0.166016 16.0001V9.00009H7.62435L4.19671 12.2201C5.37935 13.3551 6.99838 13.9965 8.68983 14.0001C11.3955 13.9963 13.8057 12.3943 14.7076 10.0001H14.7268C14.8488 9.67469 14.9412 9.34019 15.0028 9.00009H17.1465C16.6096 13 12.9853 16 8.68983 16.0001H8.67917C6.41904 16.0064 4.25016 15.1638 2.65603 13.6601L0.166016 16.0001ZM2.37581 7.00009H0.232075C0.768809 3.00169 4.39063 0.00222072 8.6845 4.0718e-05H8.68983C10.9503 -0.00674928 13.1198 0.835921 14.714 2.34008L17.2136 4.0718e-05V7.00009H9.7553L13.1883 3.78008C12.0044 2.64373 10.3832 2.00222 8.68983 2.00008C5.9841 2.00383 3.57392 3.60586 2.67202 6.00008H2.65284C2.52984 6.32519 2.43749 6.65979 2.37688 7.00009H2.37581Z"
      fill="#22343C"
    />
  </svg>
);

export default memo(forwardRef(RefreshIcon));
