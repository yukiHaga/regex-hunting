import { createTheme } from '@mui/material/styles';

// Colors
import { COLORS } from '../style_constants.js';

const font_family = [
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
  palette: {
    green: {
      main: COLORS.MAIN,
    },
  },
  typography: {
    fontFamily: font_family,
  },
});

export default theme;
