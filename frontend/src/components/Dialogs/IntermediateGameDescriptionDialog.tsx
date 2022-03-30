import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants';

// NextButton
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// PrevButton
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

// Buttons
import { FinallyGameStartButton } from '../Buttons/FinallyGameStartButton';
import { FinallyGameRestartButton } from '../Buttons/FinallyGameRestartButton';
import { NowGameStartButton } from '../Buttons/NowGameStartButton';
import { DescriptionBackToTopButton } from '../Buttons/DescriptionBackToTopButton';
import { DescriptionBackToMyPageButton } from '../Buttons/DescriptionBackToMyPageButton';

// 説明ページのボタンのラッパー
import { FirstOuterButtonsWrapper } from '../shared_style';

// ツールチップ
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

// スライドアニメーション関係の関数
import { slideFunction } from '../../functions/slideFunction';

// コードブロック関係
import {
  CodeBlockWrapper,
  CodeBlockDiv,
  CodeLineWrapper,
  BlankLineWrapper,
  ComentLineWrapper,
  CodeRedSpan,
  CodeYellowSpan,
  CodeBlueSpan,
  CodeComentSpan
} from '../shared_style'

// 説明スライドのワーニングセンテンス
import { WarningSentenceWrapper } from '../shared_style';

// スライド関連のコンポーネントやstateの型
import { GameDescriptionDialogArg, SlideState } from '../../types/components/dialogs';

const CustomDialogInnerWrapper = styled.div`
  background-color: ${COLORS.SUB};
  text-align: center;
  padding: 3%;
  padding-bottom: 0;
`;

const DynamicSlideContentWrapper = styled.div`
  width: 82%;
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
const SlideContentWrapper = styled.div<{slideIn: boolean, slideOut: boolean, direction: 'right' | 'left'}>`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transform: translateX(0);
  animation: ${({
    slideIn,
    slideOut,
    direction
  }) => slideFunction(slideIn, slideOut, direction)} 0.7s ease forwards;
`;

const SentenceWrapper = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 1.1em;
  text-align: justify;
  text-justify: inter-ideograph;
  margin-top: 4%;
  color: ${COLORS.BLACK};
`;

const CaptureCodeBlockWrapper = styled(CodeBlockWrapper)`
  margin-top: 2%;
`;

// ここは高さなので、px指定してレイアウトが崩れないようにした
const ButtonLineWrapper = styled.div`
  width: 80%;
  text-align: right;
  margin: 0 auto;
  margin-top: 10px;
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

// isOpenはgameState.gameDescriptionOpen
// gameDescriptionOpenは、gameDescriptionOpen
// clickDescriptionOpenは、ゲーム開始後にスライドを見るをクリックしたかを表すprops
// ゲーム開始後にスライドを見るをクリックしたなら、trueになる
export const IntermediateGameDescriptionDialog = ({
  isOpen,
  setGameState,
  gameDescriptionOpen,
  clickDescriptionOpen,
  hasUser
}: GameDescriptionDialogArg): JSX.Element => {

  // 第2引数に空の依存配列を渡した場合、初回の1回のみ実行され、
  // 2度目以降のレンダリング時にはキャッシュから値を取得する
  // 最初のslideNumを0とした
  const slideContent = useMemo(() => [
    {
      title: "中級編",
      sentence: "中級編を始める前に、最大量指定子(? * + {min,max})、キャプチャグループについて、スライドで学習しましょう！ そして、中級編のゲームを通して、これらの特殊文字を使用した正規表現をマスターしましょう！",
      slideNum: 0
    },
    {
      title: "最大量指定子とは？",
      sentence: "最大量指定子(? * + {min,max})とは、ある文字列に繰り返しマッチさせるための特殊文字です。ある文字列の直後に最大量指定子を置くと、その文字列に対して最大量指定子を適用させることができます。正規表現で最大量指定子を使用することによって、繰り返しの文字列にマッチさせるのが簡単になります。以降のスライドでは、各最大量指定子の使用方法について説明します。",
      slideNum: 1
    },
    {
      title: "?の使い方",
      sentence: "最大量指定子?は、直前の1文字があればマッチさせるが、なくてもよいという意味を表します。文字列の直後に?を置くことで、その文字列に?の意味が適用されます。例えば、n?はnがあればマッチさせるが、なくてもよいという意味を表します。n?を使用したenviron?mentという正規表現は、environment, enviromentという文字列にマッチさせることができます。このように、直前の1文字があってもなくてもよいという正規表現を作りたい場合に、?を使います。",
      slideNum: 2
    },
    {
      title: "+と*の使い方",
      sentence: "最大量指定子+は、直前の1文字に1回以上の繰り返しマッチという意味を表し、最大量指定子*は、直前の1文字に0回以上の繰り返しマッチという意味を表します。+と*の意味は似ています。大きな違いとして、+の場合は少なくとも1回はマッチしないといけませんが、*の場合はなくても大丈夫です。以下の例のo+は、oの1回以上繰り返しマッチを表す為、cとkの間にoがない単語(ck)にはマッチしないことが分かります。直前の1文字を繰り返したい正規表現を作りたい場合に、*や+を使います。",
      slideNum: 3
    },
    {
      title: "{min,max}の使い方",
      sentence: "最大量指定子{min,max}は、直前の1文字にmin回以上、max回以上の繰り返しマッチという意味を表します。例えば、\\dは1桁の数字にマッチする為、\\d{3,5}は3桁以上、5桁以下の数字にマッチします。{min,max}以外にも、{min}や{min,}という書き方があります。{min}は直前の1文字にmin回繰り返しマッチを表し、{min,}は直前の1文字にmin回以上繰り返しマッチを表します。例えば、\\d{3}は3桁の数字、\\d{3,}は3桁以上の数字にマッチします。直前の1文字の繰り返し回数を制御したい場合に、{min,max}を使います。",
      slideNum: 4
    },
    {
      title: "キャプチャグループとは？",
      sentence: "最大量指定子(? * + {min,max})は、どれも直前の1文字を対象とする特殊文字です。2文字以上の文字を繰り返したい時はどうすれば良いのでしょうか？ 答えはキャプチャグループ((...))を使用することです。キャプチャグループを使用することで、複数の文字列を1つのグループとして扱うことができます。そのグループに最大量指定子を指定できる為、2文字以上の文字列を繰り返すことができます。本サービスでは、厳密性より見やすさと分かりやすさを重視している為、基本的には非キャプチャグループ((?:...))ではなく、キャプチャグループ((...))を使用します。",
      slideNum: 5
    },
    {
      title: "ルール説明",
      sentence: "中級編では、最大量指定子、括弧を使用する正規表現を学習していきます。時間内に正しい正規表現を入力すると、モンスターに攻撃できます。モンスターのHPを0にしたらゲームクリアです！",
      slideNum: 6
    }
  ], []);

  const initialState: SlideState = {
    title: slideContent[0]["title"],
    sentence: slideContent[0]["sentence"],
    slideNum: slideContent[0]["slideNum"],
    slideIn: false,
    slideOut: false,
    direction: 'right',
    keyAndClickAvailable: true
  };

  const [slideState, setSlideState] = useState(initialState);

  // 右カーソルをクリックで左へずらす
  // スライドが右のスライドになる
  // slideState.slideNumが6より小さい場合、右カーソルが機能する
  const changeSlideToRight = useCallback(() => {
    if(slideState.slideNum < 6 && slideState.keyAndClickAvailable) {
      setSlideState((prev) => ({
        ...prev,
        slideIn: false,
        slideOut: true,
        direction: "left",
        keyAndClickAvailable: false
      }));
      setTimeout(() => {
        setSlideState((prev) => ({
          ...prev,
          title: slideContent[prev.slideNum + 1]["title"],
          sentence: slideContent[prev.slideNum + 1]["sentence"],
          slideNum: slideContent[prev.slideNum + 1]["slideNum"],
          slideIn: true,
          slideOut: false,
          direction: "left",
          keyAndClickAvailable: true
        }));
      }, 350);
    }
  }, [
    slideContent,
    slideState.slideNum,
    slideState.keyAndClickAvailable
  ]);

  // 左カーソルをクリックで右へずらす
  // スライドが左のスライドになる
  // slideState.slideNumが1より大きくないと、左カーソルが機能しないようにした
  const changeSlideToLeft = useCallback(() => {
    if(slideState.slideNum > 0 && slideState.keyAndClickAvailable) {
      setSlideState((prev) => ({
        ...prev,
        slideIn: false,
        slideOut: true,
        direction: "right",
        keyAndClickAvailable: false
      }));
      setTimeout(() => {
        setSlideState((prev) => ({
          ...prev,
          title: slideContent[prev.slideNum - 1]["title"],
          sentence: slideContent[prev.slideNum - 1]["sentence"],
          slideNum: slideContent[prev.slideNum - 1]["slideNum"],
          slideIn: true,
          slideOut: false,
          direction: "right",
          keyAndClickAvailable: true
        }));
      }, 350);
    }
  }, [
    slideContent,
    slideState.slideNum,
    slideState.keyAndClickAvailable
  ]);

  useEffect(() => {
    if(gameDescriptionOpen && slideState.keyAndClickAvailable) {
      const handleRightkeyPress = (e: KeyboardEvent) => {
        if(e.key !== 'Enter' && e.key === 'ArrowRight') {
          changeSlideToRight();
        }
      };

      const handleLeftkeyPress = (e: KeyboardEvent) => {
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
    gameDescriptionOpen,
    changeSlideToRight,
    changeSlideToLeft,
    slideState.keyAndClickAvailable
  ]);

  return(
    <>
      <Dialog
        open={isOpen}
        maxWidth='lg'
        fullWidth={true}
      >
        <CustomDialogInnerWrapper>
          <DialogContent
            sx={{
              height: "77vh",
              pb: "0",
              overflowX: "hidden"
            }}
          >
            <DynamicSlideContentWrapper>
              <SlideContentWrapper
                slideIn={slideState.slideIn}
                slideOut={slideState.slideOut}
                direction={slideState.direction}
              >
                <TitleWrapper>
                  {slideState.title}
                </TitleWrapper>
                <SentenceWrapper>
                  {slideState.sentence}
                </SentenceWrapper>
                {
                  slideState.slideNum === 0 &&
                    <>
                      <WarningSentenceWrapper>
                        ※ JavaScriptにおける正規表現を説明していますが、内容自体は他の言語にも適用できます。
                      </WarningSentenceWrapper>
                      <FirstOuterButtonsWrapper>
                        {
                          hasUser ?
                            <DescriptionBackToMyPageButton />
                          :
                            <DescriptionBackToTopButton />
                        }
                        {
                          clickDescriptionOpen ?
                            <FinallyGameRestartButton setGameState={setGameState} slideNum={slideState.slideNum}/>
                          :
                            <NowGameStartButton
                              setGameState={setGameState}
                            />
                        }
                      </FirstOuterButtonsWrapper>
                    </>
                }
                {
                  slideState.slideNum === 1 &&
                    <>
                      <CodeBlockWrapper>
                        <CodeBlockDiv>
                          <ComentLineWrapper>
                            {'//'} 正規表現を適用させる文字列
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'メラ メラメラ メラメラメラ'</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <ComentLineWrapper>
                            {'//'} (メラ)+は、メラ, メラメラ, メラメラメラにマッチする正規表現です。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/(メラ)+/g</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <ComentLineWrapper>
                            {'//'} matchメソッドを用いることで、文字列中から正規表現にマッチする文字列を取得できます。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex)); <CodeComentSpan>{'//'} ={'>'} ['メラ', 'メラメラ', 'メラメラメラ']</CodeComentSpan>
                          </CodeLineWrapper>
                        </CodeBlockDiv>
                      </CodeBlockWrapper>
                    </>
                }
                {
                  slideState.slideNum === 2 &&
                    <>
                      <CodeBlockWrapper>
                        <CodeBlockDiv>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'environment enviroment'</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <ComentLineWrapper>
                            {'//'} environ?mentは、environment enviromentにマッチする正規表現です。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/environ?ment/g</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <ComentLineWrapper>
                            {'//'} matchメソッドを用いることで、文字列中から正規表現にマッチする文字列を取得できます。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex)); <CodeComentSpan>{'//'} ={'>'} ['environment', 'enviroment']</CodeComentSpan>
                          </CodeLineWrapper>
                        </CodeBlockDiv>
                      </CodeBlockWrapper>
                    </>
                }
                {
                  slideState.slideNum === 3 &&
                    <>
                      <CodeBlockWrapper>
                        <CodeBlockDiv>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'ck cook coook cooook'</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex1 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/co*k/g</CodeYellowSpan>; <CodeComentSpan>{'//'} co*kは、ck cook coook cooookにマッチする正規表現</CodeComentSpan>
                          </CodeLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex2 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/co+k/g</CodeYellowSpan>; <CodeComentSpan>{'//'} co+kは、cook coook cooookにマッチする正規表現</CodeComentSpan>
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex1)); <CodeComentSpan>{'//'} ={'>'} ['ck', 'cook', 'coook', 'cooook']</CodeComentSpan>
                          </CodeLineWrapper>
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex2)); <CodeComentSpan>{'//'} ={'>'} ['cook', 'coook', 'cooook']</CodeComentSpan>
                          </CodeLineWrapper>
                        </CodeBlockDiv>
                      </CodeBlockWrapper>
                    </>
                }
                {
                  slideState.slideNum === 4 &&
                    <>
                      <CodeBlockWrapper>
                        <CodeBlockDiv>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'150 is greater than 15.'</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex1 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/\d{'{'}3{'}'}/g</CodeYellowSpan>; <CodeComentSpan>{'//'} \d{'{'}3{'}'}は、3桁の数字にマッチする正規表現</CodeComentSpan>
                          </CodeLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex2 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/\d{'{'}2,3{'}'}/g</CodeYellowSpan>; <CodeComentSpan>{'//'} \d{'{'}2,3{'}'}は、2桁~3桁の数字にマッチする正規表現</CodeComentSpan>
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex1)); <CodeComentSpan>{'//'} ={'>'} ['150']</CodeComentSpan>
                          </CodeLineWrapper>
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex2)); <CodeComentSpan>{'//'} ={'>'} ['150', '15']</CodeComentSpan>
                          </CodeLineWrapper>
                        </CodeBlockDiv>
                      </CodeBlockWrapper>
                    </>
                }
                {
                  slideState.slideNum === 5 &&
                    <>
                      <CaptureCodeBlockWrapper>
                        <CodeBlockDiv>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'1, 112, 11212, 1121212'</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex1 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/1(12)*/g</CodeYellowSpan>; <CodeComentSpan>{'//'} (12)*は、12の0回以上の繰り返しマッチを表します。</CodeComentSpan>
                          </CodeLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex2 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/112*/g</CodeYellowSpan>; <CodeComentSpan>{'//'} 2*は、2の0回以上の繰り返しマッチを表します。</CodeComentSpan>
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex1)); <CodeComentSpan>{'//'} ={'>'} ['1', '112', '11212', '1121212']</CodeComentSpan>
                          </CodeLineWrapper>
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex2)); <CodeComentSpan>{'//'} ={'>'} ['112', '112', '112']</CodeComentSpan>
                          </CodeLineWrapper>
                        </CodeBlockDiv>
                      </CaptureCodeBlockWrapper>
                    </>
                }
                {
                  slideState.slideNum === 6 &&
                    <>
                      <WarningSentenceWrapper>
                        ※ UX向上の為、音が出ます。音量が気になる方は下げて頂くようお願いします。
                      </WarningSentenceWrapper>
                      <OuterButtonsWrapper>
                        {
                          clickDescriptionOpen ?
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
                slideState.slideNum !== 0 &&
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
                  disableHoverListener={slideState.slideNum === 6}
                  sx={{
                    opacity: slideState.slideNum === 6 ? 0 : 1,
                  }}
                >
                  <IconButton
                    sx={{
                      fontSize: '4.0em',
                      opacity: slideState.slideNum === 6 ? 0.1 : 1,
                      cursor: slideState.slideNum === 6 ? "default" : "pointer"
                    }}
                    disableRipple={slideState.slideNum === 6}
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
