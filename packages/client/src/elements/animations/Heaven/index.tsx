import anime from 'animejs';
import React, { forwardRef, memo, Ref, SVGProps, useEffect, useRef } from 'react';

const Hell = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => {
  const cloud = useRef<SVGPathElement>(null);
  const cloud2 = useRef<SVGPathElement>(null);
  const topGlow = useRef<SVGPathElement>(null);

  useEffect(() => {
    const maxDebounce = 7;
    const duration = 1250 * maxDebounce;

    const baseOpt = {
      easing: 'cubicBezier(.5, .05, .1, .3)',
      loop: true,
    };

    anime({
      ...baseOpt,
      targets: cloud.current,
      duration,
      translateX: [
        maxDebounce * -1,
        maxDebounce,
        maxDebounce / -2,
        maxDebounce / 2,
        maxDebounce / -2,
        maxDebounce,
        maxDebounce * -1,
      ],
    });
    anime({
      ...baseOpt,
      targets: cloud2.current,
      direction: 'reverse',
      duration,
      translateX: [
        maxDebounce * -1,
        maxDebounce,
        maxDebounce / -2,
        maxDebounce / 2,
        maxDebounce * -1,
      ],
    });
    anime({
      ...baseOpt,
      targets: topGlow.current,
      opacity: [0.75, 0.55, 0.75, 0.85, 0.75],
    });
  }, []);

  return (
    <svg
      width="100%"
      viewBox="0 0 273 332"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M73.53 221.805c2.8-30.754 5.55-62.717-1.84-92.676-3.683-14.949-9.821-29.445-10.594-44.822-.627-13.323 2.921-26.537 7.893-38.906a96.144 96.144 0 015.377-11.576c1.632-2.872 2.602-6.026 4.443-8.837 4.04-6.111 9.576-9.253 15.86-12.602 2.836-1.516 6.138-1.748 9.244-2.445 3.548-.757 7.096-1.564 10.631-2.359 2.995-.672 6.469-1.943 9.526-1.858 3.057.086 6.469-.305 9.698-.403a196.081 196.081 0 0120.414.477c3.904.31 7.795.717 11.674 1.222a9.436 9.436 0 014.285 1.222 20.306 20.306 0 005.082 2.518 48.435 48.435 0 017.23 2.567 46.058 46.058 0 0113.172 9.644c9.514 9.987 14.657 23.566 16.683 37.256 2.025 13.69 1.227 27.637.061 41.437a1223.84 1223.84 0 01-15.602 120.043l-123.236.098z"
        fill="url(#prefix__paint0_linear)"
      />
      <path
        ref={topGlow}
        style={{
          mixBlendMode: 'screen',
        }}
        opacity={0.75}
        d="M154.172 153.109h-36.605L128.75 4.516h14.239l11.183 148.593z"
        fill="url(#prefix__paint1_linear)"
      />
      <path
        ref={cloud}
        d="M92.187 188.52a12.5 12.5 0 0123.523-5.732 14.627 14.627 0 010-6.172 7.403 7.403 0 013.274-4.868 5.115 5.115 0 015.622.231c-2.86-1.412-4.332-5.209-3.797-8.362a7.5 7.5 0 016.45-6.215 7.494 7.494 0 017.8 4.401c.986-2.032 3.651-3.822 5.878-3.444a5.435 5.435 0 014.345 4.601 5.59 5.59 0 014.867 0 4.51 4.51 0 012.069 3.822c.463-2.082 3.469-2.082 5.452-1.291a11.247 11.247 0 014.551 4.382 29.518 29.518 0 01-1.387-6.585 11.253 11.253 0 011.132-7.023 8.677 8.677 0 0110.466-3.59 15.618 15.618 0 01-6.085-7.303 10.254 10.254 0 01.158-9.336 7.653 7.653 0 018.227-3.652c-1.217-1.558-.244-4.771.973-6.329a4.587 4.587 0 015.318-1.315c-3.079-1.351-5.367-4.649-6.681-7.741a6.682 6.682 0 01-.462-4.759 3.408 3.408 0 013.784-2.349 10.468 10.468 0 0111.294-2.118 9.655 9.655 0 015.208 9.737c5.562 1.692 10.089 7.194 11.622 12.793 1.533 5.599 1.107 11.539.584 17.32a473.69 473.69 0 01-7.46 51.511c-1.57 7.632-3.651 15.824-9.735 20.692 0 0-13.849 1.668-21.784 1.656l-57.037-1.132c-7.144-1.777-14.47-4.467-19.228-10.091-4.758-5.623-4.21-16.602 1.059-21.739z"
        fill="#FFFFFF"
        opacity={0.6}
      />
      <path
        ref={cloud2}
        d="M210.741 177.043a16.834 16.834 0 00-23.67-15.093 16.826 16.826 0 00-7.971 7.388 20.003 20.003 0 000-8.326 9.957 9.957 0 00-4.417-6.475 6.869 6.869 0 00-7.57.316c3.87-1.898 5.842-7.023 5.124-11.271a10.116 10.116 0 00-8.699-8.342 10.108 10.108 0 00-10.505 5.908c-1.338-2.739-4.867-5.149-7.922-4.637a7.3 7.3 0 00-5.853 6.195 7.488 7.488 0 00-6.548 0 6.085 6.085 0 00-2.786 5.149c-.633-2.812-4.686-2.8-7.363-1.729-2.677 1.071-4.478 3.542-6.085 5.891a39.249 39.249 0 001.887-8.861 15.15 15.15 0 00-1.534-9.457 11.672 11.672 0 00-14.092-4.869 21.063 21.063 0 008.227-9.737 13.838 13.838 0 00-.207-12.574 10.325 10.325 0 00-11.172-4.941c1.631-2.094.341-6.427-1.302-8.52a6.206 6.206 0 00-7.216-1.778c4.137-1.826 7.228-6.256 9.005-10.431a8.987 8.987 0 00.621-6.415 4.625 4.625 0 00-5.111-3.164c-3.651-3.773-10.454-5.161-15.2-2.848A12.999 12.999 0 0073.36 81.47c-7.496 2.276-13.593 9.676-15.662 17.223-2.069 7.546-1.497 15.543-.779 23.345a631.896 631.896 0 0010.052 69.379c2.106 10.286 4.978 21.313 13.168 27.874 0 0 18.668 2.264 29.352 2.239l76.85-1.521c9.626-2.434 19.471-6.086 25.896-13.608 6.426-7.522 5.598-22.396-1.496-29.358z"
        fill="#FFFFFF"
        opacity={0.6}
      />
      <path
        d="M147.046 102.223h-23.304v1.497h23.304v-1.497zM148.749 106.203H122.05v1.643h26.699v-1.643z"
        fill="#FBFBFB"
      />
      <path d="M150.43 110.573h-30.083v1.777h30.083v-1.777z" fill="#F8F8F8" />
      <path d="M152.133 115.283h-33.478v1.923h33.478v-1.923z" fill="#F4F4F4" />
      <path d="M153.837 120.31h-36.874v2.057h36.874v-2.057z" fill="#F1F1F1" />
      <path d="M155.516 125.593H115.26v2.203h40.256v-2.203z" fill="#EEE" />
      <path d="M157.22 131.094h-43.652v2.337h43.652v-2.337z" fill="#EAEAEA" />
      <path d="M158.911 136.754h-47.034v2.483h47.034v-2.483z" fill="#E8E8E8" />
      <path d="M160.615 142.548h-50.43v2.629h50.43v-2.629z" fill="#E5E5E5" />
      <path d="M162.306 148.415h-53.825v2.763h53.825v-2.763z" fill="#E1E1E1" />
      <path d="M163.998 154.318H106.79v2.909h57.208v-2.909z" fill="#DDD" />
      <path d="M165.702 160.197h-60.604v3.043h60.604v-3.043z" fill="#DADADA" />
      <path d="M167.393 166.039h-63.999v3.189h63.999v-3.189z" fill="#D8D8D8" />
      <path d="M169.085 171.76h-67.382v3.323h67.382v-3.323z" fill="#D5D5D5" />
      <path d="M170.788 177.347h-70.777v3.469h70.777v-3.469z" fill="#D2D2D2" />
      <path d="M172.48 182.739H98.308v3.615h74.172v-3.615z" fill="#D0D0D0" />
      <path d="M174.172 187.888H96.616v3.749h77.556v-3.749z" fill="#CBCBCB" />
      <path d="M175.875 192.756h-80.95v3.895h80.95v-3.895z" fill="#C9C9C9" />
      <path d="M177.555 197.296H93.221v4.029h84.334v-4.029z" fill="#C6C6C6" />
      <path d="M179.258 201.459H91.529v4.175h87.729v-4.175z" fill="#C3C3C3" />
      <path d="M180.962 205.208H89.838v4.309h91.124v-4.309z" fill="#C1C1C1" />
      <path d="M182.641 208.495H88.134v4.455h94.507v-4.455z" fill="#BDBDBD" />
      <path d="M184.345 211.269H86.442v4.601h97.903v-4.601z" fill="#BBB" />
      <path d="M186.049 213.497H84.751v4.735H186.05v-4.735z" fill="#B6B6B6" />
      <path d="M187.728 215.116H83.048v4.881h104.68v-4.881z" fill="#B4B4B4" />
      <path d="M189.432 216.09H81.356v5.015h108.076v-5.015z" fill="#B1B1B1" />
      <path d="M191.136 216.382H79.664v5.161h111.472v-5.161z" fill="#969696" />
      <path
        d="M214.257 30.774a107.388 107.388 0 0116.867 106.296c-.584-1.996-1.971-3.542-2.543-5.538.134 8.314-3.943 16.384-9.602 22.469.548-2.081 0-3.761.548-5.83-1.424 3.08-4.357 6.159-6.827 8.52 5.659-28.457 4.673-57.864-.329-86.42-2.507-14.35-8.908-28.335-8.068-42.88 2.896.462 8.105 1.095 9.954 3.383z"
        fill="url(#prefix__paint2_linear)"
      />
      <path
        d="M228.812 92.205c-.304-4.382-.925-8.921-1.655-13.389-.438-2.24-.864-4.479-1.375-6.682-.268-1.095-.548-2.179-.828-3.262-.28-1.083-.535-2.142-.888-3.177-.694-2.081-1.217-4.15-2.045-6.086l-.085-.219a45.834 45.834 0 01.56-16.93 105.854 105.854 0 00-8.251-11.686c-1.485-1.85-5.135-2.568-8.068-3.116a7.844 7.844 0 00-1.899.682c-.499 14.18 5.647 27.85 8.093 41.871a270.068 270.068 0 014.126 41.98c.081.007.162.007.243 0a158.883 158.883 0 014.052-26.084c.56 3.372.998 6.829 1.351 10.31.207 2.434.438 4.868.523 7.303.086 2.434.159 4.869.195 7.181.03 8.144-.527 16.28-1.667 24.344-.244 1.57-.45 2.982-.645 4.236-.195 1.253-.414 2.312-.572 3.189l-.511 2.726.596-2.775c.195-.877.414-1.935.682-3.177.267-1.242.474-2.653.766-4.211a166.44 166.44 0 002.337-24.344c0-2.361.073-4.783 0-7.23a242.386 242.386 0 00-.353-7.303 142.36 142.36 0 00-1.789-14.436v-.28c.438-4.114.158-8.167 1.935-11.843.255.9.511 1.826.767 2.739.559 2.166 1.022 4.37 1.509 6.573.839 4.442 1.569 8.921 1.995 13.267.797 7.502 1.069 15.05.816 22.591a129.415 129.415 0 01-.463 6.95 77.482 77.482 0 01-.28 2.556s.134-.913.365-2.544c.232-1.631.463-4.017.682-6.95.474-7.587.401-15.198-.219-22.774z"
        fill="#969696"
      />
      <path
        d="M213.309 74.02a20.7 20.7 0 00-1.813-13.388c1.216.377 2.604.73 3.821 1.12a25.808 25.808 0 00-4.99-15.167 13.251 13.251 0 006.085 1.546 37.295 37.295 0 00-9.212-14.533 24.748 24.748 0 009.638.645 32.29 32.29 0 00-23.791-20.047 22.883 22.883 0 000 15.47 128.383 128.383 0 006.084 12.708 96.235 96.235 0 018.762 27.35 18.92 18.92 0 015.416 4.296z"
        fill="url(#prefix__paint3_linear)"
      />
      <path
        d="M203.22 81.141c-1.558-2.617-4.126-2.434-6.194-3.651a43.193 43.193 0 001.521-6.902 37.338 37.338 0 008.311 3.262 40.183 40.183 0 00-3.638 7.291zM176.459 61.764a8.8 8.8 0 004.795 3.383c.085-.657.402-1.217.524-1.935a1.924 1.924 0 00-.499-1.838 2.204 2.204 0 00-1.363-.377 8.667 8.667 0 00-3.457.767z"
        fill="#969696"
      />
      <path
        d="M195.857 79.474a2.666 2.666 0 01-2.689-.147 2.226 2.226 0 00-.998-1.034 2.265 2.265 0 00-1.461-.22c-.097-.255-.182-.547-.279-.79a10.26 10.26 0 01-1.363.097 1.776 1.776 0 00-.597-.888c-.645.072-1.156.608-1.801.584a1.535 1.535 0 01-1.095-.511 13.473 13.473 0 00-.292-4.2 2.44 2.44 0 00-.633-1.144 1.217 1.217 0 00-1.302-.292 13.586 13.586 0 01-2.337-6.767c-.073-1.68.974-3.275 1.789-4.748a9.13 9.13 0 015.063-4.467 8.907 8.907 0 016.851.706 7.524 7.524 0 013.98 7.182 29.762 29.762 0 01-.536 4.32c0 .244.304.828.39 1.06.695 2.173.695 4.509 0 6.682a12.07 12.07 0 01-1.108 2.568 5.119 5.119 0 01-1.582 2.009z"
        fill="url(#prefix__paint4_linear)"
      />
      <path
        d="M180.573 64.113a4.793 4.793 0 002.203 1.217c.83.227 1.676.394 2.531.5a12.6 12.6 0 016.243 2.543 9.862 9.862 0 012.884 4.869c.474 1.828.695 3.711.657 5.6a4.504 4.504 0 002.616-2.593 8.9 8.9 0 00.511-7.413 10.627 10.627 0 00-3.164-3.652 28.424 28.424 0 00-8.007-4.674 5.353 5.353 0 00-4.028-.267c-1.412.535-1.899 2.385-2.446 3.87z"
        fill="#969696"
      />
      <path
        d="M189.152 68.057a7.13 7.13 0 00-4.502 2.057c.413 1.034 1.521.766 1.813 1.558.669-1.668 1.18-2.836 2.689-3.615zM190.333 77.258a7.858 7.858 0 002.713-2.142 20.54 20.54 0 01-3.979 2.216c.423 0 .845-.025 1.266-.073zM189.931 74.459a.89.89 0 00-1.023-.22 1.499 1.499 0 00-.742.804c.236-.195.498-.355.779-.475.309-.14.654-.177.986-.11z"
        fill="#969696"
      />
      <path
        d="M199.727 72.78c.268.644.475 1.326.804 1.947a2.784 2.784 0 001.886 1.582 3.067 3.067 0 002.75-1.534 15.153 15.153 0 011.899-2.75c2.093-1.911 4.867-1.704 7.167.523a8.593 8.593 0 00-1.472-5.295 12.821 12.821 0 00-3.846-3.237 23.315 23.315 0 01-2.689-1.631 7.59 7.59 0 01-1.996-2.788 27.575 27.575 0 00-1.728-3.018 9.736 9.736 0 00-5.172-3.932 15.72 15.72 0 00-7.74-.134 18.138 18.138 0 00-6.681 3.567 19.89 19.89 0 01-6.218 3.164 4.339 4.339 0 00-.158 2.642 31.637 31.637 0 018.859 3.091c1.144.609 2.263 1.29 3.407 1.899 1.4.817 2.913 1.42 4.491 1.79 2.568.51 4.965 1.131 6.218 3.65.098.183.171.33.219.463z"
        fill="url(#prefix__paint5_linear)"
      />
      <path
        style={{
          mixBlendMode: 'screen',
        }}
        d="M199.107 53.767a4.078 4.078 0 01-2.069 1.813 15.876 15.876 0 00-7.703-.486c.316.146.694.401 1.01.547a3.854 3.854 0 00-.596 2.143 9.917 9.917 0 01-4.211-1.218 5.891 5.891 0 003.919 1.887c-.11.96.024 1.93.389 2.824a9.908 9.908 0 01-7.618-2.921c.123.523.435.983.876 1.29a11.453 11.453 0 004.6 2.325c.609 1.619 1.314 3.237 2.057 4.868a20.34 20.34 0 01-5.245-2.677 19.567 19.567 0 00-7.691-2.52 2.877 2.877 0 01.194-1.96 20.47 20.47 0 005.416-2.507c1.411-.913 2.726-2.008 4.198-2.848a14.528 14.528 0 0112.474-.56z"
        fill="url(#prefix__paint6_linear)"
      />
      <path
        d="M208.854 64.015a23.315 23.315 0 01-2.689-1.63 7.59 7.59 0 01-1.996-2.788 27.575 27.575 0 00-1.728-3.019 11.348 11.348 0 00-3.066-3.018c3.37 4.187 4.952 6.67 6.255 10.273a13.868 13.868 0 00-4.053-2.897c1.363 2.434 3.03 5.124 3.03 7.948-1.302-2.118-2.531-3.944-3.772-4.48a7.058 7.058 0 01.657 4.005c-.986-.766-1.862-2.008-3.067-2.337.67.183 3.25 8.74 4.868 9.738.166.102.341.188.523.255a4.163 4.163 0 001.436-1.29 15.155 15.155 0 011.814-2.75c2.093-1.912 4.867-1.705 7.167.523a8.593 8.593 0 00-1.472-5.295 12.821 12.821 0 00-3.907-3.238z"
        fill="#969696"
      />
      <path
        d="M192.073 108.041a24.575 24.575 0 01-6.56-11.259 2.792 2.792 0 01.292-1.947 16.021 16.021 0 01-.182-4.443 6.62 6.62 0 013.772-2.8c.621.426 2.191 3.36 2.86 4.078l.548-.305a8.658 8.658 0 003.419 3.031 17.843 17.843 0 01.804 7.608c-.414 2.531-2.434 5.319-4.953 6.037z"
        fill="url(#prefix__paint7_linear)"
      />
      <path
        d="M206.579 107.895c.413 0 1.411-.731 1.764-.95a15.471 15.471 0 001.801-1.217 30.766 30.766 0 004.6-4.309c1.217-1.314 2.787-2.507 3.323-4.308.3-1.32.333-2.685.097-4.017-.56-5.258-1.132-10.516-2.191-15.69a14.228 14.228 0 00-2.373-6.085 5.374 5.374 0 00-5.804-2.033 6.99 6.99 0 00-2.751 2.203 27.572 27.572 0 00-3.882 6.086c-.499 1.047-.912 2.13-1.399 3.165-.158.353-1.497 3.237-1.217 3.456.925.84 1.472 1.9 2.434 2.739a14.614 14.614 0 00-1.388 4.723c-.45 4.381 1.485 9.031 1.607 13.389a9.289 9.289 0 005.379 2.848z"
        fill="url(#prefix__paint8_linear)"
      />
      <path
        d="M201.93 97.865a3.758 3.758 0 002.823 1.534 3.488 3.488 0 002.239-1.74 24.872 24.872 0 003.651-8.058 58.266 58.266 0 01-2.13 12.853 6.748 6.748 0 01-2.519 4.017 2.931 2.931 0 01-3.066 0 29.191 29.191 0 01-.998-8.606z"
        fill="#969696"
      />
      <path
        style={{
          mixBlendMode: 'screen',
        }}
        d="M222.789 82.614a172.637 172.637 0 01-2.556 65.192c-.106.985-.077 1.98.085 2.958 7.046-22.591 8.385-45.243 2.471-68.15z"
        fill="url(#prefix__paint9_linear)"
      />
      <path
        d="M203.451 67.156l-.134-.195-.426-.523a9.15 9.15 0 00-1.862-1.57 13.394 13.394 0 00-3.261-1.461 30.896 30.896 0 00-4.332-.877c-1.57-.219-3.091-.438-4.454-.754a16.633 16.633 0 01-3.554-1.218 11.34 11.34 0 01-2.13-1.338 9.029 9.029 0 01-.681-.621s.268.195.767.499c.708.406 1.454.745 2.227 1.01 1.147.373 2.323.65 3.517.828 1.35.219 2.859.365 4.454.596 1.517.197 3.01.552 4.454 1.06a12.25 12.25 0 013.285 1.85 8.155 8.155 0 011.704 1.91c.123.187.233.382.329.584l.097.22z"
        fill="#969696"
      />
      <path
        d="M165.702 4.697a107.17 107.17 0 0128.474 12.061 6.72 6.72 0 01.344 5.364c-8.655-7.101-19.398-11.004-30.543-13.255-16.459-3.325-23.779-3.627-26.108-3.627V0h1.703c6.357 0 20.069 3.131 26.13 4.697z"
        fill="#EEE"
      />
      <path
        style={{
          mixBlendMode: 'screen',
        }}
        d="M206.36 57.747a44.864 44.864 0 00-1.814-12.5c.499.51 1.29.523 1.789 1.046a20.078 20.078 0 00-4.6-11.843c.937.402 2.045.463 2.994.877-.609-3.652-1.521-7.133-3.821-9.872a12.021 12.021 0 005.768-1.862 26.942 26.942 0 00-10.49-8.63 37.393 37.393 0 00-2.787-.706l-.365.085a22.898 22.898 0 00.061 15.325 128.177 128.177 0 006.085 12.707 95.564 95.564 0 014.235 9.944 15.474 15.474 0 012.786 4.942c.061.158.11.317.159.487z"
        fill="url(#prefix__paint10_linear)"
      />
      <path
        d="M192.304 62.348a35.424 35.424 0 016.085 3.907 22.36 22.36 0 013.419 3.335 21.172 21.172 0 00-3.103-3.651 26.491 26.491 0 00-5.951-4.406l-.45.815zM207.309 66.073l-.56-.682a18.249 18.249 0 00-1.655-1.704 19.178 19.178 0 00-6.608-3.834 64.1 64.1 0 00-7.63-1.582 17.056 17.056 0 01-2.325-.645c-.535-.195-.815-.33-.815-.33s.304.086.852.183c.78.148 1.569.25 2.361.305l3.541.255c1.481.101 2.944.383 4.357.84a15.6 15.6 0 016.632 4.467 14.407 14.407 0 011.424 1.96l.426.767z"
        fill="#969696"
      />
      <path
        d="M179.785 221.96c10.198-28.847 15.248-79.116 11.451-109.546a11.973 11.973 0 016.255-11.819 43.928 43.928 0 008.154 5.831 76.118 76.118 0 004.868-27.594 2.761 2.761 0 012.141-2.434 3.882 3.882 0 013.408.694 173.565 173.565 0 013.054 54.894c-.705 7.304-1.874 14.607-2.19 21.91-.317 7.303-3.036 15.629-.347 22.469 7.789 19.706 4.658 43.663-12.225 45.595h-24.569z"
        fill="url(#prefix__paint11_linear)"
      />
      <path
        d="M215.851 141.72l.183-1.874c.122-1.217.28-2.946.462-5.1.353-4.321.706-10.285.828-16.87.122-6.585 0-12.562-.243-16.883a218.03 218.03 0 00-.28-5.124l-.11-1.874s.085.657.268 1.862c.182 1.205.389 2.933.608 5.1.576 5.624.82 11.278.731 16.931a142.33 142.33 0 01-1.327 16.906 113.496 113.496 0 01-.791 5.076c-.219 1.193-.329 1.85-.329 1.85zM194.507 140.491s0-1.509-.085-3.956c-.086-2.446-.171-5.782-.353-9.482a386.08 386.08 0 00-.584-9.469 693.704 693.704 0 00-.305-3.932s.365 1.473.791 3.871c.552 3.135.91 6.302 1.071 9.482a78.702 78.702 0 01-.134 9.554c-.194 2.41-.401 3.932-.401 3.932z"
        fill="#969696"
      />
      <path
        style={{
          mixBlendMode: 'screen',
        }}
        d="M193.156 105.679a11.333 11.333 0 013.785-4.041 23.403 23.403 0 008.141 5.246 14.846 14.846 0 002.86 3.129 10.719 10.719 0 00-1.217-4.626 68.59 68.59 0 004.259-26.692 4.011 4.011 0 013.103-1.68c-.511 1.047-.9 2.544-1.411 3.651a81.159 81.159 0 01-2.337 28.799l-1.071 3.98s-10.794-1.801-16.112-7.766z"
        fill="url(#prefix__paint12_linear)"
      />
      <path
        d="M204.607 142.694c2.239-7.303 4.271-14.923 6.523-22.238a15.718 15.718 0 01-6.085 6.719 26.36 26.36 0 01-7.594-5.952 40.055 40.055 0 013.493 14.788c.316-.706.73-1.217 1.046-1.862a.91.91 0 01.451-.536.61.61 0 01.645.268c.12.211.198.442.231.682a47.656 47.656 0 011.29 8.131z"
        fill="#969696"
      />
      <path
        d="M109.321 4.934a108.552 108.552 0 00-29.207 12.67 7.218 7.218 0 00-.353 5.636C88.64 15.78 99.66 11.68 111.09 9.315c16.883-3.493 25.033-4.075 26.78-4.075V0h-1.747c-6.52 0-20.585 3.29-26.802 4.934z"
        fill="#EEE"
      />
      <path
        d="M58.355 30.774A107.389 107.389 0 0041.49 137.071c.584-1.997 1.971-3.542 2.543-5.539-.134 8.314 3.943 16.384 9.602 22.469-.548-2.081 0-3.761-.548-5.83 1.424 3.08 4.357 6.159 6.827 8.52-5.659-28.457-4.673-57.864.329-86.42 2.507-14.41 8.92-28.396 8.068-42.941-2.896.523-8.105 1.156-9.955 3.444z"
        fill="url(#prefix__paint13_linear)"
      />
      <path
        d="M43.8 92.205c.305-4.382.926-8.921 1.656-13.389.438-2.24.864-4.479 1.363-6.682l.84-3.262c.267-1.083.535-2.142.888-3.177.694-2.081 1.217-4.15 2.044-6.086.023-.075.052-.148.085-.219.864-5.63.67-11.372-.572-16.93 2.484-4.077 5.24-7.981 8.251-11.686 1.497-1.85 5.197-2.617 8.08-3.116.66.145 1.298.374 1.9.682.498 14.18-5.647 27.85-8.093 41.871a271.486 271.486 0 00-4.138 41.98 1.275 1.275 0 01-.231 0 158.862 158.862 0 00-4.053-26.084c-.56 3.372-.998 6.829-1.35 10.31-.207 2.434-.438 4.868-.524 7.303a379.04 379.04 0 00-.194 7.181c-.03 8.144.527 16.28 1.667 24.344.243 1.57.45 2.982.645 4.236.194 1.253.413 2.312.572 3.189l.51 2.726-.583-2.775c-.195-.877-.414-1.935-.682-3.177-.267-1.242-.474-2.653-.767-4.211a166.481 166.481 0 01-2.336-24.344c0-2.361-.073-4.783 0-7.23s.207-4.869.353-7.303c.343-4.868.936-9.714 1.777-14.521v-.28c-.438-4.114-.159-8.167-1.935-11.843l-.767 2.739c-.56 2.166-1.022 4.37-1.521 6.572-.828 4.443-1.558 8.922-1.984 13.268a162.28 162.28 0 00-.815 22.59c.122 2.934.304 5.307.462 6.95.159 1.644.28 2.557.28 2.557s-.134-.913-.365-2.544c-.231-1.631-.462-4.017-.681-6.95-.47-7.559-.398-15.14.219-22.689z"
        fill="#969696"
      />
      <path
        d="M59.305 74.02a20.695 20.695 0 011.813-13.388c-1.217.377-2.604.73-3.821 1.12a25.808 25.808 0 015.001-15.167 13.25 13.25 0 01-6.084 1.546 37.283 37.283 0 019.212-14.533 24.75 24.75 0 01-9.65.694 32.292 32.292 0 0123.79-20.096c1.796 5 1.796 10.47 0 15.47a128.254 128.254 0 01-6.084 12.708 96.267 96.267 0 00-8.75 27.35 18.925 18.925 0 00-5.427 4.296z"
        fill="url(#prefix__paint14_linear)"
      />
      <path
        d="M69.393 81.141c1.558-2.617 4.125-2.434 6.194-3.651a43.117 43.117 0 01-1.558-6.877 37.589 37.589 0 01-8.311 3.262 40.165 40.165 0 013.675 7.266zM96.154 61.764a8.798 8.798 0 01-4.795 3.383c-.085-.657-.402-1.217-.523-1.935a1.924 1.924 0 01.499-1.838c.4-.272.88-.405 1.363-.377a8.665 8.665 0 013.456.767z"
        fill="#969696"
      />
      <path
        d="M76.756 79.474a2.664 2.664 0 002.69-.146 2.263 2.263 0 012.458-1.254c.097-.256.182-.548.28-.791.451.062.906.095 1.362.097.103-.35.311-.66.597-.888.645.073 1.216.608 1.8.584a1.484 1.484 0 001.084-.511 13.837 13.837 0 01.304-4.2c.103-.432.322-.827.633-1.144a1.216 1.216 0 011.302-.292 13.572 13.572 0 002.336-6.767c.073-1.68-.973-3.275-1.788-4.748a9.103 9.103 0 00-5.075-4.467 8.883 8.883 0 00-6.84.706 7.521 7.521 0 00-3.979 7.182c.065 1.45.235 2.895.511 4.32 0 .244-.304.829-.389 1.06a10.957 10.957 0 000 6.682c.268.896.64 1.758 1.107 2.568a5.124 5.124 0 001.607 2.009z"
        fill="url(#prefix__paint15_linear)"
      />
      <path
        d="M92.04 64.113a4.795 4.795 0 01-2.202 1.217c-.83.227-1.677.394-2.531.499a12.595 12.595 0 00-6.243 2.544 9.86 9.86 0 00-2.884 4.868 20.626 20.626 0 00-.658 5.6 4.502 4.502 0 01-2.616-2.593 8.911 8.911 0 01-.511-7.413 10.638 10.638 0 013.164-3.651 28.44 28.44 0 018.007-4.674 5.342 5.342 0 014.028-.268c1.473.536 1.923 2.386 2.446 3.87z"
        fill="#969696"
      />
      <path
        d="M83.46 68.057a7.131 7.131 0 014.504 2.057c-.414 1.034-1.522.766-1.814 1.558-.669-1.668-1.168-2.836-2.69-3.615zM82.28 77.258a7.863 7.863 0 01-2.713-2.142 20.538 20.538 0 003.98 2.216c-.424 0-.846-.025-1.266-.073zM82.682 74.459a.888.888 0 011.022-.22c.338.17.602.455.743.804a3.174 3.174 0 00-.779-.475 1.606 1.606 0 00-.986-.11z"
        fill="#969696"
      />
      <path
        d="M72.886 72.78c-.268.644-.475 1.326-.803 1.947a2.787 2.787 0 01-1.887 1.582 3.067 3.067 0 01-2.75-1.534 15.167 15.167 0 00-1.935-2.75c-2.093-1.911-4.868-1.704-7.168.523a8.595 8.595 0 011.534-5.343 12.813 12.813 0 013.845-3.238 23.246 23.246 0 002.69-1.631 7.583 7.583 0 001.995-2.787 27.579 27.579 0 011.728-3.019 9.735 9.735 0 015.172-3.931 15.72 15.72 0 017.74-.134c2.453.705 4.73 1.92 6.681 3.566a19.896 19.896 0 006.207 3.213c.326.843.38 1.766.158 2.642a31.633 31.633 0 00-8.86 3.091c-1.143.609-2.263 1.29-3.407 1.9a16.272 16.272 0 01-4.588 1.788c-2.568.511-4.965 1.132-6.218 3.652-.013.182-.086.329-.134.462z"
        fill="url(#prefix__paint16_linear)"
      />
      <path
        style={{
          mixBlendMode: 'screen',
        }}
        d="M73.506 53.767a4.077 4.077 0 002.069 1.813 15.878 15.878 0 017.703-.486c-.316.146-.693.401-1.01.547a3.86 3.86 0 01.597 2.142 9.917 9.917 0 004.21-1.217 5.89 5.89 0 01-3.918 1.887c.109.959-.025 1.93-.39 2.824a9.905 9.905 0 007.618-2.921 2.18 2.18 0 01-.876 1.29 11.452 11.452 0 01-4.527 2.325c-.608 1.618-1.314 3.237-2.057 4.868a20.344 20.344 0 005.245-2.677 19.568 19.568 0 017.691-2.52 2.873 2.873 0 00-.194-1.96 20.467 20.467 0 01-5.416-2.507c-1.411-.913-2.726-2.008-4.198-2.848a14.528 14.528 0 00-12.547-.56z"
        fill="url(#prefix__paint17_linear)"
      />
      <path
        d="M63.759 64.015a23.27 23.27 0 002.69-1.63 7.584 7.584 0 001.995-2.788 27.576 27.576 0 011.728-3.019 11.356 11.356 0 013.127-3.018c-3.37 4.187-4.952 6.67-6.255 10.273a13.872 13.872 0 014.053-2.897c-1.363 2.434-3.03 5.124-3.03 7.948 1.302-2.118 2.53-3.944 3.772-4.48a7.06 7.06 0 00-.657 3.969c.986-.767 1.862-2.008 3.067-2.337-.67.183-3.25 8.74-4.868 9.737-.17.103-.35.188-.535.256a4.247 4.247 0 01-1.424-1.29 15.159 15.159 0 00-1.91-2.715c-2.094-1.91-4.869-1.704-7.169.524a8.595 8.595 0 011.534-5.344 12.814 12.814 0 013.882-3.189z"
        fill="#969696"
      />
      <path
        d="M80.504 108.041a24.576 24.576 0 006.56-11.259 2.788 2.788 0 00-.293-1.947c.268-1.466.33-2.961.183-4.443a6.609 6.609 0 00-3.785-2.8c-.608.426-2.178 3.36-2.848 4.078l-.56-.305a8.519 8.519 0 01-3.407 3.031 17.836 17.836 0 00-.803 7.608c.45 2.531 2.47 5.319 4.953 6.037z"
        fill="url(#prefix__paint18_linear)"
      />
      <path
        d="M66.034 107.895c-.413 0-1.411-.731-1.764-.95a15.506 15.506 0 01-1.801-1.217 30.795 30.795 0 01-4.6-4.309c-1.217-1.314-2.787-2.507-3.322-4.308a10.13 10.13 0 01-.098-4.017c.56-5.258 1.132-10.516 2.19-15.69a14.244 14.244 0 012.434-6.085 5.379 5.379 0 015.805-2.033 6.985 6.985 0 012.75 2.203 27.528 27.528 0 013.883 6.086c.499 1.047.912 2.13 1.4 3.165.157.353 1.496 3.237 1.216 3.456-.925.84-1.472 1.9-2.434 2.739a14.608 14.608 0 011.388 4.723c.45 4.381-1.485 9.031-1.607 13.389a9.29 9.29 0 01-5.44 2.848z"
        fill="url(#prefix__paint19_linear)"
      />
      <path
        d="M70.683 97.865A3.76 3.76 0 0167.86 99.4a3.492 3.492 0 01-2.24-1.74 24.882 24.882 0 01-3.65-8.058 58.3 58.3 0 002.13 12.853 6.71 6.71 0 002.518 4.017 2.933 2.933 0 003.067 0 29.215 29.215 0 00.998-8.606z"
        fill="#969696"
      />
      <path
        d="M93.123 221.409c-10.198-28.847-15.248-79.117-11.451-109.546a11.966 11.966 0 00-6.255-11.819 43.949 43.949 0 01-8.154 5.83 76.11 76.11 0 01-4.868-27.593 2.764 2.764 0 00-2.141-2.434 3.882 3.882 0 00-3.408.693 173.588 173.588 0 00-3.054 54.895c.706 7.303 1.874 14.606 2.19 21.909.317 7.303 3.036 15.629.347 22.47-7.788 19.706-4.657 43.662 12.225 45.595h24.57z"
        fill="url(#prefix__paint20_linear)"
      />
      <path
        style={{
          mixBlendMode: 'screen',
        }}
        d="M66.253 57.747c.012-4.231.622-8.44 1.814-12.5-.5.51-1.29.523-1.79 1.046a20.085 20.085 0 014.6-11.843c-.936.402-2.044.463-2.993.877.609-3.652 1.521-7.133 3.821-9.872a12.022 12.022 0 01-5.732-1.874 26.945 26.945 0 0110.49-8.618c.925-.268 1.85-.51 2.787-.706l.365.085a22.9 22.9 0 010 15.325 128.31 128.31 0 01-6.084 12.707 95.252 95.252 0 00-4.37 9.944 15.75 15.75 0 00-2.798 4.942l-.11.487z"
        fill="url(#prefix__paint21_linear)"
      />
      <path
        d="M69.162 67.156l.11-.22c.095-.202.205-.397.328-.584a8.145 8.145 0 011.692-1.874c.991-.785 2.1-1.41 3.285-1.85a21.901 21.901 0 014.454-1.06c1.595-.23 3.104-.376 4.454-.596a21.31 21.31 0 003.505-.827 12.675 12.675 0 002.24-1.01c.498-.305.766-.5.766-.5a9.02 9.02 0 01-.681.621c-.659.524-1.373.973-2.13 1.34a16.632 16.632 0 01-3.554 1.216c-1.363.317-2.884.536-4.454.755a30.917 30.917 0 00-4.332.876 13.39 13.39 0 00-3.25 1.424 9.153 9.153 0 00-1.861 1.57l-.426.524-.146.195z"
        fill="#969696"
      />
      <path
        d="M79.859 61.484a26.484 26.484 0 00-5.951 4.455 21.147 21.147 0 00-3.091 3.651 22.356 22.356 0 013.407-3.371 35.39 35.39 0 016.085-3.908l-.45-.827zM65.304 66.073l.438-.767c.42-.692.895-1.348 1.424-1.96a15.602 15.602 0 016.645-4.467 18.158 18.158 0 014.356-.84l3.542-.255c.792-.055 1.58-.157 2.36-.305.548-.097.852-.182.852-.182s-.28.134-.815.329c-.758.27-1.535.485-2.324.645-2.582.37-5.138.9-7.655 1.582a19.18 19.18 0 00-6.608 3.883c-.588.531-1.14 1.1-1.655 1.704l-.56.633zM56.761 141.72s-.11-.657-.328-1.85c-.22-1.193-.5-2.921-.803-5.076a140.545 140.545 0 01-.585-33.837c.22-2.167.438-3.907.609-5.1.17-1.193.267-1.862.267-1.862l-.145 1.874a217.508 217.508 0 00-.28 5.124 269.456 269.456 0 00-.244 16.883 265.6 265.6 0 00.828 16.87c.182 2.154.34 3.895.462 5.1l.22 1.874zM78.106 140.491s-.206-1.522-.425-3.956a78.716 78.716 0 01-.134-9.555c.16-3.18.519-6.346 1.07-9.482.427-2.434.792-3.87.792-3.87l-.305 3.931a385.226 385.226 0 00-.937 18.952l-.06 3.98z"
        fill="#969696"
      />
      <path
        d="M55.747 203.758c-1.165-11.644.382-17.842 2.681-28.553 2.702-12.501-.255-25.439-2.932-37.94-.767-3.59-1.522-7.193-2.142-10.796-.56-7.847-.62-15.722-.183-23.577.22-.974.463-1.959.767-2.921a166.668 166.668 0 008.41 44.025c4.538 13.535-.755 28.774.571 42.979.767 8.131 4.028 16.225 7.46 23.625-.426-2.142.426-4.126 1.059-6.207a61.438 61.438 0 009.163 12.342 12.844 12.844 0 01-.17-3.92 38.799 38.799 0 0012.62 8.387l.073.207h-11.18c-13.39-.207-25.033-6.008-26.197-17.651zM217.162 204.31c1.165-11.644-.381-17.842-2.681-28.553-2.702-12.501.255-25.439 2.932-37.94.767-3.59 1.522-7.193 2.142-10.796.56-7.847.621-15.722.183-23.577a35.673 35.673 0 00-.767-2.921 166.64 166.64 0 01-8.409 44.025c-4.539 13.535.755 28.774-.572 42.979-.767 8.131-4.028 16.225-7.46 23.625.426-2.142-.426-4.126-1.058-6.207a61.462 61.462 0 01-9.164 12.342c.257-1.29.315-2.612.17-3.92a38.797 38.797 0 01-12.619 8.387l-.073.207h11.179c13.389-.207 25.033-6.008 26.197-17.651z"
        fill="#969696"
      />
      <path
        style={{
          mixBlendMode: 'screen',
        }}
        d="M79.457 105.679a11.339 11.339 0 00-3.809-4.041 23.413 23.413 0 01-8.141 5.246 14.842 14.842 0 01-2.86 3.129 10.717 10.717 0 011.217-4.626 68.599 68.599 0 01-4.26-26.692 4.017 4.017 0 00-3.151-1.68c.51 1.047.9 2.544 1.411 3.651a81.142 81.142 0 002.337 28.799l1.07 3.98s10.868-1.801 16.186-7.766z"
        fill="url(#prefix__paint22_linear)"
      />
      <path
        d="M68.006 142.694c-2.24-7.303-4.272-14.923-6.523-22.238a15.712 15.712 0 006.085 6.719 26.36 26.36 0 007.593-5.952 40.057 40.057 0 00-3.565 14.788c-.317-.706-.73-1.217-1.047-1.862a.898.898 0 00-.45-.536.608.608 0 00-.645.268c-.12.211-.199.442-.231.682a47.58 47.58 0 00-1.217 8.131z"
        fill="#969696"
      />
      <g
        style={{
          mixBlendMode: 'multiply',
        }}
      >
        <path
          d="M180.5 221L273 332H0l92.5-111h88z"
          fill="url(#prefix__paint23_linear)"
          style={{
            mixBlendMode: 'screen',
          }}
          opacity={0.75}
        />
      </g>
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={140.777}
          y1={243.745}
          x2={133.986}
          y2={-77.651}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={0.474} stopColor="#BEE8F5" />
          <stop offset={1} stopColor="#40AFDF" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear"
          x1={128.869}
          y1={-3.323}
          x2={134.347}
          y2={136.397}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F8C2A0" />
          <stop offset={0.15} stopColor="#C69B80" />
          <stop offset={0.38} stopColor="#806453" />
          <stop offset={0.59} stopColor="#49392F" />
          <stop offset={0.77} stopColor="#211A16" />
          <stop offset={0.91} stopColor="#090706" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear"
          x1={7692.38}
          y1={18335.1}
          x2={4489.05}
          y2={9672.61}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.22} stopColor="#EDEDED" />
          <stop offset={0.46} stopColor="#DEDEDE" />
          <stop offset={0.91} stopColor="#B7B7B7" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint3_linear"
          x1={4821.35}
          y1={1994.38}
          x2={6350.53}
          y2={2646.92}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.22} stopColor="#EDEDED" />
          <stop offset={0.46} stopColor="#DEDEDE" />
          <stop offset={0.91} stopColor="#B7B7B7" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint4_linear"
          x1={3330.95}
          y1={1672.97}
          x2={3815.6}
          y2={1794.93}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.22} stopColor="#EDEDED" />
          <stop offset={0.46} stopColor="#DEDEDE" />
          <stop offset={0.91} stopColor="#B7B7B7" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint5_linear"
          x1={6836.51}
          y1={1371.89}
          x2={7634.66}
          y2={2281.55}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.22} stopColor="#EDEDED" />
          <stop offset={0.46} stopColor="#DEDEDE" />
          <stop offset={0.91} stopColor="#B7B7B7" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint6_linear"
          x1={182.459}
          y1={53.231}
          x2={199.694}
          y2={67.153}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EEE" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint7_linear"
          x1={2338.65}
          y1={1824.49}
          x2={2562.69}
          y2={2066.16}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.22} stopColor="#EDEDED" />
          <stop offset={0.46} stopColor="#DEDEDE" />
          <stop offset={0.91} stopColor="#B7B7B7" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint8_linear"
          x1={3885.71}
          y1={2774.28}
          x2={4916.01}
          y2={3337.71}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.22} stopColor="#EDEDED" />
          <stop offset={0.46} stopColor="#DEDEDE" />
          <stop offset={0.91} stopColor="#B7B7B7" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint9_linear"
          x1={1566.67}
          y1={9840.3}
          x2={3842.65}
          y2={7732.61}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EEE" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint10_linear"
          x1={2940.65}
          y1={1357.66}
          x2={3714.74}
          y2={1613.8}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EEE" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint11_linear"
          x1={6532.26}
          y1={13824.2}
          x2={16653}
          y2={22664.9}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.16} stopColor="#EDEDED" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint12_linear"
          x1={4291.51}
          y1={3160.82}
          x2={4955.3}
          y2={3697.37}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EEE" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint13_linear"
          x1={-4329.14}
          y1={18343.6}
          x2={-1123.3}
          y2={9677.95}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.22} stopColor="#EDEDED" />
          <stop offset={0.46} stopColor="#DEDEDE" />
          <stop offset={0.91} stopColor="#B7B7B7" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint14_linear"
          x1={-2285.76}
          y1={1994.38}
          x2={-3815.06}
          y2={2646.79}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.22} stopColor="#EDEDED" />
          <stop offset={0.46} stopColor="#DEDEDE" />
          <stop offset={0.91} stopColor="#B7B7B7" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint15_linear"
          x1={-1455.1}
          y1={1672.94}
          x2={-1940.33}
          y2={1795.21}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.22} stopColor="#EDEDED" />
          <stop offset={0.46} stopColor="#DEDEDE" />
          <stop offset={0.91} stopColor="#B7B7B7" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint16_linear"
          x1={-3192.67}
          y1={1374.5}
          x2={-3992.86}
          y2={2285.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.22} stopColor="#EDEDED" />
          <stop offset={0.46} stopColor="#DEDEDE" />
          <stop offset={0.91} stopColor="#B7B7B7" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint17_linear"
          x1={-2000.53}
          y1={886.082}
          x2={-2200.77}
          y2={1141.2}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EEE" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint18_linear"
          x1={-1025.26}
          y1={1824.49}
          x2={-1249.3}
          y2={2066.16}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.22} stopColor="#EDEDED" />
          <stop offset={0.46} stopColor="#DEDEDE" />
          <stop offset={0.91} stopColor="#B7B7B7" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint19_linear"
          x1={-1821.42}
          y1={2774.28}
          x2={-2853.43}
          y2={3340.37}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.22} stopColor="#EDEDED" />
          <stop offset={0.46} stopColor="#DEDEDE" />
          <stop offset={0.91} stopColor="#B7B7B7" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint20_linear"
          x1={-6259.35}
          y1={13823.6}
          x2={-16380.1}
          y2={22664.4}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.16} stopColor="#EDEDED" />
          <stop offset={1} stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient
          id="prefix__paint21_linear"
          x1={-1325.64}
          y1={1357.66}
          x2={-2100.98}
          y2={1614.74}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EEE" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint22_linear"
          x1={-2139}
          y1={3160.82}
          x2={-2803.27}
          y2={3699.63}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EEE" />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint23_linear"
          x1={137}
          y1={188.5}
          x2={161.589}
          y2={332.497}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9CDBF5" />
          <stop offset={0.453} stopColor="#CBEBF9" stopOpacity={0.3} />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

Hell.displayName = 'Hell';

export default memo(forwardRef(Hell));
