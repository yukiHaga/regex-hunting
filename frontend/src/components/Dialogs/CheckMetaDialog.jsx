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

// スライドアニメーション関係の関数
import { slideFunction } from '../../functions/slideFunction.js';

// コードブロック関係
import { CodeBlockWrapper } from '../shared_style.js';
import { CodeBlockDiv } from '../shared_style.js';
import { CodeLineWrapper } from '../shared_style.js';
import { BlankLineWrapper } from '../shared_style.js';
import { ComentLineWrapper } from '../shared_style.js';
import { CodeRedSpan } from '../shared_style.js';
import { CodeYellowSpan } from '../shared_style.js';
import { CodeBlueSpan } from '../shared_style.js';
import { CodeComentSpan } from '../shared_style.js';

// テーブルの行のデータ
import { characterClassesRows } from './dataRows.js'
import { quantifiersRows } from './dataRows.js'
import { groupsRows } from './dataRows.js'

const CustomDialogInnerWrapper = styled.div`
  padding-right: 3%;
  padding-left: 3%;
  padding-top: 2%;
  background-color: ${COLORS.SUB};
  width: 75vw;
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

const NonGreedyName = styled.div`
  font-size: 1em;
`;

const ExampleData = styled.div`
  font-size: 1em;
  margin-top: 1.5%;
  margin-bottom: 0.5%;
`;

const CustomCodeBlockWrapper = styled(CodeBlockWrapper)`
  margin-top: 0.8%;
`;

const CustomUl = styled.ul`

`;

const CustomLi = styled.li`

`;

// animationプロパティは1つしか存在できない
// 2個存在する場合、2個目で1個目が上書きされる
const SlideContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  transform: translateX(0);
  animation: ${({ 
    slide_in, 
    slide_out,
    direction
  }) => slideFunction(slide_in, slide_out, direction)} 0.7s ease forwards;
`;

// click_meta_openがtrueの時に開くモーダル
export const CheckMetaDialog = ({
  isOpen,
  setGameState
}) => {

  const initialState = {
    name: '文字クラス',
    data: characterClassesRows,
    slide_in: false,
    slide_out: false,
    direction: "",
  };

  const [rowState, setRowState] = useState(initialState);

  // テーブルのデータを制御する関数
  // 右カーソルか左カーソルをクリックするとこれが呼び出される
  const handleDataRows = (
    name,
    data,
    direction
  ) => {
    setRowState((prev) => ({
      ...prev,
      slide_in: false,
      slide_out: true,
      direction: direction,
    }));
    setTimeout(() => {
      setRowState((prev) => ({
        ...prev,
        name: name,
        data: data,
        slide_in: true,
        slide_out: false,
        direction: direction,
      }));
    }, 350);
  };

  // 左矢印のリンクを制御する関数
  // difficulty_month_titleは初め初級が入る
  // そのため、defaultは上級の関数が実行される
  const handleLeftArrow = ({name}) => {
    switch (name){
      case '量指定子':
        handleDataRows('文字クラス', characterClassesRows, 'right')
        break;
      case 'キャプチャグループ':
        handleDataRows('量指定子', quantifiersRows, 'right')
        break;
      default:
        handleDataRows('文字クラス', characterClassesRows, 'right')
    }
  };

  // 右矢印のリンクを制御する関数
  const handleRightArrow = ({name}) => {
    switch (name){
      case '文字クラス':
        handleDataRows('量指定子', quantifiersRows, 'left');
        break;
      case '量指定子':
        handleDataRows('キャプチャグループ', groupsRows, 'left');
        break;
      default:
        handleDataRows('量指定子', quantifiersRows, 'left');
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
        <DialogContent
          sx={{
            overflowX: "hidden"
          }}
        >
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
            <SlideContentWrapper
              slide_in={rowState.slide_in}
              slide_out={rowState.slide_out}
              direction={rowState.direction}
            >
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
                          {
                            row.name === '??' &&
                              <>
                                <NonGreedyName>+?</NonGreedyName>
                                <NonGreedyName>*?</NonGreedyName>
                                <NonGreedyName>{'{'}n{'}'}?</NonGreedyName>
                                <NonGreedyName>{'{'}n,{'}'}?</NonGreedyName>
                                <NonGreedyName>{'{'}n,m{'}'}?</NonGreedyName>
                              </>
                          }
                        </StyledTableCell>
                        <StyledTableDataCell>
                          {row.data}
                          {
                            row.example &&
                              <ExampleData>{`ex) ${row.example}`}</ExampleData>
                          }
                          {
                            row.example === 'ターゲットテキストがsome <foo> <bar> new </bar> </foo> thingの場合' &&
                              <CustomCodeBlockWrapper>
                                <CodeBlockDiv> 
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'some {'<'}foo{'>'} {'<'}bar{'>'} new {'<'}/bar{'>'} {'<'}/foo{'>'} thing'</CodeYellowSpan>;
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> regex_pattern_1 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/{'<'}.*{'>'}/g</CodeYellowSpan>; <CodeComentSpan>{'//'} 最大量指定子を用いた正規表現</CodeComentSpan>
                                  </CodeLineWrapper>
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> regex_pattern_2 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/{'<'}.*?{'>'}/g</CodeYellowSpan>; <CodeComentSpan>{'//'} 最小量指定子を用いた正規表現</CodeComentSpan>
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <ComentLineWrapper>
                                  </ComentLineWrapper>
                                  <CodeLineWrapper>
                                    console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern_1));
                                  </CodeLineWrapper>
                                  <ComentLineWrapper>
                                    {'// => '} ['{'<'}foo{'>'} {'<'}bar{'>'} new {'<'}/bar{'>'} {'<'}/foo{'>'}']
                                  </ComentLineWrapper>
                                  <BlankLineWrapper />
                                  <CodeLineWrapper>
                                    console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern_2));
                                  </CodeLineWrapper>
                                  <ComentLineWrapper>
                                    {'// => '} ['{'<'}foo{'>'}', '{'<'}bar{'>'}', '{'<'}/bar{'>'}', '{'<'}/foo{'>'}']
                                  </ComentLineWrapper>
                                </CodeBlockDiv>
                              </CustomCodeBlockWrapper>
                          }
                          {
                            row.name === '(...)' &&
                              <>
                                <CustomUl>
                                  <CustomLi>
                                    量指定子の対象となるグループを作る
                                  </CustomLi>
                                  <CustomLi>
                                    選択の範囲を限定する
                                  </CustomLi>
                                  <CustomLi>
                                    後方参照のためにキャプチャ(マッチした文字列を記憶)する
                                  </CustomLi>
                                </CustomUl>
                                キャプチャグループを使用すると、複数の文字列を1つのグループにできます。そして、グループ部分にマッチする文字列が存在する場合、その文字列をキャプチャ(マッチした文字列を記憶)します。キャプチャした文字列は、正規表現中のキャプチャした位置より後ろで利用することができます(後方参照)。また、グループを作りたいがキャプチャ機能は不要な場合、非キャプチャグループを使用します。パフォーマンスを考えると、キャプチャ機能が不要な場合、非キャプチャグループを使用した方がいいです。しかし、本サービスでは、厳密性よりも見やすさと分かりやすさを重視している為、基本的には非キャプチャグループではなく、キャプチャグループを使用します。
                              </>
                          }
                          {
                            row.example === 'ターゲットテキストがThis is "<span>React</span>"の場合' &&
                              <CustomCodeBlockWrapper>
                                <CodeBlockDiv> 
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'This is "{'<'}span{'>'}React{'<'}/span{'>'}"'</CodeYellowSpan>;
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <ComentLineWrapper>
                                    {'// '}キャプチャした文字列を、{'\\'}1で呼び出します。
                                  </ComentLineWrapper>
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> regex_pattern <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/{'<'}(span){'>'}.*?{'<'}\/{'\\'}1{'>'}/g</CodeYellowSpan>;
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <ComentLineWrapper>
                                  </ComentLineWrapper>
                                  <CodeLineWrapper>
                                    console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern));
                                  </CodeLineWrapper>
                                  <ComentLineWrapper>
                                    {'// => '} ['{'<'}span{'>'}React{'<'}/span{'>'}'] ]
                                  </ComentLineWrapper>
                                </CodeBlockDiv>
                              </CustomCodeBlockWrapper>
                          }
                          {
                            row.example === 'ターゲットテキストがThis is "Regex Hunting"の場合' &&
                              <CustomCodeBlockWrapper>
                                <CodeBlockDiv> 
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'This is "Regex Hunting"'</CodeYellowSpan>;
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <ComentLineWrapper>
                                    {'// '}名前付きキャプチャした文字列を、\k{'<'}quote{'>'}で呼び出します。
                                  </ComentLineWrapper>
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> regex_pattern <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/(?{'<'}quote{'>'}['"])(.*?)\k{'<'}quote{'>'}/g</CodeYellowSpan>;
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <ComentLineWrapper>
                                  </ComentLineWrapper>
                                  <CodeLineWrapper>
                                    console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern));
                                  </CodeLineWrapper>
                                  <ComentLineWrapper>
                                    {'// => '} ['"Regex Hunting"']
                                  </ComentLineWrapper>
                                </CodeBlockDiv>
                              </CustomCodeBlockWrapper>
                          }
                        </StyledTableDataCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </SlideContentWrapper>
          </SectionWrapper>
        </DialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
