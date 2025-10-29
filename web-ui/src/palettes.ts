import { createTheme } from '@mui/material';

// <ThemeProvider theme={netherlandsTheme}>
// ...
// </ThemeProvider>
export const netherlandsTheme = createTheme({
  palette: {
    primary: {
      main: '#21468B', // Blue
    },
    secondary: {
      main: '#AE1C28', // Red
    },
    background: {
      default: '#FFFFFF', // White
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
    },
  },
  // components: {
  //   MuiAppBar: {
  //     styleOverrides: {
  //       root: {
  //         backgroundImage: "linear-gradient(to right, #AE1C28, #FFFFFF, #21468B)", // Red → White → Blue
  //       },
  //     },
  //   },
  // },
});
