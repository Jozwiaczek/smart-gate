import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const UserIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 23 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M11.3 12.414c3.085 0 5.586-2.78 5.586-6.207C16.886 2.779 14.385 0 11.3 0 8.215 0 5.714 2.779 5.714 6.207s2.5 6.207 5.586 6.207zM22.472 21.724c0 3.77-5.688 2.483-11.172 2.483-5.485 0-11.173 1.288-11.173-2.483 0-3.77 5.688-6.828 11.173-6.828s11.172 3.057 11.172 6.828z"
      fill="#FFC542"
    />
  </svg>
);

export default memo(forwardRef(UserIcon));
