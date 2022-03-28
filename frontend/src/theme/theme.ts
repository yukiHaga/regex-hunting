import { createTheme } from '@mui/material/styles';

// Colors
import { COLORS } from '../style_constants.js';

const fontFamily = [
  'Avenir',
  '"Helvetica Neue"',
  'Helvetica',
  'Arial',
  '"Hiragino Sans"',
  'ヒラギノ角ゴシック',
  '"Yu Gothic"',
  'メイリオ',
  'Meiryo',
  '"ＭＳ Ｐゴシック"',
  '"MS PGothic"'
].join(',');

const theme = createTheme({
  typography: {
    fontFamily: fontFamily,
  },
  components: {
    // Name of the component
    MuiAppBar: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: COLORS.MAIN,
        },
      },
    },
  },
});

export default theme;
