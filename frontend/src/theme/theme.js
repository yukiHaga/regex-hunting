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
    MuiCssBaseline: {
      styleOverrides: `
        body {
          font-family: 'Avenir','Helvetica Neue','Helvetica','Arial','Hiragino Sans','ヒラギノ角ゴシック',YuGothic,'Yu Gothic','メイリオ', Meiryo,'ＭＳ Ｐゴシック','MS PGothic'; 
        }
      `,
    },
  },
});

export default theme;
