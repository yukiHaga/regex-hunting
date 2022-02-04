import React, { useState, useEffect } from 'react';
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

// MUIのツールチップコンポーネントを使う
// チラツキがあるからやっぱりやめた
// import Tooltip from '@mui/material/Tooltip';

/*
// 画面全体にマスクを設置する設定
// 画面の中央に要素を表示させる設定
const MaskWrapper = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index: 1;
  background-color:rgba(0,0,0,0.3);
`;

// PCの画面全体を表している
const Carousel = styled.div`
  z-index: 2;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0 auto;
  position: relative;
  transition: right 0.5s ease;
  right: ${({ widthState: { width } }) => `${width}px`};
`;

// 全てのスライドを包み込むラッパー
// position: absoluteで全てのスライドを包み込むラッパーを、親要素を元にして固定しておく
// 高さはpcの画面全体である
const CarouselArea = styled.ul`
  width: 4400px;
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 185px;
  padding-right: 140px;
  position: absolute;
  margin-top: 0px;
  margin-bottom: 0px;
`;

// 一枚あたりのスライドのラッパー
// ここに移動ボタンが属している。
const CarouselList = styled.li`
  margin-right: 40px;
  list-style: none;
  background-color: ${COLORS.SUB};
  width: 1000px;
  height: 550px;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 4px
`;

// 一枚あたりのスライド(ボタンは除く)
// CarsolListの高さが550pxなので、ButtonLineWrapperの高さは自動的に150pxとなる
const ModalWrapper = styled.div`
  height: 450px;
`;

const WarningSentenceWrapper = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  display: inline-block;
  text-align: center;
  margin-top: 45px;
  color: ${COLORS.RED};
  width: 900px;
`;

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

const OuterButtonsWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
*/

const CustomDialogInnerWrapper = styled.div`
  background-color: ${COLORS.SUB};
  text-align: center;
  padding: 3%;
  padding-bottom: 0;
`;

const TitleWrapper = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 2em;
  color: ${COLORS.BLACK};
  width: 80%;
  margin: 0 auto;
`;

const DynamicSlideContentWrapper = styled.div`
  width: 80%;
  height: 63%;
  margin: 0 auto;
`;

// フェードアウトのアニメーション
// transform: translateXは、x方向に動かすって意味
// x方向の位置をどんどん原点に近づけることで、右から左に動いているように見える
const FadeOutAnime = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
    transform: translateX(40%);
  }
  40% {
    opacity: 0;
    transform: translateX(30%);
  }
  60% {
    opacity: 0.6;
    transform: translateX(20%);
  }
  80% {
    opacity: 0.8;
    transform: translateX(10%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const SlideContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  opacity: ${({ right }) => right && "0"};
  transform: ${({ right }) => right && "translateX(40%)"};
  animation: ${({ right }) => right && FadeOutAnime } 0.7s ease-out forwards;
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
  font-size: 5em;
  height: auto;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  :focus {
    outline: 0;
  }
  display: inline-block
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

  const slideContent = [
    {
      title: "初級編",
      sentence: "初級編を始める前に、正規表現とは何か?、どんなことができるのか？を学習しましょう。そして、初級編のゲームを通して、正規表現を作る際に使う基礎的なメタ文字をマスターしましょう！",
      slide_num: 0
    },
    {
      title: "What’s 正規表現？",
      sentence: "正規表現とは、複数の文字列からルールを見つけ出し、そのルールをパターンで表現したものです。正規表現を用いることで、文字列中に特定の文字が含まれているか判定できます。そして、含んでいる場合、どの位置にあるかを知ることができます。",
      slide_num: 1
    }
  ];

  const initialState = {
    title: slideContent[0]["title"],
    sentence: slideContent[0]["sentence"],
    slide_num: slideContent[0]["slide_num"],
    left: false,
    right: false
  };

  const [slideState, setSlideState] = useState(initialState);

  // 右へずらす
  const changeSlideToRight = () => {
    setSlideState((prev) => ({
      title: slideContent[prev.slide_num + 1]["title"],
      sentence: slideContent[prev.slide_num + 1]["sentence"],
      slide_num: slideContent[prev.slide_num + 1]["slide_num"],
      left: false,
      right: true
    }));
  };

  // 左へ1095pxずらす
  const changeSlideToLeft = () => {
    setSlideState((prev) => ({
      width: prev.count === 0 ? prev.width : prev.width - 1095,
      count: prev.count === 0 ? prev.count : prev.count - 1
    }));
  };

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
    game_description_open
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
            <TitleWrapper>
              {slideState.title}
            </TitleWrapper>
            <DynamicSlideContentWrapper>
              <SlideContentWrapper
                right={slideState.right}
              >
                <SentenceWrapper>
                  {slideState.sentence}
                </SentenceWrapper>
              </SlideContentWrapper>
            </DynamicSlideContentWrapper>
            <ButtonLineWrapper>
              <ButtonWrapper onClick={changeSlideToRight}>
                <ArrowRightIcon 
                  fontSize='inherit' 
                  sx={{ color: `${COLORS.BLACK}` }}
                />
              </ButtonWrapper>
            </ButtonLineWrapper>
          </DialogContent>
        </CustomDialogInnerWrapper>
      </Dialog>
    </>
  );
};
