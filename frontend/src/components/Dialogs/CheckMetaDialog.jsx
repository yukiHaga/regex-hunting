import { useState } from 'react';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// 戻るボタン
import { BackToModalButton } from '../Buttons/BackToModalButton.jsx';

// NextButton
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// PrevButton
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import IconButton from '@mui/material/IconButton';

const CustomDialogInnerWrapper = styled.div`
  padding-right: 3%;
  padding-left: 3%;
  padding-top: 2%;
  background-color: ${COLORS.SUB};
  width: 70vw;
`;

// backボタンのラッパー 
// backボタンを固定してる
const BackToModalButtonWrapper = styled.div`
  position: fixed;
  z-index: 2;
`;

const SectionWrapper = styled.div`
  margin-top: 1.5%;
  margin-bottom: 2%;
`;

// background-color: ${({key}) => key % 2 === 0 ? COLORS.WHITE : COLORS.WHITE}
const StyledTableCell = styled(TableCell)`
  font-size: 1em;
`;

// background-color: ${({key}) => key % 2 === 0 ? COLORS.WHITE : COLORS.WHITE}
const StyledTableDataCell = styled(TableCell)`
  font-size: 1em;
  width: 86%;  
`;

const StyledTableRow = styled(TableRow)`
  color: ${COLORS.BLACK};
`;

const StyledTableHead = styled(TableHead)`
  background-color: ${COLORS.MAIN};
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const StyledTableHeadCell = styled(StyledTableCell)`
  color: ${COLORS.WHITE};
`;

const ExampleData = styled.div`
  font-size: 1em;
  margin-top: 2%;
  margin-bottom: 1%;
`;

// データを作成する関数
const createData = (id, name, data, example) => {
  return {
    id: id,
    name: name,
    data: data,
    example: example
  }
};

// 文字クラスのデータ
const characterClassesRows = [
  createData(1, '[...]', '指定した文字のどれか1文字にマッチします。ハイフンを使用して文字の範囲を指定することもできます。文字クラスの中に\\d等を書くこともできます。', 'ex) [aq],  [a-z],  [E\\d]'),
  createData(2, '[^...]', '[^...]は否定文字クラスという特殊文字です。指定した文字以外の1文字にマッチします。例えば、[^A]はA以外の1文字、[^ABC]はA、B、C以外の1文字にマッチします。[^ABC]は[^A-C]に書き換え可能です。', 'ex) [aq],  [a-z],  [E\\d]'),
  createData(3, '\\d', '1桁の数字にマッチします。[0-9]で書き換え可能です。', false),
  createData(4, '\\w', 'アンダースコアを含む半角英数字1文字にマッチします。\\wは[A-Za-z0-9_]に書き換え可能です。', false),
  createData(5, '.', '行末文字(\\n、\\r、\\u2028、\\u2029)を除くあらゆる1文字にマッチします。注意すべきことは、文字クラス([...])内で.を使用すると、ただの文字列として扱われることです。', false),
  createData(6, '\\s', 'スペース、タブ、改ページ、改行を含むホワイトスペース文字にマッチします。', false),
  createData(7, '\\t', 'タブにマッチします。', false),
  createData(8, '\\r', '復帰文字にマッチします。', false),
  createData(9, '\\n', '改行文字にマッチします。', false),
  createData(10, '\\D', 'あらゆる数字以外の文字にマッチします。\\Dは[^0-9]に書き換え可能です。', false),
  createData(11, '\\W', 'アンダースコアを含む半角英数字以外の1文字にマッチします。\\Wは[^A-Za-z0-9_]に書き換え可能です。', false),
  createData(12, '\\S', 'ホワイトスペース以外の文字にマッチします。', false),
  createData(13, '\\', 'ある文字の前に\\を書くことで、ある文字をエスケープすることができます。エスケープ対象の文字が特殊文字であるか、または、エスケープ対象の文字と\\の組み合わせに特別な意味がなければ、エスケープ対象の文字が、ただの文字としてマッチするようになります。', false),
];

// 量指定子のデータ
const quantifiersRows = [
  createData(1, '?', '直前の1文字があればマッチさせるが、なくてもよいという意味を表します。1つの文字クラスは1つの単位を表すので、括弧をつけなくても量指定子を指定することができます。2文字以上の文字列を繰り返しマッチさせたい場合、括弧で括ってから量指定子を指定します。', 'ex) n?,  [aq]?,  [a-z]?,  (Script)?'),
  createData(2, '+', '直前の1文字に1回以上の繰り返しマッチという意味を表します。', 'ex) o+,  [a-z]+,  (12)+'),
  createData(3, '*', '直前の1文字に0回以上の繰り返しマッチという意味を表します。', 'ex) o*,  [a-z]*,  (12)*'),
  createData(4, '{min}', '直前の1文字に{min}回繰り返しマッチという意味を表します。', 'ex) \\d{3}'),
  createData(5, '{min,}', '直前の1文字に{min}回以上の繰り返しマッチという意味を表します。', 'ex) \\d{3,}'),
  createData(6, '{min,max}', '直前の1文字にmin回以上、max回以下の繰り返しマッチという意味を表します。', 'ex) \\d{2,3}'),
];


// click_meta_openがtrueの時に開くモーダル
export const CheckMetaDialog = ({
  isOpen,
  setGameState
}) => {

  const initialState = {
    name: '文字クラス',
    data: characterClassesRows
  };

  const [rowState, setRowState] = useState(initialState);

  // rowStateを文字クラスのデータにする関数
  const handleCharacterClassesRows = () => {
    setRowState((prev) => ({
      ...prev,
      name: '文字クラス',
      data: characterClassesRows
    }));
  };

  // rowStateを量指定子のデータにする関数
  const handleQuantifiersRows = () => {
    setRowState((prev) => ({
      ...prev,
      name: '量指定子',
      data: quantifiersRows
    }));
  };

  // 左矢印のリンクを制御する関数
  // difficulty_month_titleは初め初級が入る
  // そのため、defaultは上級の関数が実行される
  const handleLeftArrow = ({name}) => {
    switch (name){
      case '量指定子':
        handleCharacterClassesRows();
        break;
      default:
        handleQuantifiersRows();
    }
  };

  // 右矢印のリンクを制御する関数
  const handleRightArrow = ({name}) => {
    switch (name){
      case '文字クラス':
        handleQuantifiersRows();
        break;
      default:
        handleQuantifiersRows();
    }
  };

  return(
    <Dialog
      open={isOpen}
      maxWidth='xl'
    >
      <CustomDialogInnerWrapper> 
        <BackToModalButtonWrapper>
          <BackToModalButton 
            onClick={
              () => setGameState((prev) => ({
                ...prev,
                click_meta_open: false
              }))
            }
          />
        </BackToModalButtonWrapper>
        <DialogContent>
          <SectionWrapper>
            <Toolbar
              sx={{justifyContent: 'center'}}
            >
              <IconButton
                sx={{
                  fontSize: '2.5em'
                }}
              >
                <ArrowLeftIcon
                  fontSize='inherit' 
                  sx={{ color: `${COLORS.BLACK}` }}
                  onClick={() => handleLeftArrow(rowState)}
                />
              </IconButton>
              <Typography
                variant="h6"
                id="tableTitle"
                component="div"
                align="center"
              >
                {rowState.name}
              </Typography>
              <IconButton
                sx={{
                  fontSize: '2.5em'
                }}
              >
                <ArrowRightIcon
                  fontSize='inherit' 
                  sx={{ color: `${COLORS.BLACK}` }}
                  onClick={() => handleRightArrow(rowState)}
                />
              </IconButton>
            </Toolbar>
              <TableContainer component={Paper} sx={{ maxHeight: 490 }}>
                <Table aria-label="customized table">
                  <StyledTableHead>
                    <TableRow>
                      <StyledTableHeadCell align="center">特殊文字</StyledTableHeadCell>
                      <StyledTableHeadCell>意味</StyledTableHeadCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {rowState.data.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell align="center" component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableDataCell>
                          {row.data}
                          {
                            row.example &&
                              <ExampleData>{row.example}</ExampleData>
                          }
                        </StyledTableDataCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </SectionWrapper>
        </DialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
