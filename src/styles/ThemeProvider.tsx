// ./src/styles/ThemeProvider.tsx

import {CssBaseline, ThemeProvider} from "@mui/material";
import React, {type ReactNode} from "react";
import theme from "./createTheme";

interface IThemeProviderWrapper {
  children: ReactNode;
}

const ThemeProviderWrapper: React.FC<IThemeProviderWrapper> = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;