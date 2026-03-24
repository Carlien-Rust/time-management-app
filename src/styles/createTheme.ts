import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { breakpoints } from "./core/breakpoints";

// Minimal placeholder for the layout options
export interface LayoutOptions {
  headerHeight: number;
}

declare module "@mui/material/styles" {
  interface Theme {
    layout: LayoutOptions;
  }
  interface ThemeOptions {
    layout?: LayoutOptions;
  }
}

let theme = createTheme({
  breakpoints,
  palette: {
    primary: { main: '#0ca3f5' },
    secondary: { main: '#ef7a0c' },
  },
  layout: {
    headerHeight: 64,
  },
  shape: {
    borderRadius: 4,
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

export default responsiveFontSizes(theme);