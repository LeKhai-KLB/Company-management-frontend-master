import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TWrapperProps } from "~utils/mixins.type";

const MUITheme = createTheme({
  palette: {
    primary: {
      main: "#3f4154",
    },
  },
  typography: {
    fontFamily: ["poppins", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
});

export const MUIThemeProvider = ({ children }: TWrapperProps) => {
  return <ThemeProvider theme={MUITheme}>{children}</ThemeProvider>;
};
