import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const KeyIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="24"
    height="12"
    viewBox="0 0 24 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.9184 7.12727C13.5888 9.47775 15.7681 11.2 18.3529 11.2C21.4717 11.2 24 8.69279 24 5.6C24 2.50721 21.4717 0 18.3529 0C15.7681 0 13.5888 1.72225 12.9184 4.07273H2.56684C1.23833 4.07273 0.145538 5.0736 0.0134038 6.35645C0.00456485 6.42123 0 6.48736 0 6.55454V8.33636C0 9.14471 0.660799 9.8 1.47594 9.8C2.29107 9.8 2.95187 9.14471 2.95187 8.33636V7.12727H6.03209V8.33636C6.03209 9.14471 6.69288 9.8 7.50802 9.8C8.32316 9.8 8.98396 9.14471 8.98396 8.33636V7.12727H12.9184ZM21.0481 5.6C21.0481 7.07611 19.8415 8.27273 18.3529 8.27273C16.8644 8.27273 15.6578 7.07611 15.6578 5.6C15.6578 4.12389 16.8644 2.92727 18.3529 2.92727C19.8415 2.92727 21.0481 4.12389 21.0481 5.6Z"
      fill="currentColor"
    />
  </svg>
);

const Composed = memo(forwardRef(KeyIcon));
Composed.displayName = 'KeyIcon';

export default Composed;
