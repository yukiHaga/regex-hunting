import { createTheme } from '@mui/material/styles';

// Colors
import { COLORS } from '../style_constants.js';

const theme = createTheme({
  palette: {
    green: {
      main: COLORS.MAIN,
    },
  },
});

export default theme;
