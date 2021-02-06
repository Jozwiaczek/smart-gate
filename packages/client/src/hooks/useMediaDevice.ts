import useMediaQuery from './useMediaQuery';

interface MediaDevices {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isUltraWide: boolean;
}

const useMediaDevice = (): MediaDevices => {
  const isMobile = useMediaQuery(({ down, breakpoints: { sm } }) => down(sm));
  const isTablet = useMediaQuery(({ upDown, breakpoints: { sm, md } }) => upDown(sm, md));
  const isDesktop = useMediaQuery(({ upDown, breakpoints: { md, xl } }) => upDown(md, xl));
  const isUltraWide = useMediaQuery(({ up, breakpoints: { xl } }) => up(xl));

  return { isMobile, isTablet, isDesktop, isUltraWide };
};

export default useMediaDevice;
