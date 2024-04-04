import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#f7f7f7',
    },
    text: {
      primary: '#212121',
      secondary: '#5f6368',
    },
  },
  
});

export const darkTheme = createTheme({
  palette: {

    mode: 'dark',
    background: {
      default: 'rgb(0, 8, 11)',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '&:after': {
            color: 'white', 
          },
        },
      },
    },
  },

});
