import React, { forwardRef, memo, Ref, SVGProps } from 'react';
import { useTheme } from 'styled-components';

const FiltersIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => {
  const { palette } = useTheme();
  const background = palette.primary.dark;
  return (
    <svg
      width="100%"
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <rect
        x="0.546875"
        y="2.19678"
        width="23.7656"
        height="1.91803"
        rx="0.959017"
        fill="currentColor"
      />
      <rect
        x="0.546875"
        y="8.90991"
        width="23.7656"
        height="1.91803"
        rx="0.959017"
        fill="currentColor"
      />
      <rect
        x="0.546875"
        y="15.623"
        width="23.7656"
        height="1.91803"
        rx="0.959017"
        fill="currentColor"
      />
      <rect
        x="16.0156"
        y="0.278809"
        width="5.625"
        height="5.90164"
        rx="2.8125"
        fill="currentColor"
      />
      <rect
        x="10.3906"
        y="6.91797"
        width="5.625"
        height="5.90164"
        rx="2.8125"
        fill="currentColor"
      />
      <rect
        x="3.35938"
        y="13.5574"
        width="5.625"
        height="5.90164"
        rx="2.8125"
        fill="currentColor"
      />
      <rect
        x="17.4219"
        y="1.75415"
        width="2.8125"
        height="2.95082"
        rx="1.40625"
        fill={background}
      />
      <rect
        x="11.7969"
        y="8.39355"
        width="2.8125"
        height="2.95082"
        rx="1.40625"
        fill={background}
      />
      <rect
        x="4.76562"
        y="15.0327"
        width="2.8125"
        height="2.95082"
        rx="1.40625"
        fill={background}
      />
    </svg>
  );
};

const Composed = memo(forwardRef(FiltersIcon));
Composed.displayName = 'FiltersIcon';

export default Composed;
