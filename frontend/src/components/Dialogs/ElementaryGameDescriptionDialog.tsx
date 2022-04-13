import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";

// ダイアログ
import { DialogContent, Dialog } from "@mui/material";

// Colors
import { COLORS } from "../../style_constants";

// NextButton
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

// PrevButton
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

// Buttons
import { FinallyGameStartButton } from "../Buttons/FinallyGameStartButton";
import { FinallyGameRestartButton } from "../Buttons/FinallyGameRestartButton";
import { NowGameStartButton } from "../Buttons/NowGameStartButton";
import { DescriptionBackToTopButton } from "../Buttons/DescriptionBackToTopButton";
import { DescriptionBackToMyPageButton } from "../Buttons/DescriptionBackToMyPageButton";

// 説明ページのボタンのラッパー
import { FirstOuterButtonsWrapper } from "../shared_style";

// ツールチップ
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

// スライドアニメーション関係の関数
import { slideFunction } from "../../functions/slideFunction";

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
  CodeComentSpan,
} from "../shared_style";

// 説明スライドのワーニングセンテンス
import { WarningSentenceWrapper, AnimateBalloon } from "../shared_style";

// スライド関連のコンポーネントやstateの型
import {
  GameDescriptionDialogArg,
  SlideState,
} from "../../types/components/dialogs";

// ゲーム画面の説明画像
import GameScreenDescription from "../../images/game_screen_description.png";

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
  position: relative;
`;

const BalloonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1.5em 0;
  padding: 9px 12px;
  min-width: 120px;
  max-width: 100%;
  color: ${COLORS.WHITE};
  font-size: 0.9em;
  background-color: ${COLORS.LIGHT_MAIN};
  z-index: 100000;
  border-radius: 10px;
  animation: ${AnimateBalloon} 1.5s ease infinite;
  &:before {
    content: "";
    position: absolute;
    top: 100%;
    right: 15%;
    margin-left: -15px;
    border: 15px solid transparent;
    border-top: 15px solid ${COLORS.LIGHT_MAIN};
  }
`;

const BalloonContentWrapper = styled.span`
  margin: 0;
  padding: 0;
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
const SlideContentWrapper = styled.div<{
  slideIn: boolean;
  slideOut: boolean;
  direction: "right" | "left";
}>`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transform: translateX(0);
  animation: ${({ slideIn, slideOut, direction }) =>
      slideFunction(slideIn, slideOut, direction)}
    0.7s ease forwards;
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

const SpecialCodeBlockWrapper = styled(CodeBlockWrapper)`
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

const SpecialWarningSentenceWrapper = styled(WarningSentenceWrapper)`
  margin-top: 1.5%;
`;

// ゲーム説明画像のラッパー
const GameScreenDescriptionWrapper = styled.img`
  width: 87%;
  height: 87%;
  object-fit: contain;
`;

// isOpenはgameState.gameDescriptionOpen
// gameDescriptionOpenは、gameDescriptionOpen
// clickDescriptionOpenは、ゲーム開始後にスライドを見るをクリックしたかを表すprops
// ゲーム開始後にスライドを見るをクリックしたなら、trueになる
export const ElementaryGameDescriptionDialog = ({
  isOpen,
  setGameState,
  gameDescriptionOpen,
  clickDescriptionOpen,
  hasUser,
}: GameDescriptionDialogArg): JSX.Element => {
  // 第2引数に空の依存配列を渡した場合、初回の1回のみ実行され、
  // 2度目以降のレンダリング時にはキャッシュから値を取得する
  // 最初のslideNumを0とした
  const slideContent = useMemo(
    () => [
      {
        title: "初級編",
        sentence:
          "初級編を始める前に、正規表現、文字クラスについて、スライドで学習しましょう！ そして、初級編のゲームを通して、文字クラスを使用した正規表現をマスターしましょう！",
        slideNum: 0,
      },
      {
        title: "What’s 正規表現？",
        sentence:
          "正規表現とは、複数の文字列からルールを見つけ出し、そのルールをパターンで表現したものです。正規表現は、基本的に「文字列」と「特殊文字」で構成されます。正規表現とプログラミング言語の正規表現用メソッドを併用することによって、複数の文字列から特定の文字を取得したり、置換したりすることができます。",
        slideNum: 1,
      },
      {
        title: "文字クラスとは？",
        sentence:
          "文字クラス([...])とは、指定した文字のどれか1文字にマッチする特殊文字です。[...]の...に、マッチさせたい1文字を複数指定します。例えば、[acz#]と書くと、[acz#]は、a, c, z, #のどれか1文字にマッチします。また、文字クラスの別の使い方として、[...]の中に-を書くと、文字の範囲を指定できます。例えば、[a-z]はaからzの小文字アルファベット1文字にマッチします。[1-9]は、1から9の1桁の数字にマッチします。範囲は複数指定できる為、[a-zA-Z]や[a-zA-Z1-9]と書くこともできます。文字クラス内で文字指定と範囲指定を併用することもできる為、[a-z#%]と書くことも可能です。",
        slideNum: 2,
      },
      {
        title: "正規表現を作るコツ",
        sentence:
          "「'gray grey'という文字列のgrayとgreyにマッチするような正規表現を求めよ」と言われた場合、1つの文字クラスのみで作られた正規表現ではマッチできません。理由は、文字クラスは指定した1文字にしかマッチしない為です。そのため、2文字以上の文字列にマッチさせることができません。この場合、まずはgrayとgreyの共通している文字と共通していない文字を見つけます。共通している文字はg, r, yです。そして、共通していない文字はa, eです。aとeは、grayとgreyの3番目に位置する文字です。したがって、gr[ae]yという正規表現を用いることで、grayとgreyにマッチさせることができます。",
        slideNum: 3,
      },
      {
        title: "ゲーム画面の説明",
        sentence:
          "ルール説明の前に、ゲーム画面の説明をします。ゲーム画面は、ヒント、 問題、コードブロック等、様々な要素で構成されています。重要なポイントを以下にまとめましたので、ご確認していただくようお願いします。",
        slideNum: 4,
      },
      {
        title: "ルール説明",
        sentence:
          "初級編では、文字クラスを使用する正規表現を学習していきます。時間内に正しい正規表現を入力してエンターキーを押すと、モンスターに攻撃できます。モンスターのHPを0にしたらゲームクリアです！",
        slideNum: 5,
      },
    ],
    []
  );

  const initialState: SlideState = {
    title: slideContent[0]["title"],
    sentence: slideContent[0]["sentence"],
    slideNum: slideContent[0]["slideNum"],
    slideIn: false,
    slideOut: false,
    direction: "right",
    keyAndClickAvailable: true,
  };

  const [slideState, setSlideState] = useState(initialState);

  // 右カーソルをクリックで左へずらす
  // スライドが右のスライドになる
  // slideState.slideNumが5より小さい場合、右カーソルが機能する
  const changeSlideToRight = useCallback(() => {
    if (slideState.slideNum < 5 && slideState.keyAndClickAvailable) {
      setSlideState((prev) => ({
        ...prev,
        slideIn: false,
        slideOut: true,
        direction: "left",
        keyAndClickAvailable: false,
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
          keyAndClickAvailable: true,
        }));
      }, 350);
    }
  }, [slideContent, slideState.slideNum, slideState.keyAndClickAvailable]);

  // 左カーソルをクリックで右へずらす
  // スライドが左のスライドになる
  // slideState.slideNumが1より大きくないと、左カーソルが機能しないようにした
  const changeSlideToLeft = useCallback(() => {
    if (slideState.slideNum > 0 && slideState.keyAndClickAvailable) {
      setSlideState((prev) => ({
        ...prev,
        slideIn: false,
        slideOut: true,
        direction: "right",
        keyAndClickAvailable: false,
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
          keyAndClickAvailable: true,
        }));
      }, 350);
    }
  }, [slideContent, slideState.slideNum, slideState.keyAndClickAvailable]);

  useEffect(() => {
    if (gameDescriptionOpen && slideState.keyAndClickAvailable) {
      const handleRightkeyPress = (e: KeyboardEvent) => {
        if (e.key !== "Enter" && e.key === "ArrowRight") {
          changeSlideToRight();
        }
      };

      const handleLeftkeyPress = (e: KeyboardEvent) => {
        if (e.key !== "Enter" && e.key === "ArrowLeft") {
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
      };
    }
  }, [
    gameDescriptionOpen,
    changeSlideToRight,
    changeSlideToLeft,
    slideState.keyAndClickAvailable,
  ]);

  return (
    <>
      <Dialog open={isOpen} maxWidth="lg" fullWidth={true}>
        <CustomDialogInnerWrapper>
          <DialogContent
            sx={{
              pb: "0",
              overflowX: "hidden",
              height: "77vh",
            }}
          >
            <DynamicSlideContentWrapper>
              <SlideContentWrapper
                slideIn={slideState.slideIn}
                slideOut={slideState.slideOut}
                direction={slideState.direction}
              >
                <TitleWrapper>{slideState.title}</TitleWrapper>
                <SentenceWrapper>{slideState.sentence}</SentenceWrapper>
                {slideState.slideNum === 0 && (
                  <>
                    <WarningSentenceWrapper>
                      ※
                      JavaScriptにおける正規表現を説明していますが、内容自体は他の言語にも適用できます。
                    </WarningSentenceWrapper>
                    <FirstOuterButtonsWrapper>
                      {hasUser ? (
                        <DescriptionBackToMyPageButton />
                      ) : (
                        <DescriptionBackToTopButton />
                      )}
                      {clickDescriptionOpen ? (
                        <FinallyGameRestartButton
                          setGameState={setGameState}
                          slideNum={slideState.slideNum}
                        />
                      ) : (
                        <NowGameStartButton setGameState={setGameState} />
                      )}
                    </FirstOuterButtonsWrapper>
                  </>
                )}
                {slideState.slideNum === 1 && (
                  <>
                    <SpecialWarningSentenceWrapper>
                      ※
                      本サービスでは、特殊な意味を持つ文字列は全て「特殊文字」として分類します。
                    </SpecialWarningSentenceWrapper>
                    <SpecialCodeBlockWrapper>
                      <CodeBlockDiv>
                        <ComentLineWrapper>
                          {"//"} 正規表現を適用させる文字列
                        </ComentLineWrapper>
                        <CodeLineWrapper>
                          <CodeRedSpan>const</CodeRedSpan> target{" "}
                          <CodeYellowSpan>=</CodeYellowSpan>{" "}
                          <CodeYellowSpan>
                            'JavaScript and React are different. TypeScript is a
                            great language.'
                          </CodeYellowSpan>
                          ;
                        </CodeLineWrapper>
                        <BlankLineWrapper />
                        <ComentLineWrapper>
                          {"//"} [A-Z][a-zA-Z]+は、JavaScript, React,
                          TypeScriptにマッチする正規表現です。
                        </ComentLineWrapper>
                        <CodeLineWrapper>
                          <CodeRedSpan>const</CodeRedSpan> regex{" "}
                          <CodeYellowSpan>=</CodeYellowSpan>{" "}
                          <CodeYellowSpan>/[A-Z][a-zA-Z]+/g</CodeYellowSpan>;
                        </CodeLineWrapper>
                        <BlankLineWrapper />
                        <ComentLineWrapper>
                          {"//"}{" "}
                          matchメソッドを用いることで、文字列中から正規表現にマッチする文字列を取得できます。
                        </ComentLineWrapper>
                        <CodeLineWrapper>
                          console.<CodeBlueSpan>log</CodeBlueSpan>(target.
                          <CodeBlueSpan>match</CodeBlueSpan>(regex));{" "}
                          <CodeComentSpan>
                            {"//"} ={">"} [ 'JavaScript', 'React', 'TypeScript'
                            ]
                          </CodeComentSpan>
                        </CodeLineWrapper>
                      </CodeBlockDiv>
                    </SpecialCodeBlockWrapper>
                  </>
                )}
                {slideState.slideNum === 2 && (
                  <>
                    <SpecialCodeBlockWrapper>
                      <CodeBlockDiv>
                        <CodeLineWrapper>
                          <CodeRedSpan>const</CodeRedSpan> target{" "}
                          <CodeYellowSpan>=</CodeYellowSpan>{" "}
                          <CodeYellowSpan>'a c z # % @ b'</CodeYellowSpan>;
                        </CodeLineWrapper>
                        <BlankLineWrapper />
                        <ComentLineWrapper>
                          {"//"} [acz#]は、a, c, z,
                          #のどれか1文字にマッチする正規表現です。
                        </ComentLineWrapper>
                        <CodeLineWrapper>
                          <CodeRedSpan>const</CodeRedSpan> regex{" "}
                          <CodeYellowSpan>=</CodeYellowSpan>{" "}
                          <CodeYellowSpan>/[acz#]/g</CodeYellowSpan>;
                        </CodeLineWrapper>
                        <BlankLineWrapper />
                        <ComentLineWrapper>
                          {"//"}{" "}
                          matchメソッドを用いることで、文字列中から正規表現にマッチする文字列を取得できます。
                        </ComentLineWrapper>
                        <CodeLineWrapper>
                          console.<CodeBlueSpan>log</CodeBlueSpan>(target.
                          <CodeBlueSpan>match</CodeBlueSpan>(regex));{" "}
                          <CodeComentSpan>
                            {"//"} ={">"} ['a', 'c', 'z', '#']
                          </CodeComentSpan>
                        </CodeLineWrapper>
                      </CodeBlockDiv>
                    </SpecialCodeBlockWrapper>
                  </>
                )}
                {slideState.slideNum === 3 && (
                  <>
                    <CodeBlockWrapper>
                      <CodeBlockDiv>
                        <CodeLineWrapper>
                          <CodeRedSpan>const</CodeRedSpan> target{" "}
                          <CodeYellowSpan>=</CodeYellowSpan>{" "}
                          <CodeYellowSpan>'gray grey'</CodeYellowSpan>;
                        </CodeLineWrapper>
                        <BlankLineWrapper />
                        <ComentLineWrapper>
                          {"//"} gr[ae]yは、gray, greyにマッチする正規表現です。
                        </ComentLineWrapper>
                        <CodeLineWrapper>
                          <CodeRedSpan>const</CodeRedSpan> regex{" "}
                          <CodeYellowSpan>=</CodeYellowSpan>{" "}
                          <CodeYellowSpan>/gr[ae]y/g</CodeYellowSpan>;
                        </CodeLineWrapper>
                        <BlankLineWrapper />
                        <CodeLineWrapper>
                          console.<CodeBlueSpan>log</CodeBlueSpan>(target.
                          <CodeBlueSpan>match</CodeBlueSpan>(regex));{" "}
                          <CodeComentSpan>
                            {"//"} ={">"} [ 'gray', 'grey' ]
                          </CodeComentSpan>
                        </CodeLineWrapper>
                      </CodeBlockDiv>
                    </CodeBlockWrapper>
                  </>
                )}
                {slideState.slideNum === 4 && (
                  <>
                    <GameScreenDescriptionWrapper src={GameScreenDescription} />
                  </>
                )}
                {slideState.slideNum === 5 && (
                  <>
                    <WarningSentenceWrapper>
                      ※
                      UX向上の為、音が出ます。音量が気になる方は下げて頂くようお願いします。
                    </WarningSentenceWrapper>
                    <OuterButtonsWrapper>
                      {clickDescriptionOpen ? (
                        <FinallyGameRestartButton setGameState={setGameState} />
                      ) : (
                        <FinallyGameStartButton setGameState={setGameState} />
                      )}
                    </OuterButtonsWrapper>
                  </>
                )}
              </SlideContentWrapper>
              {slideState.slideNum === 0 && (
                <BalloonWrapper>
                  <BalloonContentWrapper>
                    ▶︎をクリックして(または→キーで)
                    <br />
                    次のスライドを見ましょう
                  </BalloonContentWrapper>
                </BalloonWrapper>
              )}
            </DynamicSlideContentWrapper>
            <ButtonLineWrapper>
              {slideState.slideNum !== 0 && (
                <ButtonWrapper onClick={changeSlideToLeft}>
                  <Tooltip
                    title={
                      <div>
                        戻る
                        <br />( 左矢印キー ← )
                      </div>
                    }
                    placement="top"
                  >
                    <IconButton
                      sx={{
                        fontSize: "4.0em",
                      }}
                    >
                      <ArrowLeftIcon
                        fontSize="inherit"
                        sx={{ color: `${COLORS.BLACK}` }}
                      />
                    </IconButton>
                  </Tooltip>
                </ButtonWrapper>
              )}
              <ButtonWrapper onClick={changeSlideToRight}>
                {slideState.slideNum !== 0 ? (
                  <Tooltip
                    title={
                      <div>
                        進む
                        <br />( 右矢印キー → )
                      </div>
                    }
                    placement="top"
                    disableHoverListener={slideState.slideNum === 5}
                    sx={{
                      opacity: slideState.slideNum === 5 ? 0 : 1,
                    }}
                  >
                    <IconButton
                      sx={{
                        fontSize: "4.0em",
                        opacity: slideState.slideNum === 5 ? 0.1 : 1,
                        cursor:
                          slideState.slideNum === 5 ? "default" : "pointer",
                      }}
                      disableRipple={slideState.slideNum === 5}
                    >
                      <ArrowRightIcon
                        fontSize="inherit"
                        sx={{ color: `${COLORS.BLACK}` }}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton
                    sx={{
                      fontSize: "4.0em",
                      opacity: 1,
                      cursor: "pointer",
                    }}
                  >
                    <ArrowRightIcon
                      fontSize="inherit"
                      sx={{ color: `${COLORS.BLACK}` }}
                    />
                  </IconButton>
                )}
              </ButtonWrapper>
            </ButtonLineWrapper>
          </DialogContent>
        </CustomDialogInnerWrapper>
      </Dialog>
    </>
  );
};
