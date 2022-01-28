import { createTheme } from '@mui/material/styles';

// Colors
import { COLORS } from '../style_constants.js';


/*
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: COLORS.MAIN,
        },
      },
    },
  },
*/

const theme = createTheme({
  palette: {
    green: {
      main: COLORS.MAIN,
    },
  },
});

export default theme;
