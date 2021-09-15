import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const AdminIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="33"
    height="28"
    viewBox="0 0 26 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M9.97066 0C8.64846 0 7.38043 0.532637 6.4455 1.48074C5.51057 2.42884 4.98533 3.71474 4.98533 5.05556C4.98533 6.39637 5.51057 7.68227 6.4455 8.63037C7.38043 9.57847 8.64846 10.1111 9.97066 10.1111C11.2928 10.1111 12.5609 9.57847 13.4958 8.63037C14.4307 7.68227 14.956 6.39637 14.956 5.05556C14.956 3.71474 14.4307 2.42884 13.4958 1.48074C12.5609 0.532637 11.2928 0 9.97066 0ZM18.695 10.1111C18.533 10.1111 18.3959 10.2249 18.3709 10.3765L18.1341 12.0449C17.7602 12.2092 17.3988 12.4114 17.0747 12.6389L15.5293 12.0069C15.3922 12.0069 15.2302 12.0069 15.1429 12.1712L13.8966 14.3578C13.8218 14.4968 13.8467 14.6611 13.9714 14.7622L15.2925 15.7986C15.2676 16.0135 15.2551 16.2157 15.2551 16.4306C15.2551 16.6454 15.2676 16.8476 15.2925 17.0625L13.9714 18.0989C13.8592 18.2 13.8218 18.3643 13.8966 18.5033L15.1429 20.6899C15.2177 20.8542 15.3797 20.8542 15.5293 20.8542L17.0747 20.2222C17.3988 20.4497 17.7478 20.6646 18.1341 20.8162L18.3709 22.4846C18.3959 22.6363 18.5205 22.75 18.695 22.75H21.1876C21.3247 22.75 21.4618 22.6363 21.4868 22.4846L21.7236 20.8162C22.0975 20.6519 22.434 20.4497 22.7705 20.2222L24.3035 20.8542C24.4655 20.8542 24.6275 20.8542 24.7148 20.6899L25.9611 18.5033C26.0359 18.3643 25.9985 18.2 25.8863 18.0989L24.5527 17.0625C24.5777 16.8476 24.6026 16.6454 24.6026 16.4306C24.6026 16.2157 24.5901 16.0135 24.5527 15.7986L25.8739 14.7622C25.986 14.6611 26.0234 14.4968 25.9486 14.3578L24.7023 12.1712C24.6275 12.0069 24.4655 12.0069 24.3035 12.0069L22.7705 12.6389C22.434 12.4114 22.0975 12.1965 21.7111 12.0449L21.4743 10.3765C21.4618 10.2249 21.3247 10.1111 21.1876 10.1111H18.695ZM9.97066 12.6389C4.46187 12.6389 0 14.9012 0 17.6944V20.2222H12.0645C11.5083 19.0377 11.2188 17.7425 11.217 16.4306C11.2195 15.1607 11.4916 13.9064 12.0146 12.7526C11.3541 12.6768 10.6686 12.6389 9.97066 12.6389ZM19.9413 14.5347C20.9758 14.5347 21.8108 15.3815 21.8108 16.4306C21.8108 17.4796 20.9758 18.3264 19.9413 18.3264C18.8944 18.3264 18.0718 17.4796 18.0718 16.4306C18.0718 15.3815 18.9069 14.5347 19.9413 14.5347Z"
      fill="currentColor"
    />
  </svg>
);

const Composed = memo(forwardRef(AdminIcon));
Composed.displayName = 'AdminIcon';

export default Composed;
