import { createTheme } from '@mui/material/styles';

// Colors
import { COLORS } from '../style_constants.js';

const theme = createTheme({
  palette: {
    green: {
      main: COLORS.MAIN,
    },
  },
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          bgcolor: COLORS.MAIN
        },
      },
    },
  },
});

export default theme;
