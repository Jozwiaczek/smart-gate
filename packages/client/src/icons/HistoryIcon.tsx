import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const HistoryIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M3.16926 3.87826L0.5 1.20757V9.99936H9.28353L5.31338 6.02294L4.9644 5.67341L5.30964 5.32018C7.06921 3.51994 9.47822 2.50352 11.9945 2.49982L11.995 2.49982C16.8225 2.49754 20.8821 6.12254 21.4292 10.9225C21.9763 15.7225 18.8368 20.1695 14.133 21.2556C9.54501 22.315 4.89553 19.8476 3.17621 15.4991H1.06864C2.79612 20.9245 8.27107 24.303 13.9428 23.3349C19.8294 22.33 23.9657 16.978 23.4578 11.0213C22.9499 5.06477 17.9674 0.49183 11.9959 0.500012L11.995 0.500011C8.94785 0.498169 6.02593 1.71374 3.8777 3.87711L3.52405 4.23325L3.16926 3.87826Z"
      fill="currentColor"
      stroke="currentColor"
    />
    <path
      d="M12.3066 5.99744V11.7548V12.7144L17.3066 15.593"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const Composed = memo(forwardRef(HistoryIcon));
Composed.displayName = 'HistoryIcon';

export default Composed;
