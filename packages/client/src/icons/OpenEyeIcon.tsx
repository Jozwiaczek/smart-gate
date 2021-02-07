import React, { forwardRef, memo, Ref, SVGProps } from 'react';

const OpenEyeIcon = (props: SVGProps<SVGSVGElement>, svgRef?: Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 18 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path
      d="M16.152 9.53a1 1 0 001.696-1.06l-1.696 1.06zm-.558-3.91a1 1 0 00-1.403 1.426l1.403-1.426zM.152 8.47a1 1 0 101.696 1.06L.152 8.47zm3.657-1.424A1 1 0 102.406 5.62L3.81 7.046zm-1.44-.04A1 1 0 003.846 5.66L2.368 7.007zm-.63-3.659A1 1 0 10.261 4.695l1.478-1.348zm.667 2.273A1 1 0 103.81 7.046L2.406 5.62zm4.678-.647a1 1 0 10-.613-1.904l.613 1.904zm7.07.687a1 1 0 001.477 1.347L14.153 5.66zm3.585-.965a1 1 0 00-1.478-1.348l1.478 1.348zm-3.548 2.351a1 1 0 001.403-1.426L14.19 7.046zM11.528 3.07a1 1 0 00-.613 1.904l.614-1.904zm-5.71 1.234a1 1 0 101.92-.564l-1.92.564zM6.848.718a1 1 0 10-1.918.564L6.848.718zm-.377 2.351a1 1 0 00.613 1.904l-.613-1.904zm4.444 1.904a1 1 0 00.614-1.904l-.614 1.904zm-.652-1.234a1 1 0 101.918.564l-1.918-.564zm2.807-2.457a1 1 0 10-1.918-.564l1.918.564zm4.778 7.188a15.516 15.516 0 00-2.254-2.85L14.19 7.046a13.525 13.525 0 011.961 2.484l1.696-1.06zm-16 1.06a13.519 13.519 0 011.96-2.484L2.407 5.62A15.513 15.513 0 00.152 8.47l1.696 1.06zm1.999-3.87L1.739 3.347.261 4.695l2.107 2.312L3.847 5.66zm-.038 1.386C4.862 6.01 5.975 5.33 7.084 4.973l-.613-1.904C5.024 3.535 3.65 4.397 2.406 5.62L3.81 7.046zm11.822-.039l2.108-2.312-1.478-1.348-2.108 2.313 1.478 1.347zm-.037-1.387c-1.244-1.223-2.619-2.085-4.066-2.55l-.613 1.903c1.11.357 2.223 1.037 3.276 2.073l1.403-1.426zM7.737 3.74L6.848.718l-1.918.564.888 3.021 1.92-.564zm-.653 1.234a6.146 6.146 0 013.831 0l.614-1.904a8.145 8.145 0 00-5.058 0l.613 1.904zm5.097-.67l.89-3.02-1.92-.565-.888 3.02 1.918.565z"
      fill="currentColor"
    />
    <path
      d="M1.848 8.47A1 1 0 10.152 9.53l1.696-1.06zm.558 3.91a1 1 0 101.403-1.426l-1.403 1.425zm15.442-2.85a1 1 0 00-1.696-1.06l1.696 1.06zm-3.657 1.424a1 1 0 101.403 1.425l-1.403-1.425zm1.403 1.425a1 1 0 00-1.403-1.425l1.403 1.425zm-4.678.648a1 1 0 00.613 1.904l-.613-1.904zm-7.107-2.073a1 1 0 00-1.403 1.425l1.403-1.425zm2.663 3.977a1 1 0 00.613-1.904l-.613 1.904zm5.057 0a1 1 0 10-.613-1.904l.613 1.904zm-4.444-1.904a1 1 0 10-.614 1.904l.614-1.904zM.152 9.53a15.517 15.517 0 002.254 2.85l1.403-1.426A13.523 13.523 0 011.848 8.47L.152 9.53zm16-1.06a13.518 13.518 0 01-1.96 2.484l1.402 1.425a15.513 15.513 0 002.254-2.849l-1.696-1.06zm-1.96 2.484c-1.054 1.036-2.167 1.716-3.276 2.073l.613 1.904c1.447-.466 2.821-1.328 4.065-2.551l-1.403-1.426zM2.405 12.379c1.244 1.224 2.619 2.086 4.066 2.552l.613-1.904c-1.11-.357-2.223-1.037-3.276-2.073l-1.403 1.425zm8.51.648a6.146 6.146 0 01-3.831 0l-.614 1.904a8.146 8.146 0 005.058 0l-.613-1.904z"
      fill="currentColor"
    />
    <circle cx={9} cy={9} r={2} fill="currentColor" />
  </svg>
);

export default memo(forwardRef(OpenEyeIcon));
