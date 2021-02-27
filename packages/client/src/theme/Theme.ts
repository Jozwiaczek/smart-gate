export enum ThemeType {
  light = 'light',
  dark = 'dark',
}

export const getTheme = (themeType: ThemeType) => ({
  type: themeType,
  breakpoints: {
    xs: 0,
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
      main: themeType === ThemeType.light ? '#3ED598' : '#257D69',
      light: '#3ED598',
      dark: '#257D69',
      linear: 'linear-gradient(180deg, #257D69 17.63%, #40DF9F 78.98%)',
    },
    text: {
      primary: themeType === ThemeType.light ? '#22343C' : '#fff',
      secondary: themeType === ThemeType.light ? '#515151' : '#96A7AF',
      light: '#fff',
      dark: '#22343C',
      greyLight: '#96A7AF',
      greyDark: '#515151',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    background: {
      default: themeType === ThemeType.light ? '#fff' : '#22343C',
      paper: themeType === ThemeType.light ? '#FBFBFB' : '#30444E',
      disabled: 'rgba(0, 0, 0, 0.12)',
    },
    colors: {
      red: '#D32F2F',
      orange: '#FFB400',
    },
    error: '#D32F2F',
    warning: '#FFB400',
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
    },
    divider: {
      default: themeType === ThemeType.light ? '#EAECED' : '#30444E',
    },
    boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
    labelOpacity: 0.7,
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
