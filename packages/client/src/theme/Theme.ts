import { createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const DefaultTheme = createMuiTheme({
  palette: {
    primary: blue,
  },
  shape: {
    borderRadius: 10,
  },
});

export default DefaultTheme;

export type ITheme = typeof DefaultTheme;
