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
import { FinallyGameRestartButton } from '../Buttons/FinallyGameRestartButton';

// ツールチップ
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

// スライドアニメーション関係の関数
import { slideFunction } from '../../functions/slideFunction';

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
const SlideContentWrapper = styled.div`
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

const CustomWarningSentenceWrapper = styled(WarningSentenceWrapper)`
  margin-top: 1%;
`;

const CustomCodeBlockDiv = styled(CodeBlockDiv)`
  white-space: nowrap;
  overflow-x: scroll;
`;

// isOpenはgameState.gameDescriptionOpen
// gameDescriptionOpenは、gameDescriptionOpen
// clickDescriptionOpenは、ゲーム開始後にスライドを見るをクリックしたかを表すprops
// ゲーム開始後にスライドを見るをクリックしたなら、trueになる
export const AdvancedGameDescriptionDialog = ({
  isOpen,
  setGameState,
  gameDescriptionOpen,
  clickDescriptionOpen
}) => {

  // 第2引数に空の依存配列を渡した場合、初回の1回のみ実行され、
  // 2度目以降のレンダリング時にはキャッシュから値を取得する
  // 最初のslideNumを0とした
  const slideContent = useMemo(() => [
    {
      title: "上級編",
      sentence: "上級編を始める前に、先読み、選択、アンカーについて学習しましょう！ そして、上級編のゲームを通して、これらの特殊文字を使用した正規表現をマスターしましょう！",
      slideNum: 0
    },
    {
      title: "正規表現のマッチについて",
      sentence: "今まで説明を省いていましたが、正規表現でどのように文字列をマッチさせるかをここで説明します。一般的に、ターゲット文字列の1文字1文字に対して、順番に正規表現がマッチするかを試行しています。例えば、Python JavaScript Javaという文字列に対して、Java(Script)?という正規表現を適用させる場合を考えます。まず正規表現のJがターゲット文字列のPにマッチするかを試行します。マッチしないので、次に、Pの隣のyに対して正規表現のJがマッチするかを試行します。マッチする文字列が見つかるまで、その試行を繰り返します。それを繰り返すと、JavaScriptのJで初めて正規表現のJがマッチします。Jがマッチしたので、次は正規表現のaがJの隣の文字列にマッチするかを試行します。ここでもマッチが成功します。以上の流れが繰り返されるので、JavaScriptにマッチします。",
      slideNum: 1
    },
    {
      title: "正規表現のマッチについて(続き)",
      sentence: "通常、マッチしたものが見つかった場合、それ以上マッチを試行するのをやめます。しかし、gオブションをつけている場合、マッチした文字列が見つかった後も、後ろの文字列に対して正規表現がマッチするかを試行します。そのため、Javaにもマッチします。以上が、ターゲット文字列に正規表現を適用させた時のマッチの流れです。実際の正規表現エンジンは最適化されているので、このようなマッチの流れと異なる動作をする場合があります。しかし、基本的にはこのようなマッチの流れなので、知っておくと正規表現を作るときに役立ちます。",
      slideNum: 2
    },
    {
      title: "肯定の先読みとは？",
      sentence: "(?=...)は、肯定の先読みと呼ばれます。肯定の先読みは、まだ試行していない右の方の文字列に対して、...がマッチするかどうかを調べます。マッチする場合、肯定の先読みが成功し、...がマッチするかどうかの試行を開始した位置にマッチします。つまり、肯定の先読みは、...にマッチする文字列の位置を見つけます。重要なことは、全体の正規表現の最終的なマッチ結果に、肯定の先読みでマッチさせた文字列は含まれないということです。理由は、肯定の先読みのマッチ結果は位置を表すからです。肯定の先読みを使うことで、条件を絞ってマッチさせることができます。例えば、以下のコードのように、金額の数字のみにマッチさせることも可能になります。",
      slideNum: 3
    },
    {
      title: "否定の先読みとは？",
      sentence: "(?!...)は、否定の先読みと呼ばれます。肯定の先読みの=を!に変えると、否定の先読みになります。否定の先読みは、まだ試行していない右の方の文字列に対して、...がマッチしないかどうかを調べます。マッチしない場合、否定の先読みが成功し、...がマッチしないかどうかの試行を開始した位置にマッチします。つまり、否定の先読みは、...にマッチしない文字列の位置を見つけます。否定の先読みは、ある文字列を含まないようなマッチをさせたい時に使用します。",
      slideNum: 4
    },
    {
      title: "選択とは？",
      sentence: "|は、選択と呼ばれます。またはという意味を持つ特殊文字です。選択を使うことで、複数の正規表現のどれかにマッチするような1つの正規表現を作ることができます。選択を使う上で注意すべきことは、選択の優先順位は非常に低いということです。例えば、This is React|JavaScriptという正規表現は、This is ReactまたはThis is JavaScriptにマッチする正規表現ではありません。React|JavaScriptで1つの塊に見えますが、選択の優先順位が非常に低いので、この正規表現はThis is ReactまたはJavaScriptにマッチする正規表現を表します。もし選択の範囲を限定したい場合、キャプチャグループを使用します。",
      slideNum: 5
    },
    {
      title: "アンカーとは？",
      sentence: "アンカーは、文字ではなく行頭や行末等の決められた位置にマッチする特殊文字です。行頭は^、行末は$でマッチさせることができます。行頭や行末にマッチを固定したい時に使用します。",
      slideNum: 6
    },
    {
      title: "ルール説明",
      sentence: "上級編では、先読み、選択、アンカーを使用する正規表現を学習していきます。時間内に正しい正規表現を入力すると、モンスターに攻撃できます。モンスターのHPを0にしたらゲームクリアです！",
      slideNum: 7
    }
  ], []);

  const initialState = {
    title: slideContent[0]["title"],
    sentence: slideContent[0]["sentence"],
    slideNum: slideContent[0]["slideNum"],
    slideIn: false,
    slideOut: false,
    direction: "",
  };

  const [slideState, setSlideState] = useState(initialState);

  // 右カーソルをクリックで左へずらす
  // スライドが右のスライドになる
  // slideState.slideNumが6より小さい場合、右カーソルが機能する
  const changeSlideToRight = useCallback(() => {
    if(slideState.slideNum < 7) {
      setSlideState((prev) => ({
        ...prev,
        slideIn: false,
        slideOut: true,
        direction: "left"
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
        }));
      }, 350);
    }
  }, [
    slideContent,
    slideState.slideNum
  ]);

  // 左カーソルをクリックで右へずらす
  // スライドが左のスライドになる
  // slideState.slideNumが1より大きくないと、左カーソルが機能しないようにした
  const changeSlideToLeft = useCallback(() => {
    if(slideState.slideNum > 0) {
      setSlideState((prev) => ({
        ...prev,
        slideIn: false,
        slideOut: true,
        direction: "right"
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
        }));
      }, 350);
    }
  }, [
    slideContent,
    slideState.slideNum
  ]);

  useEffect(() => {
    if(gameDescriptionOpen) {
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
    gameDescriptionOpen,
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
                    </>
                }
                {
                  slideState.slideNum === 1 &&
                    <>
                      <CaptureCodeBlockWrapper>
                        <CodeBlockDiv>
                          <ComentLineWrapper>
                            {'//'} 正規表現を適用させる文字列
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'Python JavaScript Java'</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <ComentLineWrapper>
                            {'//'} Java(Script)?は、JavaScript, Javaにマッチする正規表現です。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/Java(Script)?/g</CodeYellowSpan>;
                          </CodeLineWrapper>
                        </CodeBlockDiv>
                      </CaptureCodeBlockWrapper>
                    </>
                }
                {
                  slideState.slideNum === 2 &&
                    <>
                      <CustomWarningSentenceWrapper>
                        ※本サービスではgオプションを採用しています。
                      </CustomWarningSentenceWrapper>
                      <CaptureCodeBlockWrapper>
                        <CustomCodeBlockDiv>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'Python JavaScript Java'</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex1 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/Java(Script)?/</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex2 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/Java(Script)?/g</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex1)); <CodeComentSpan>{'//'} => ['JavaScript','Script', index: 7, input: 'Python JavaScript Java',groups: undefined]</CodeComentSpan>
                          </CodeLineWrapper>
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex2)); <CodeComentSpan>{'//'} => ['JavaScript', 'Java']</CodeComentSpan>
                          </CodeLineWrapper>
                        </CustomCodeBlockDiv>
                      </CaptureCodeBlockWrapper>
                    </>
                }
                {
                  slideState.slideNum === 3 &&
                    <>
                      <CaptureCodeBlockWrapper>
                        <CodeBlockDiv>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'This water(100ml) is 100yen'</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <ComentLineWrapper>
                            {'//'} 金額の数字にマッチする正規表現
                          </ComentLineWrapper>
                          <ComentLineWrapper>
                            {'//'} 3桁の数字の後ろにyenという文字列があるような3桁の数字にマッチします。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/\d{3}(?=yen)/g</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex)); <CodeComentSpan>{'//'} => ['100']</CodeComentSpan>
                          </CodeLineWrapper>
                        </CodeBlockDiv>
                      </CaptureCodeBlockWrapper>
                    </>
                }
                {
                  slideState.slideNum === 4 &&
                    <>
                      <CodeBlockWrapper>
                        <CodeBlockDiv>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'This water(500ml) is 100yen'</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <ComentLineWrapper>
                            {'//'} mlの数字にマッチする正規表現
                          </ComentLineWrapper>
                          <ComentLineWrapper>
                            {'//'} 3桁の数字の後ろにyenという文字列がないような3桁の数字にマッチします。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex1 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/\\d{3}(?!yen)/g</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex1)); <CodeComentSpan>{'//'} => ['500']</CodeComentSpan>
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
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'This is React This is JavaScript'</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex1 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/This is React|JavaScript/g</CodeYellowSpan>; <CodeComentSpan>{'//'} 選択のみを使用した正規表現</CodeComentSpan>
                          </CodeLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex2 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/This is (React|JavaScript)/g</CodeYellowSpan>; <CodeComentSpan>{'//'} キャプチャグループと選択を使用した正規表現</CodeComentSpan>
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex1)); <CodeComentSpan>{'//'} => ['This is React', 'JavaScript']</CodeComentSpan>
                          </CodeLineWrapper>
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex2)); <CodeComentSpan>{'//'} => ['This is React', 'This is JavaScript']</CodeComentSpan>
                          </CodeLineWrapper>
                        </CodeBlockDiv>
                      </CaptureCodeBlockWrapper>
                    </>
                }
                {
                  slideState.slideNum === 6 &&
                    <>
                      <CaptureCodeBlockWrapper>
                        <CodeBlockDiv>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> target <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>'cat dog cat'</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex1 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/cat/g</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <ComentLineWrapper>
                            {'//'} ^でターゲット文字列の行頭にマッチさせます。ターゲット文字列の行頭にマッチした後、
                          </ComentLineWrapper>
                          <ComentLineWrapper>
                            {'//'} 残りの正規表現catが、ターゲット文字列にマッチするか調べます。
                          </ComentLineWrapper>
                          <ComentLineWrapper>
                            {'//'} そのため、2番目のcatではなく、1番目のcatにのみマッチします。
                          </ComentLineWrapper>
                          <CodeLineWrapper>
                            <CodeRedSpan>const</CodeRedSpan> regex2 <CodeYellowSpan>=</CodeYellowSpan> <CodeYellowSpan>/^cat/g</CodeYellowSpan>;
                          </CodeLineWrapper>
                          <BlankLineWrapper />
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex1)); <CodeComentSpan>{'//'} => ['cat', 'cat']</CodeComentSpan>
                          </CodeLineWrapper>
                          <CodeLineWrapper>
                            console.<CodeBlueSpan>log</CodeBlueSpan>(target.<CodeBlueSpan>match</CodeBlueSpan>(regex2)); <CodeComentSpan>{'//'} => ['cat']</CodeComentSpan>
                          </CodeLineWrapper>
                        </CodeBlockDiv>
                      </CaptureCodeBlockWrapper>
                    </>
                }
                {
                  slideState.slideNum === 7 &&
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
                  disableHoverListener={slideState.slideNum === 7}
                  sx={{
                    opacity: slideState.slideNum === 7 ? 0 : 1,
                  }}
                >
                  <IconButton
                    sx={{
                      fontSize: '4.0em',
                      opacity: slideState.slideNum === 7 ? 0.1 : 1,
                      cursor: slideState.slideNum === 7 && "default"
                    }}
                    disableRipple={slideState.slideNum === 7}
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
