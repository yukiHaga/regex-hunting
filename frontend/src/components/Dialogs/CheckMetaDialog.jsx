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
  createData(1, '[...]', '指定した文字のどれか1文字にマッチします。ハイフンを使用して文字の範囲を指定することもできます。文字クラスの中に\\d等を書くこともできます。', '[aq],  [a-z],  [E\\d]'),
  createData(2, '[^...]', '[^...]は否定文字クラスという特殊文字です。指定した文字以外の1文字にマッチします。例えば、[^A]はA以外の1文字、[^ABC]はA、B、C以外の1文字にマッチします。[^ABC]は[^A-C]に書き換え可能です。', '[aq],  [a-z],  [E\\d]'),
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
  createData(13, '\\', 'ある文字の前に\\を書くことで、ある文字をエスケープすることができます。エスケープ対象の文字が特殊文字であるか、または、エスケープ対象の文字と\\の組み合わせに特別な意味がなければ、エスケープ対象の文字が、ただの文字としてマッチするようになります。また、\\を文字列として扱いたい場合、\\を\\でエスケープします。', false),
];

// 量指定子のデータ
const quantifiersRows = [
  createData(1, '?', '直前の1文字があればマッチさせるが、なくてもよいという意味を表します。1つの文字クラスは1つの単位を表すので、キャプチャグループを使用しなくても量指定子を指定することができます。2文字以上の文字列を繰り返しマッチさせたい場合、キャプチャグループで括ってから量指定子を指定します。', 'n?,  [aq]?,  [a-z]?,  (Script)?'),
  createData(2, '+', '直前の1文字に1回以上の繰り返しマッチという意味を表します。', 'o+,  [a-z]+,  (12)+'),
  createData(3, '*', '直前の1文字に0回以上の繰り返しマッチという意味を表します。', 'o*,  [a-z]*,  (12)*'),
  createData(4, '{min}', '直前の1文字に{min}回繰り返しマッチという意味を表します。', '\\d{3}'),
  createData(5, '{min,}', '直前の1文字に{min}回以上の繰り返しマッチという意味を表します。', '\\d{3,}'),
  createData(6, '{min,max}', '直前の1文字にmin回以上、max回以下の繰り返しマッチという意味を表します。', '\\d{2,3}'),
  createData(7, '??', '最大量指定子の後ろに?をつけると、最小量指定子になります。+や?等は最大量指定子であり、できる限り多くマッチしようと試みます。最小量指定子は最大量指定子の逆で、マッチする文字列が見つかれば、マッチを試行するのをやめます。', 'ターゲットテキストがsome <foo> <bar> new </bar> </foo> thingの場合')
];

// 括弧のデータ
const groupsRows = [
  createData(1, '(...)', 'キャプチャグループを使用する目的は、主に以下の3つです。', false),
  createData(2, '\\n', '\\nは、キャプチャした文字列を呼び出すときに使用します。', 'ターゲットテキストがThis is "<span>React</span>"の場合'),
  createData(3, '(?:...)', '(?:...)は、非キャプチャグループです。キャプチャグループのキャプチャ機能がないバージョンです。主に1つのグループを作りたい時に使用します。', false),
  createData(4, '(?<Name>...)', '(?<Name>...)は名前付きキャプチャグループです。キャプチャした文字列を独自の名前で呼び出すことができます。呼び出すときは、\\k<Name>を使用します。主に、キャプチャしたいが正規表現中に多くの括弧が存在する場合に、名前付きキャプチャグループを使用します。', false),
  createData(5, '\\k<Name>', '\\k<Name>は、名前付きキャプチャした文字列を呼び出す時に使用します。', 'ターゲットテキストがThis is "Regex Hunting"の場合'),
];

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
