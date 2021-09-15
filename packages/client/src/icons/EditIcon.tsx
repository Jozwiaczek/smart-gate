import React, { forwardRef, memo, Ref, SVGProps } from 'react';
import { useTheme } from 'styled-components';

const EditIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => {
  const { palette } = useTheme();
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M27.4367 2.04214L30.3368 4.94231C31.1179 5.72335 31.1179 6.98969 30.3368 7.77073L12.3687 25.7389L5.2849 28.3805C4.48208 28.6798 3.69915 27.8969 3.99853 27.0941L6.64007 20.0103L24.6082 2.04214C25.3893 1.26109 26.6556 1.26109 27.4367 2.04214Z"
        fill="currentColor"
      />
      <rect
        x="22.1641"
        y="3.24976"
        width="10"
        height="3.06086"
        transform="rotate(45 22.1641 3.24976)"
        fill={palette.background.paper}
      />
    </svg>
  );
};

const Composed = memo(forwardRef(EditIcon));
Composed.displayName = 'EditIcon';

export default Composed;
