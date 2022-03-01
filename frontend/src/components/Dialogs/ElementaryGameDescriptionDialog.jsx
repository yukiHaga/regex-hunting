import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// NextButton
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// PrevButton
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

// Buttons
import { FinallyGameStartButton } from '../Buttons/FinallyGameStartButton.jsx';
import { FinallyGameRestartButton } from '../Buttons/FinallyGameRestartButton.jsx';

// ツールチップ
import Tooltip from '@mui/material/Tooltip';
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

// 説明スライドのワーニングセンテンス
import { WarningSentenceWrapper } from '../shared_style.js';

const CustomDialogInnerWrapper = styled.div`
  background-color: ${COLORS.SUB};
  text-align: center;
  padding: 3%;
  padding-bottom: 0;
`;

const DynamicSlideContentWrapper = styled.div`
  width: 80%;
  height: 78%;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 2em;
  color: ${COLORS.BLACK};
  width: 80%;
  margin: 0 auto;
`;

// animationプロパティは1つしか存在できない
// 2個存在する場合、2個目で1個目が上書きされる
const SlideContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transform: translateX(0);
  animation: ${({ 
    slide_in, 
    slide_out,
    direction
  }) => slideFunction(slide_in, slide_out, direction)} 0.7s ease forwards;
`;

const SentenceWrapper = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 1.1em;
  text-align: left;
  margin-top: 4%;
  color: ${COLORS.BLACK};
`;

const SpecialCodeBlockWrapper = styled(CodeBlockWrapper)`
  margin-top: 2%;
`;

const ButtonLineWrapper = styled.div`
  width: 80%;
  text-align: right;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  :focus {
    outline: 0;
  }
  display: inline-block;
`;

const OuterButtonsWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const SpecialWarningSentenceWrapper = styled(WarningSentenceWrapper)`
  margin-top: 1.5%;
`;

// isOpenはgameState.game_description_open
// game_description_openは、game_description_open
// click_description_openは、ゲーム開始後にスライドを見るをクリックしたかを表すprops
// ゲーム開始後にスライドを見るをクリックしたなら、trueになる
export const ElementaryGameDescriptionDialog = ({
  isOpen,
  setGameState,
  game_description_open,
  click_description_open
}) => {

  // 第2引数に空の依存配列を渡した場合、初回の1回のみ実行され、
  // 2度目以降のレンダリング時にはキャッシュから値を取得する
  // 最初のslide_numを0とした
  const slideContent = useMemo(() => [
    {
      title: "初級編",
      sentence: "初級編を始める前に、正規表現とは何か？、文字クラスとは何か？を学習しましょう！ そして、初級編のゲームを通して、文字クラスを使用した正規表現をマスターしましょう！",
      slide_num: 0
    },
    {
      title: "What’s 正規表現？",
      sentence: "正規表現とは、複数の文字列からルールを見つけ出し、そのルールをパターンで表現したものです。正規表現は、基本的に「文字列」と「特殊文字」で構成されます。正規表現とプログラミング言語の正規表現用メソッドを併用することによって、複数の文字列から特定の文字を取得したり、置換したりすることができます。",
      slide_num: 1
    },
    {
      title: "文字クラスとは？",
      sentence: "文字クラス([...])とは、指定した文字のどれか1文字にマッチする特殊文字です。[...]の...に、現れても良い1文字を複数指定します。例えば、[acz#]と書くと、[acz#]は、a, c, z, #のどれか1文字にマッチします。また、文字クラスの別の使い方として、[...]の中に-を書くと、文字の範囲を指定できます。例えば、[a-z]はaからzの小文字アルファベット1文字にマッチします。[1-9]は、0から9の1桁の数字にマッチします。範囲は複数指定できるので、[a-zA-Z]や[a-zA-Z1-9]と書くこともできます。文字クラス内で文字指定と範囲指定を併用することもできるので、[a-z#%]と書くことも可能です。",
      slide_num: 2
    },
    {
      title: "正規表現を作るコツ",
      sentence: "「\"gray grey\"という文字列のgrayとgreyにマッチするような正規表現を求めよ」と言われた場合、1つの文字クラスのみで作られた正規表現ではマッチできません。理由は、文字クラスは指定した1文字を表すだけであり、2文字以上の文字列にマッチさせることができないからです。この場合、まずはgrayとgreyの共通文字と共通ではない文字を見つけます。共通な文字はg, r, yです。そして、共通ではない文字はa, eです。aとeは、grayとgreyの3番目に位置する文字です。したがって、「gr[ae]y」という正規表現を用いることで、grayとgreyにマッチさせることができます。",
      slide_num: 3
    },
    {
      title: "ルール説明",
      sentence: "初級編では、文字クラスを使用した正規表現を学習していきます。時間内に正しい正規表現を入力すると、モンスターに攻撃できます。モンスターのHPを0にしたらゲームクリアです！",
      slide_num: 4
    }
  ], []);

  const initialState = {
    title: slideContent[0]["title"],
    sentence: slideContent[0]["sentence"],
    slide_num: slideContent[0]["slide_num"],
    slide_in: false,
    slide_out: false,
    direction: "",
  };

  const [slideState, setSlideState] = useState(initialState);

  // 右カーソルをクリックで左へずらす
  // スライドが右のスライドになる
  // slideState.slide_numが4より小さい場合、右カーソルが機能する
  const changeSlideToRight = useCallback(() => {
    if(slideState.slide_num < 4) {
      setSlideState((prev) => ({
        ...prev,
        slide_in: false,
        slide_out: true,
        direction: "left"
      }));
      setTimeout(() => {
        setSlideState((prev) => ({
          ...prev,
          title: slideContent[prev.slide_num + 1]["title"],
          sentence: slideContent[prev.slide_num + 1]["sentence"],
          slide_num: slideContent[prev.slide_num + 1]["slide_num"],
          slide_in: true,
          slide_out: false,
          direction: "left",
        }));
      }, 350);
    }
  }, [
    slideContent,
    slideState.slide_num
  ]);

  // 左カーソルをクリックで右へずらす
  // スライドが左のスライドになる
  // slideState.slide_numが1より大きくないと、左カーソルが機能しないようにした
  const changeSlideToLeft = useCallback(() => {
    if(slideState.slide_num > 0) {
      setSlideState((prev) => ({
        ...prev,
        slide_in: false,
        slide_out: true,
        direction: "right"
      }));
      setTimeout(() => {
        setSlideState((prev) => ({
          ...prev,
          title: slideContent[prev.slide_num - 1]["title"],
          sentence: slideContent[prev.slide_num - 1]["sentence"],
          slide_num: slideContent[prev.slide_num - 1]["slide_num"],
          slide_in: true,
          slide_out: false,
          direction: "right",
        }));
      }, 350);
    }
  }, [
    slideContent,
    slideState.slide_num
  ]);

  useEffect(() => {
    if(game_description_open) {
      const handleRightkeyPress = (e) => {
        if(e.key !== 'Enter' && e.key === 'ArrowRight') {
          changeSlideToRight();
        }
      };

      const handleLeftkeyPress = (e) => {
        if(e.key !== 'Enter' && e.key === 'ArrowLeft') {
          changeSlideToLeft();
        }
      };

      // 入力をコントロールするイベントリスナー
      document.addEventListener("keydown", handleRightkeyPress);

      // 入力をコントロールするイベントリスナー
      document.addEventListener("keydown", handleLeftkeyPress);

      // イベントを消すクリーンアップ関数を返す
      return () => {
        document.removeEventListener("keydown", handleRightkeyPress);
        document.removeEventListener("keydown", handleLeftkeyPress);
      }
    }
  }, [
    game_description_open,
    changeSlideToRight,
    changeSlideToLeft,
  ]);

  return(
    <>
      <Dialog
        open={isOpen}
        maxWidth='lg'        
      >
        <CustomDialogInnerWrapper> 
          <DialogContent
            sx={{
              height: "75vh",
              pb: "0",
              overflowX: "hidden"
            }}
          >
            <DynamicSlideContentWrapper>
              <SlideContentWrapper
                slide_in={slideState.slide_in}
                slide_out={slideState.slide_out}
                direction={slideState.direction}
              >
                <TitleWrapper>
                  {slideState.title}
                </TitleWrapper>
                <SentenceWrapper>
                  {slideState.sentence}
                </SentenceWrapper>
                {
                  slideState.slide_num === 0 &&
                    <>
                      <WarningSentenceWrapper>
                        ※ JavaScriptにおける正規表現を説明していますが、内容自体は他の言語にも適用できます。
                      </WarningSentenceWrapper>
                    </>
                }
                {
                  slideState.slide_num === 1 &&
                    <>
                      <SpecialWarningSentenceWrapper>理解を促すために、特殊な意味を持つ文字列は全て「特殊文字」として分類します。</SpecialWarningSentenceWrapper>
                      <SpecialCodeBlockWrapper>
                        <CodeBlockDiv> 
                          <ComentLineWrapper>
                            {'//'} 正規表現を適用させる文字列
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>"JavaScript and React are different. TypeScript is a great language."</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <ComentLineWrapper>
                            {'//'} [A-Z][a-zA-Z]+は、JavaScript, React, TypeScriptにマッチする正規表現です。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex_pattern <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/[A-Z][a-zA-Z]+/g</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <ComentLineWrapper>
                            {'//'} matchメソッドを用いることで、文字列中から正規表現を満たす文字列を取得できます。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern)); <CodeComentSpan>{'//'} => [ 'JavaScript', 'React', 'TypeScript' ]</CodeComentSpan>
                          </CodeLineWrapper>
                        </CodeBlockDiv>
                      </SpecialCodeBlockWrapper>
                    </>
                }
                {
                  slideState.slide_num === 2 &&
                    <>
                      <CodeBlockWrapper>
                        <CodeBlockDiv> 
                          <ComentLineWrapper>
                            {'//'} 以下の{'/.../g'}の...にある[acz#]は、a, c, z, #のどれか1文字にマッチする正規表現です。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex_pattern_1 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/[acz#]/g</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <ComentLineWrapper>
                            {'//'} 以下の{'/.../g'}の...にある[a-z#%]は、aからz, #, %のどれか1文字にマッチする正規表現です。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex_pattern_2 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/[a-z#%]/g</CodeYellowSpan>;
                          </CodeLineWrapper>
                        </CodeBlockDiv>
                      </CodeBlockWrapper>
                    </>
                }
                {
                  slideState.slide_num === 3 &&
                    <>
                      <CodeBlockWrapper>
                        <CodeBlockDiv> 
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>"gray grey"</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <ComentLineWrapper>
                            {'//'} gr[ae]yは、gray, greyにマッチする正規表現です。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex_pattern <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/gr[ae]y/g</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex_pattern)); <CodeComentSpan>{'//'} => [ 'gray', 'grey' ]</CodeComentSpan>
                          </CodeLineWrapper>
                        </CodeBlockDiv>
                      </CodeBlockWrapper>
                    </>
                }
                {
                  slideState.slide_num === 4 &&
                    <>
                      <WarningSentenceWrapper>
                        ※ UX向上の為、音が出ます。音量が気になる方は下げて頂くようお願いします。
                      </WarningSentenceWrapper>
                      <OuterButtonsWrapper>
                        {
                          click_description_open ?
                            <FinallyGameRestartButton setGameState={setGameState} />
                          :
                            <FinallyGameStartButton setGameState={setGameState} />
                        }
                      </OuterButtonsWrapper>
                    </>
                }
              </SlideContentWrapper>
            </DynamicSlideContentWrapper>
            <ButtonLineWrapper>
              {
                slideState.slide_num !== 0 &&
                  <ButtonWrapper 
                    onClick={changeSlideToLeft}
                  >
                    <Tooltip 
                      title={<div>戻る<br />( 左矢印キー ← )</div>}
                      placement="top"
                    >
                      <IconButton
                        sx={{
                          fontSize: '4.0em'
                        }}
                      >
                        <ArrowLeftIcon
                          fontSize='inherit' 
                          sx={{ color: `${COLORS.BLACK}` }}
                        />
                      </IconButton>
                    </Tooltip>
                  </ButtonWrapper>
              }
              <ButtonWrapper 
                onClick={changeSlideToRight}
              >
                <Tooltip 
                  title={<div>進む<br />( 右矢印キー → )</div>}
                  placement="top"
                  disableHoverListener={slideState.slide_num === 4}
                  sx={{
                    opacity: slideState.slide_num === 4 ? 0 : 1,
                  }}
                >
                  <IconButton
                    sx={{
                      fontSize: '4.0em',
                      opacity: slideState.slide_num === 4 ? 0.1 : 1,
                      cursor: slideState.slide_num === 4 && "default"
                    }}
                    disableRipple={slideState.slide_num === 4}
                  >
                    <ArrowRightIcon 
                      fontSize='inherit' 
                      sx={{ color: `${COLORS.BLACK}` }}
                    />
                  </IconButton>
                </Tooltip>
              </ButtonWrapper>
            </ButtonLineWrapper>
          </DialogContent>
        </CustomDialogInnerWrapper>
      </Dialog>
    </>
  );
};
