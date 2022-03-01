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

const StyledTableRow = styled(TableRow)`
  color: ${COLORS.BLACK};
`;

const StyledTableHead = styled(TableHead)`
  background-color: ${COLORS.MAIN};
`;

const StyledTableHeadCell = styled(StyledTableCell)`
  color: ${COLORS.WHITE};
`;

// データを作成する関数
const createData = (id, name, data) => {
  return {
    id: id,
    name: name,
    data: data,
  }
};

// テーブルのデータ
const rows = [
  createData(1, '[...]', '指定した文字のどれか1文字を表します。'),
  createData(2, '\\d', '1桁の数字を表します。[0-9]で書き換え可能です。'),
  createData(3, '\\w', 'アンダースコアを含む半角英数字1文字を表します。[A-Za-z0-9_]で書き換え可能です。')
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
                        <StyledTableCell>{row.data}</StyledTableCell>
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
