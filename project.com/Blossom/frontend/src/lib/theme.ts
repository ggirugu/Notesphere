import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    // secondary: {
    //   main: "#fff",
    // },
    // background: {
    //   paper: "black",
    //   default: "black",
    // },
    // text: {
    //   primary: "#fff",
    // },
    background: {
      paper: "#d9dadc",
      default: "#d9dadc",
    },
  },
  typography: {
    fontWeightRegular: 500,
  },
  mixins: {
    toolbar: {
      height: "5rem",
    },
  },
});
