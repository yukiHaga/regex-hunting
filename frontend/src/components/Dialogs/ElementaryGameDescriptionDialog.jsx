import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// Image
import ElementaryMonsterImage from '../../images/elementary.png'; 

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

/*
const MonsterImageBoxWrapper = styled.div`
 text-align: right;
 width: 80%;
 margin-top: 80px;
`;

const MonsterImageWrapper = styled.img`
  width: 211px;
  height: 205px;
  object-fit: contain;
`;
*/

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

// フェードアウトのアニメーション
// transform: translateXは、x方向に動かすって意味
// x方向の位置をどんどん原点に近づけることで、右から左に動いているように見える
const LeftSlideOutAnime = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%);
  }
`;

const LeftSlideInAnime = keyframes`
  0% {
    opacity: 0;
    transform: translateX(50%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const RightSlideOutAnime = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(50%);
  }
`;

const RightSlideInAnime = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideFunction = (
  slide_in,
  slide_out,
  direction
) => {
  switch (true){
    case slide_out && !slide_in && direction === "left":
      return LeftSlideOutAnime;
    case !slide_out && slide_in && direction === "left":
      return LeftSlideInAnime;
    case slide_out && !slide_in && direction === "right":
      return RightSlideOutAnime;
    case !slide_out && slide_in && direction === "right":
      return RightSlideInAnime;
    default:
      return false;
  }
};

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
  margin-top: 5%;
  color: ${COLORS.BLACK};
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

const WarningSentenceWrapper = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 1.1em;
  text-align: center;
  margin-top: 5%;
  color: ${COLORS.RED};
`;

const OuterButtonsWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
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
      sentence: "初級編を始める前に、正規表現とは何か?、どんなことができるのか？を学習しましょう。そして、初級編のゲームを通して、正規表現を作る際に使う基礎的なメタ文字をマスターしましょう！",
      slide_num: 0
    },
    {
      title: "What’s 正規表現？",
      sentence: "正規表現とは、複数の文字列からルールを見つけ出し、そのルールをパターンで表現したものです。正規表現を用いることで、文字列中に特定の文字が含まれているか判定できます。そして、含んでいる場合、どの位置にあるかを知ることができます。",
      slide_num: 1
    },
    {
      title: "正規表現を作る上で重要なメタ文字",
      sentence: "正規表現は、「文字列」と「メタ文字」で構成されています。そのため、メタ文字を知らないと正規表現を作ることができません。メタ文字とは、特殊な働きをする文字列です。メタ文字の例として、「[a-z]」というメタ文字は「a~zの中の一文字」を表します。また、「\\d」というメタ文字は0~9までの1つの数字を表します。",
      slide_num: 2
    },
    {
      title: "ルール説明",
      sentence: "初級編では、重要なメタ文字を使った正規表現を学習していきます。時間内に正しい正規表現を入力すると、モンスターに攻撃できます。モンスターのHPを0にしたらゲームクリアです！",
      slide_num: 3
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
  // slideState.slide_numが3より小さい場合、右カーソルが機能する
  const changeSlideToRight = useCallback(() => {
    if(slideState.slide_num < 3) {
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
        if(e.key !== 'Enter' && e.key === 'ArrowRight' && slideState.slide_num < 3) {
          changeSlideToRight();
        }
      };

      const handleLeftkeyPress = (e) => {
        if(e.key !== 'Enter' && e.key === 'ArrowLeft' && slideState.slide_num > 0) {
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
    changeSlideToLeft
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
              pb: "0"
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
                  slideState.slide_num === 3 &&
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
                  disableHoverListener={slideState.slide_num === 3}
                  sx={{
                    opacity: slideState.slide_num === 3 ? 0 : 1,
                  }}
                >
                  <IconButton
                    sx={{
                      fontSize: '4.0em',
                      opacity: slideState.slide_num === 3 ? 0.1 : 1,
                      cursor: slideState.slide_num === 3 && "default"
                    }}
                    disableRipple={slideState.slide_num === 3}
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
