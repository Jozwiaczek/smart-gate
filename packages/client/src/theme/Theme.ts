export enum ThemeType {
  light,
  dark,
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
      light: '#40DF9F',
      lightText: '#fff',
      dark: '#257D69',
      darkText: '#22343C',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00',
    },
    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2',
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
    },
    text: {
      primary: themeType === ThemeType.light ? '#22343C' : '#fff',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    background: {
      default: themeType === ThemeType.light ? '#fff' : '#22343C',
      paper: themeType === ThemeType.light ? '#FBFBFB' : '#30444E',
    },
    divider: 'rgba(0,0,0,0.24)',
    boxShadow: '0 10px 34px rgba(23, 75, 83, 0.1)',
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
