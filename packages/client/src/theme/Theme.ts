import hexToRgba from '../utils/hexToRgba';

export enum ThemeType {
  light = 'light',
  dark = 'dark',
}

export enum StoredThemeType {
  light = 'light',
  dark = 'dark',
  system = 'system',
}

const getBoxShadow = (strength: number): string => `0 1px 1px rgba(0,0,0,${strength}),
              0 2px 2px rgba(0,0,0,${strength}),
              0 4px 4px rgba(0,0,0,${strength}),
              0 8px 8px rgba(0,0,0,${strength}),
              0 16px 16px rgba(0,0,0,${strength})`;

const greenLight = '#3ED598';
const greenDark = '#257D69';
const greyLight = '#96A7AF';
const greyDark = '#515151';
const white = '#fff';
const whiteDark = '#efefef';
const navyBlueDark = '#22343C';
const navyBlueLight = '#30444E';
const blue = '#40AFDF';
const red = '#D32F2F';
const orange = '#FFB400';
const dark = '#1E1E1E';
const disabledOpacity = 0.3;

export const colors = {
  greenLight,
  greenDark,
  greyLight,
  greyDark,
  white,
  whiteDark,
  navyBlueDark,
  navyBlueLight,
  blue,
  red,
  orange,
  dark,
};

export const getTheme = (themeType: ThemeType) => ({
  name: themeType,
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
      main: themeType === ThemeType.light ? greenLight : greenDark,
      mainInvert: themeType === ThemeType.light ? greenDark : greenLight,
      light: greenLight,
      dark: greenDark,
      linear: `linear-gradient(180deg, ${greenDark} 20%, ${greenLight} 80%)`,
      disabled: hexToRgba(themeType === ThemeType.light ? greenLight : greenDark, disabledOpacity),
    },
    text: {
      primary: themeType === ThemeType.light ? navyBlueDark : white,
      secondary: themeType === ThemeType.light ? greyDark : greyLight,
      light: white,
      dark: navyBlueDark,
      greyLight,
      greyDark,
      disabled: hexToRgba(themeType === ThemeType.light ? navyBlueDark : white, disabledOpacity),
    },
    background: {
      default: themeType === ThemeType.light ? whiteDark : navyBlueDark,
      paper: themeType === ThemeType.light ? white : navyBlueLight,
      paperHover:
        themeType === ThemeType.light ? hexToRgba(navyBlueLight, 0.05) : hexToRgba(whiteDark, 0.05),
      disabled: hexToRgba(navyBlueLight, disabledOpacity),
    },
    colors,
    action: {
      error: red,
      warning: orange,
    },
    divider: {
      default: themeType === ThemeType.light ? hexToRgba(greyDark, 0.1) : navyBlueLight,
      paper: hexToRgba(greyLight, 0.3),
    },
    boxShadow: {
      default: getBoxShadow(0.03),
      small: getBoxShadow(0.015),
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
