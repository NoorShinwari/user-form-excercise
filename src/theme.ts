import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const PRIMARY = {
  lighter: "#7a93e0",
  light: "#4766ae",
  main: "#013c7e",
  dark: "#001751",
  darker: "#000029",
  contrastText: "#fff",
};
const SECONDARY = {
  lighter: "#ffa8ee",
  light: "#ff75bc",
  main: "#e83e8c",
  dark: "#b1005f",
  darker: "#7c0036",
  contrastText: "#fff",
};
const INFO = {
  lighter: "#93f4ff",
  light: "#3DAFE3",
  main: "#0091c0",
  dark: "#00638f",
  darker: "#003961",
  contrastText: "#fff",
};
const SUCCESS = {
  lighter: "#C8E6C9",
  light: "#64da73",
  main: "#28a745",
  dark: "#007717",
  darker: "#004a00",
};
const WARNING = {
  lighter: "#ffff88",
  light: "#ffff54",
  main: "#ffe100",
  dark: "#c7b000",
  darker: "#928100",
};
const ERROR = {
  lighter: "#ff8465",
  light: "#fd5039",
  main: "#c20d0e",
  dark: "#890000",
  darker: "#570000",
  contrastText: "#fff",
};
const theme = createTheme({
  shape: {
    borderRadius: 12,
  },
  palette: {
    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    info: { ...INFO },
    success: { ...SUCCESS },
    warning: { ...WARNING },
    error: { ...ERROR },
  },
});

export default theme;
