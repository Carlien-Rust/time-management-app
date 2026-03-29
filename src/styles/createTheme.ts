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
    mode: 'light', // or 'dark'
    primary: {
      main: '#0ca3f5',
      light: '#e3f2fd',
      dark: '#0745a3',
    },
    secondary: {
      main: '#ef7a0c',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 20px',    
          fontWeight: 600,        
          textTransform: 'none',  
          boxShadow: 'none',      
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)', 
            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          '&:active': {
            transform: 'translateY(0)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);