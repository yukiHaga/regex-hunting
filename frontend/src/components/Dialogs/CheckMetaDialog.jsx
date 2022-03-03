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
import { characterClassesRows } from './dataRows.js';
import { quantifiersRows } from './dataRows.js';
import { groupsRows } from './dataRows.js';
import { alternationsRows } from './dataRows.js';
import { lookAroundsRows } from './dataRows.js';

// 説明スライドのワーニングセンテンス
import { WarningSentenceWrapper } from '../shared_style.js';

const CustomDialogInnerWrapper = styled.div`
  padding-right: 3%;
  padding-left: 3%;
  padding-top: 2%;
  background-color: ${COLORS.SUB};
  width: 83vw;
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

const StyledTableCell = styled(TableCell)`
  font-size: 1em;
`;

const StyledTableDataCell = styled(TableCell)`
  font-size: 1em;
  width: 86%;  
  text-align: justify;
  text-justify: inter-ideograph;
`;

const StyledDescriptionDiv = styled.div`
  font-size: 1em;
  margin-top: 4%;
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

const CustomUl = styled.ul``;

const CustomLi = styled.li``;

const CustomTitle = styled.div`
  width: 15vw;
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

const CustomWarningSentenceWrapper = styled(WarningSentenceWrapper)`
  font-size: 1.0em;
  margin-top: 0.5%;
`;  

const CustomCodeBlockDiv = styled(CodeBlockDiv)`
  font-size: 1.0em;
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
      case 'キャプチャグループ':
        handleDataRows('選択', alternationsRows, 'left');
        break;
      case '選択':
        handleDataRows('先後読み', lookAroundsRows, 'left');
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
                component={CustomTitle}
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
                            row.example === 'ターゲット文字列がhttps://www.regex-hunting.com/gamesの場合' &&
                              <CustomWarningSentenceWrapper>   
                                ※ IEとSafariは肯定の後読みをサポートしていません。その点を注意していただくようお願いします。
                              </CustomWarningSentenceWrapper>   
                          }
                          {
                            row.example === 'ターゲット文字列がReact17.0 React16.0 React15.6の場合' &&
                              <CustomWarningSentenceWrapper>   
                                ※ IEとSafariは否定の後読みをサポートしていません。その点を注意していただくようお願いします。
                              </CustomWarningSentenceWrapper>   
                          }
                          {
                            row.example &&
                              <ExampleData>{`ex) ${row.example}`}</ExampleData>
                          }
                          {
                            row.example === 'ターゲット文字列がsome <foo> <bar> new </bar> </foo> thingの場合' &&
                              <CustomCodeBlockWrapper>
                                <CustomCodeBlockDiv> 
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
                                </CustomCodeBlockDiv>
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
                            row.example === 'ターゲット文字列がThis is "<span>React</span>"の場合' &&
                              <CustomCodeBlockWrapper>
                                <CustomCodeBlockDiv> 
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
                                  <CodeLineWrapper>
                                    console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern));
                                  </CodeLineWrapper>
                                  <ComentLineWrapper>
                                    {'// => '} ['{'<'}span{'>'}React{'<'}/span{'>'}']
                                  </ComentLineWrapper>
                                </CustomCodeBlockDiv>
                              </CustomCodeBlockWrapper>
                          }
                          {
                            row.example === 'ターゲット文字列がThis is "Regex Hunting"の場合' &&
                              <CustomCodeBlockWrapper>
                                <CustomCodeBlockDiv> 
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
                                  <CodeLineWrapper>
                                    console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern));
                                  </CodeLineWrapper>
                                  <ComentLineWrapper>
                                    {'// => '} ['"Regex Hunting"']
                                  </ComentLineWrapper>
                                </CustomCodeBlockDiv>
                              </CustomCodeBlockWrapper>
                          }
                          {
                            row.example === 'ターゲット文字列がThis is React This is JavaScriptの場合' &&
                              <CustomCodeBlockWrapper>
                                <CustomCodeBlockDiv> 
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'This is React This is JavaScript'</CodeYellowSpan>;
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <ComentLineWrapper>
                                    {'// '}選択のみを使用します。
                                  </ComentLineWrapper>
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> regex_pattern_1 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/This is React|JavaScript/g</CodeYellowSpan>;
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <ComentLineWrapper>
                                    {'// '}キャプチャグループと選択を使用します。
                                  </ComentLineWrapper>
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> regex_pattern_2 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/This is (React|JavaScript)/g</CodeYellowSpan>;
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <CodeLineWrapper>
                                    console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern_1));
                                  </CodeLineWrapper>
                                  <ComentLineWrapper>
                                    {'// => '} ['This is React', 'JavaScript']
                                  </ComentLineWrapper>
                                  <BlankLineWrapper />
                                  <CodeLineWrapper>
                                    console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern_2));
                                  </CodeLineWrapper>
                                  <ComentLineWrapper>
                                    {'// => '} ['This is React', 'This is JavaScript']
                                  </ComentLineWrapper>
                                </CustomCodeBlockDiv>
                              </CustomCodeBlockWrapper>
                          }
                          {
                            row.example === 'ターゲット文字列がThis water(100ml) is 100yenの場合' &&
                              <CustomCodeBlockWrapper>
                                <CustomCodeBlockDiv> 
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'This water(100ml) is 100yen'</CodeYellowSpan>;
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> regex_pattern_1 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/\d{'{'}3{'}'}/g</CodeYellowSpan>;
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <ComentLineWrapper>
                                    {'// '}金額の数字にマッチする正規表現
                                  </ComentLineWrapper>
                                  <ComentLineWrapper>
                                    {'// '}3桁の数字の後ろに、yenという文字列があるかを調べることができます。
                                  </ComentLineWrapper>
                                  <ComentLineWrapper>
                                    {'// '}肯定の先読みでマッチした文字列は、全体の正規表現のマッチ結果に含まれません。
                                  </ComentLineWrapper>
                                  <CodeLineWrapper>
                                    <CodeRedSpan>const</CodeRedSpan> regex_pattern_2 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/\d{'{'}3{'}'}(?=yen)/g</CodeYellowSpan>;
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <ComentLineWrapper>
                                    {'// '}肯定の先読みを使用しない場合、金額以外の数字もマッチしてしまいます。
                                  </ComentLineWrapper>
                                  <CodeLineWrapper>
                                    console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern_1)); <CodeComentSpan>{'// => '} ['100', '100']</CodeComentSpan>
                                  </CodeLineWrapper>
                                  <BlankLineWrapper />
                                  <ComentLineWrapper>
                                    {'// '}肯定の先読みを使用した場合、金額の数字のみにマッチさせることができます。
                                  </ComentLineWrapper>
                                  <CodeLineWrapper>
                                    console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern_2)); <CodeComentSpan>{'// => '} ['100']</CodeComentSpan> 
                                  </CodeLineWrapper>
                                </CustomCodeBlockDiv>
                              </CustomCodeBlockWrapper>
                          }
                          {
                            row.example === 'ターゲット文字列がThis water(500ml) is 100yenの場合' &&
                              <>
                                <CustomCodeBlockWrapper>
                                  <CustomCodeBlockDiv> 
                                    <CodeLineWrapper>
                                      <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'This water(500ml) is 100yen'</CodeYellowSpan>;
                                    </CodeLineWrapper>
                                    <BlankLineWrapper />
                                    <ComentLineWrapper>
                                      {'// '}mlの数字にマッチする正規表現
                                    </ComentLineWrapper>
                                    <ComentLineWrapper>
                                      {'// '}3桁の数字の後ろにyenという文字列がないような3桁の数字にマッチします。
                                    </ComentLineWrapper>
                                    <CodeLineWrapper>
                                      <CodeRedSpan>const</CodeRedSpan> regex_pattern <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/\d{'{'}3{'}'}(?!yen)/g</CodeYellowSpan>;
                                    </CodeLineWrapper>
                                    <BlankLineWrapper />
                                    <CodeLineWrapper>
                                      console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern)); <CodeComentSpan>{'// => '} ['500']</CodeComentSpan>
                                    </CodeLineWrapper>
                                  </CustomCodeBlockDiv>
                                </CustomCodeBlockWrapper>
                                <StyledDescriptionDiv>
                                  また、以下のコードのように、マッチさせたくない文字列を含んでいるかをチェックするために、否定の先読みを使うこともできます。
                                </StyledDescriptionDiv>
                                <ExampleData>{`ex) 不正な郵便番号(000-0000)にマッチさせたくない場合`}</ExampleData>
                                <CustomCodeBlockWrapper>
                                  <CustomCodeBlockDiv> 
                                    <CodeLineWrapper>
                                      <CodeRedSpan>const</CodeRedSpan> target_1 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>000-0000</CodeYellowSpan>; <CodeComentSpan>{'//'} 不正な郵便番号</CodeComentSpan>
                                    </CodeLineWrapper>
                                    <CodeLineWrapper>
                                      <CodeRedSpan>const</CodeRedSpan> target_2 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>171-0022</CodeYellowSpan>; <CodeComentSpan>{'//'} 正当な郵便番号</CodeComentSpan>
                                    </CodeLineWrapper>
                                    <BlankLineWrapper />
                                    <ComentLineWrapper>
                                      {'// '}正当な郵便番号にマッチする正規表現
                                    </ComentLineWrapper>
                                    <ComentLineWrapper>
                                      {'// '}ターゲット文字列が0{'{'}3{'}'}-0{'{'}4{'}'}にマッチしない場合、否定の先読みが成功します。
                                    </ComentLineWrapper>
                                    <ComentLineWrapper>
                                      {'// '}否定の先読みが成功した場合、ターゲット文字列が000-0000ではないことが確定します。
                                    </ComentLineWrapper>
                                    <ComentLineWrapper>
                                      {'// '}否定の先読みが成功後、\d{'{'}3{'}'}-\d{'{'}4{'}'}がターゲット文字列にマッチするかを試行します。
                                    </ComentLineWrapper>
                                    <CodeLineWrapper>
                                      <CodeRedSpan>const</CodeRedSpan> regex_pattern <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/(?!0{'{'}3{'}'}-0{'{'}4{'}'})\d{'{'}3{'}'}-\d{'{'}4{'}'}/g</CodeYellowSpan>;
                                    </CodeLineWrapper>
                                    <BlankLineWrapper />
                                    <CodeLineWrapper>
                                      console.<CodeBlueSpan>log</CodeBlueSpan>(target_1.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern)); <CodeComentSpan>{'// => '} null</CodeComentSpan>
                                    </CodeLineWrapper>
                                    <CodeLineWrapper>
                                      console.<CodeBlueSpan>log</CodeBlueSpan>(target_2.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern)); <CodeComentSpan>{'// => '} ['171-0022']</CodeComentSpan>
                                    </CodeLineWrapper>
                                  </CustomCodeBlockDiv>
                                </CustomCodeBlockWrapper>
                              </>
                          }
                          {
                            row.example === 'ターゲット文字列がhttps://www.regex-hunting.com/gamesの場合' &&
                              <>
                                <CustomCodeBlockWrapper>
                                  <CustomCodeBlockDiv> 
                                    <CodeLineWrapper>
                                      <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'https://www.regex-hunting.com/games'</CodeYellowSpan>;
                                    </CodeLineWrapper>
                                    <BlankLineWrapper />
                                    <ComentLineWrapper>
                                      {'// '}www以降にマッチする正規表現
                                    </ComentLineWrapper>
                                    <ComentLineWrapper>
                                      {'// '}後読みでhttps://という文字列にマッチした位置から、[-\/a-z]+がマッチするかを試行します。
                                    </ComentLineWrapper>
                                    <CodeLineWrapper>
                                      <CodeRedSpan>const</CodeRedSpan> regex_pattern <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/(?{'<'}=https:\/\/)[-\/\.a-z]+/g</CodeYellowSpan>;
                                    </CodeLineWrapper>
                                    <BlankLineWrapper />
                                    <ComentLineWrapper>
                                      {'// '}www以降を取得できます。
                                    </ComentLineWrapper>
                                    <CodeLineWrapper>
                                      console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern)); <CodeComentSpan>{'// => '}['www.regex-hunting.com/games']</CodeComentSpan>
                                    </CodeLineWrapper>
                                  </CustomCodeBlockDiv>
                                </CustomCodeBlockWrapper>
                              </>
                          }
                          {
                            row.example === 'ターゲット文字列がReact17.0 React16.0 React15.6の場合' &&
                              <>
                                <CustomCodeBlockWrapper>
                                  <CustomCodeBlockDiv> 
                                    <CodeLineWrapper>
                                      <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'React17.0 React16.0 React15.6'</CodeYellowSpan>;
                                    </CodeLineWrapper>
                                    <BlankLineWrapper />
                                    <ComentLineWrapper>
                                      {'// '}最新バージョンのReactにマッチする正規表現
                                    </ComentLineWrapper>
                                    <ComentLineWrapper>
                                      {'// '}全てのReactのバージョンにマッチした後、
                                    </ComentLineWrapper>
                                    <ComentLineWrapper>
                                      {'// '}否定の後読みによって、マッチした文字列の末尾が条件を満たすかチェックします。
                                    </ComentLineWrapper>
                                    <CodeLineWrapper>
                                      <CodeRedSpan>const</CodeRedSpan> regex_pattern <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/React1[5-7].\d(?{'<'}!1[5-6].\d)/g</CodeYellowSpan>;
                                    </CodeLineWrapper>
                                    <BlankLineWrapper />
                                    <CodeLineWrapper>
                                      console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern)); <CodeComentSpan>{'// => '}['React17.0']</CodeComentSpan>
                                    </CodeLineWrapper>
                                  </CustomCodeBlockDiv>
                                </CustomCodeBlockWrapper>
                              </>
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
