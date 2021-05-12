import { createMuiTheme } from '@material-ui/core/styles';

//https://material-ui.com/components/material-icons/ REFERENCIA ICONOS
// use default theme
// const theme = createMuiTheme();

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#2064EC',
        dark: '#F3923C',
        light: '#E2E3E4',
      },
    secondary: {
      main: '#0BCE64'
    },
  }
});

export default theme;