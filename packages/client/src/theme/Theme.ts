import hexToRgba from '../utils/hexToRgba';

export enum ThemeType {
  light = 'light',
  dark = 'dark',
}

const getBoxShadow = (strength: number): string => `0 1px 1px rgba(0,0,0,${strength}),
              0 2px 2px rgba(0,0,0,${strength}),
              0 4px 4px rgba(0,0,0,${strength}),
              0 8px 8px rgba(0,0,0,${strength}),
              0 16px 16px rgba(0,0,0,${strength})`;

const primaryLight = '#3ED598';
const primaryDark = '#257D69';
const greyLight = '#96A7AF';
const greyDark = '#515151';
const disabledOpacity = 0.3;

export const getTheme = (themeType: ThemeType) => ({
  type: themeType,
  breakpoints: {
    xs: 375,
    sm: 600,
    md: 960,
    lg: 1120,
    xl: 1920,
  },
  sizes: {
    borderRadius: '12px',
  },
  palette: {
    primary: {
      main: themeType === ThemeType.light ? primaryLight : primaryDark,
      mainInvert: themeType === ThemeType.light ? primaryDark : primaryLight,
      light: primaryLight,
      dark: primaryDark,
      linear: 'linear-gradient(180deg, #257D69 17.63%, #40DF9F 78.98%)',
      disabled: hexToRgba(
        themeType === ThemeType.light ? primaryLight : primaryDark,
        disabledOpacity,
      ),
    },
    text: {
      primary: themeType === ThemeType.light ? '#22343C' : '#fff',
      secondary: themeType === ThemeType.light ? greyDark : greyLight,
      light: '#fff',
      dark: '#22343C',
      greyLight,
      greyDark,
      disabled: hexToRgba(themeType === ThemeType.light ? '#22343C' : '#fff', disabledOpacity),
    },
    background: {
      default: themeType === ThemeType.light ? '#fff' : '#22343C',
      paper: themeType === ThemeType.light ? '#FBFBFB' : '#30444E',
      disabled: hexToRgba('#30444E', disabledOpacity),
    },
    colors: {
      blue: '#40AFDF',
      red: '#D32F2F',
      orange: '#FFB400',
    },
    action: {
      error: '#D32F2F',
      warning: '#FFB400',
    },
    divider: {
      default: themeType === ThemeType.light ? '#EAECED' : '#30444E',
    },
    boxShadow: {
      default: getBoxShadow(0.04),
      small: getBoxShadow(0.02),
      big: getBoxShadow(0.08),
      getBoxShadow,
    },
    opacity: {
      label: 0.7,
      disabled: disabledOpacity,
    },
  },
  up: (breakpoint: number, vertical = false) =>
    `@media (min-${vertical ? 'height' : 'width'}: calc(${breakpoint}px + 1px))`,
  down: (breakpoint: number, vertical = false) =>
    `@media (max-${vertical ? 'height' : 'width'}: ${breakpoint}px)`,
  upDown: (breakpointUp: number, breakpointDown: number, vertical = false) =>
    `@media (min-${vertical ? 'height' : 'width'}: calc(${breakpointUp}px + 1px)) and (max-${
      vertical ? 'height' : 'width'
    }: ${breakpointDown}px)`,
});

export type ITheme = ReturnType<typeof getTheme>;
