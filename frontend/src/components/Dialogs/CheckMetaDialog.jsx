import React from 'react';
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

const CustomDialogInnerWrapper = styled.div`
  padding-right: 3%;
  padding-left: 3%;
  padding-top: 2%;
  background-color: ${COLORS.SUB};
  width: 70vw;
`;

const CustomDialogContent = styled(DialogContent)`
`;

// backボタンのラッパー 
// backボタンを固定してる
const BackToModalButtonWrapper = styled.div`
  position: fixed;
  z-index: 2;
`;

const SectionWrapper = styled.div`
  margin-top: 4%;
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

// テーブルのデータ
const rows = [
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

// click_meta_openがtrueの時に開くモーダル
export const CheckMetaDialog = ({
  isOpen,
  setGameState
}) => {

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
        <CustomDialogContent>
          <SectionWrapper>
            <Toolbar>
              <Typography
                variant="h6"
                id="tableTitle"
                component="div"
              >
                文字クラス
              </Typography>
            </Toolbar>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <StyledTableHead>
                    <TableRow>
                      <StyledTableHeadCell align="center">特殊文字</StyledTableHeadCell>
                      <StyledTableHeadCell>意味</StyledTableHeadCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {rows.map((row) => (
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
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
