import anime from 'animejs';
import React, { forwardRef, memo, Ref, SVGProps, useEffect, useRef } from 'react';

const PaperPlane = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => {
  const planeRef = useRef<SVGPathElement>(null);
  const shadowRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const maxDebounce = 0.8;
    anime({
      targets: planeRef.current,
      easing: 'cubicBezier(.5, .05, .1, .3)',
      direction: 'alternate',
      translateY: [maxDebounce * -1, maxDebounce, maxDebounce / -2, maxDebounce / 2, 0],
      loop: true,
    });
    anime({
      targets: shadowRef.current,
      easing: 'cubicBezier(.5, .05, .1, .3)',
      direction: 'alternate',
      scale: [1.01, 1, 0.999],
      loop: true,
    });
  }, []);

  return (
    <svg
      width="100%"
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <g ref={planeRef}>
        <path d="M149.518 0L36.9755 54.5632L0 33.2149L149.518 0Z" fill="url(#paint0_linear)" />
        <path
          d="M149.519 0L55.0104 64.9794L91.9859 86.3277L149.519 0Z"
          fill="url(#paint1_linear)"
        />
        <path
          d="M55.0103 64.9794L149.518 0L36.9755 54.5632L45.9929 88.8443L55.0103 64.9794Z"
          fill="url(#paint2_linear)"
        />
        <path d="M35.3302 53.6116L149.518 0L36.9755 54.5632L35.3302 53.6116Z" fill="#3ED598" />
        <path d="M55.0104 64.9794L149.519 0L56.4894 65.8335L55.0104 64.9794Z" fill="#257D69" />
      </g>
      <path
        ref={shadowRef}
        opacity="0.4"
        d="M125.562 91.3379L23.9567 113.913L47.9649 127.774L49.0828 128.417L62.5029 127.453L68.975 139.905L86.4653 150L125.562 91.3379Z"
        fill="#0B0244"
        fillOpacity="0.2"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="88.7177"
          y1="35.4538"
          x2="53.1291"
          y2="-52.8769"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3ED598" />
          <stop offset="0.5542" stopColor="#2FA27D" />
          <stop offset="1" stopColor="#257D69" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="122.536"
          y1="44.7199"
          x2="81.9975"
          y2="20.2588"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3ED598" />
          <stop offset="0.5542" stopColor="#2FA27D" />
          <stop offset="1" stopColor="#257D69" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="125.492"
          y1="83.2638"
          x2="106.058"
          y2="1.62379"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3ED598" />
          <stop offset="0.2683" stopColor="#39A680" />
          <stop offset="0.6065" stopColor="#347165" />
          <stop offset="0.8608" stopColor="#315054" />
          <stop offset="1" stopColor="#30444E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

PaperPlane.displayName = 'PaperPlane';

export default memo(forwardRef(PaperPlane));
